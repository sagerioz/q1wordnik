// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function() {
  let keySearchTerm = ''
  //word of the day upon page load

  $.ajax({
    method: 'GET',
    url: `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
`,
    dataType: 'json',
    success: function(data) {
      return initialPageLoad(data)
    },
    error: function() {
      $('#target_ul').append(`<li><p class="special"><b>Sorry, </b><em>something went wrong with our query</em></p></li>`)
    }
  })

  const initialPageLoad = (data) => {
    let displayWordToTweeze = $('#mainTitle')[0]
    let displayInfoArea = $('#target_ul')[0]
    displayWordToTweeze.innerHTML = `&ldquo;<em>${data.word} </em>&rdquo;`;
    $('#target_ul').append(`<li><p class="special"><b>Word of the Day </b><em> ${data.word}</em></p></li>`)
    $('#target_ul').append(`<li><p class="special"><b>Definition </b><em>${data.note}</em></p></li>`)
  }


  $('#search').click(function() {
    event.preventDefault()
    // to reset the target viewport for a new search term
    $('tbody').children().remove();
    $('#target_ul').empty()

    let userInput = $('input').val()
    keySearchTerm = userInput
    if (userInput.length > 0) {

      const processResults = (data) => {
        let displayWordToTweeze = $('#mainTitle')[0]
        let displayInfoArea = $('#target_ul')[0]
        displayInfoArea.innerHTML = ''
        let tweeze = data[0]
        displayWordToTweeze.innerHTML = `&ldquo;<em>${data[0].word} </em>&rdquo;`;
        $('#target_ul').append(`<li><p class="special"><b>Part of Speech </b><em> ${tweeze.partOfSpeech}</em></p></li>`)
        $('#target_ul').append(`<li><p class="special"><b>Definition </b><em>${tweeze.text}</em></p></li>`)
        $('input').val('')
        console.log("USERINPUT", userInput);
        console.log("WORD TO TWEEZE", data[0].word);
        console.log("DATA", data)
        console.log(tweeze.partOfSpeech)
        console.log(tweeze.text);
      }


      //main search call, returns first definition and part of speech.
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${userInput}/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return processResults(data)
        },
        error: function() {
          alert("Something went wrong with your query")
        }
      })
    } else {
      $('input').val("Enter something here to search")
    }
  })

  // =========================click events on side nav bar========================

  //returns rhyming words
  $("#nav_sidebar_actions").click(function() {
    event.preventDefault()
    console.log("YOUR EVENT TARGET IS HERE:", event.target);
    if ($(event.target).is('#rhymes')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=true&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return processRhymes(data)
        },
        error: function() {
          alert("Something went wrong with your query")
        }
      })
    } else if ($(event.target).is('#definitions')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/definitions?limit=5&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return processDefinitions(data)
        },
        error: function() {
          alert("Something went wrong with your query")
        }
      })
    } else if ($(event.target).is('#WOTD')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
      `,
        dataType: 'json',
        success: function(data) {
          return initialPageLoad(data)
        },
        error: function() {
          alert("Something went wrong with our query")
        }
      })

    } else if ($(event.target).is('#synonym')) {
      $.ajax({
        method: 'GET',
        url:       `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return synonymFunc(data)
        },
        error: function() {
          alert("Something went wrong with our query")
        }
      })

    }else if ($(event.target).is('#entymology')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/etymologies?useCanonical=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return entymologyFunc(data)
        },
        error: function() {
          alert("Something went wrong with our query")
        }
      })

    }

  })

  const processRhymes = (data) => {
    let tweeze = data[0]
    if (tweeze !== undefined) {
      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      $('#tbody').append(
        `<td><p class="special"><b>Rhyming words</b></p></td>
     <td><em>${tweeze.words}</em></p></td>
     <td></td>`)
      console.log("KEYSEARCHTERM", keySearchTerm);
      console.log("WORD TO rhyme", data[0].words);
      console.log("DATA", data)
      console.log(tweeze.partOfSpeech)
      console.log(tweeze.text);
    } else {
      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      $('#tbody').append(
        `<td><p class="special"><em>Sorry, no rhyming words available.</em></p></td>
     <td></td>
     <td></td>`)
    }
  }

  const processDefinitions = (data) => {
    for (let i = 1; i < data.length; i++) {
      let definition = data[i].text
      console.log("DEFINITIONS DATA LOOP", data[i].text);
      $('#target_ul').append(`<li><p class="special"><b>Definition ${i} </b><em>${definition}</em></p></li>`)
    }
  }

  const entymologyFunc = (data) => {
      console.log("ENTYMOLOGY DATA LOOP XML", data);
      let xmlDoc = $.parseXML( data )
      let $xml = $( xmlDoc )
       console.log("ENTYMOLOGY DATA LOOP AFTER PARSING", $xml);
    }

    const synonymFunc = (data) => {
        console.log("SYNONYM DATA", data);

      }
  // }
  // end document ready
})
