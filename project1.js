// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function() {
  let keySearchTerm = ''

  $.ajax({
    method: 'GET',
    url: `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
`,
    dataType: 'json',
    success: function(data) {
      //return wordOfTheDayFunc(data)
    },
    error: function() {
      $('input').val("Enter something here to search")
      $('#target_ul').append(`<li><p class="special"><em>Error: something went wrong with your query</em></p></li>`)
    }
  })

  const wordOfTheDayFunc = (data) => {
    $('#target_ul').append(`<li class="WOTD"><hr><p class="special">Word of the Day </p><p><em> '${data.word}'</em></p></li>`)
    $('#target_ul').append(`<li class="WOTD"><p class="special">Definition </p><p><em>${data.note}</em></p></li>`)
    $('#target_ul').append(`<li class="WOTD"><p class="special">More </p><p><em>${data.definitions[0].text}</em></p><hr></li>`)
  }

  $('#search').click(function() {
    event.preventDefault()
    $('#star').innerHTML = '&#9734;'
    // to reset the target viewport for a new search term
    $('tbody').children().remove();
    $('#target_ul').empty()

    let userInput = $('input').val()
    keySearchTerm = userInput
    if (userInput.length > 0) {

      const processResults = (data) => {
        let displayWordToTweeze = $('#mainTitle')[0]//h1 tag
        let displayInfoArea = $('#target_ul')[0]
        displayInfoArea.innerHTML = ''
        let tweeze = data[0]
        displayWordToTweeze.innerHTML = `&ldquo;<em>${data[0].word} </em>&rdquo;`;
        $('#star').append(`&#9734; `)
        $('#target_ul').append(`<li><p class="special">Part of Speech </p><p><em> ${tweeze.partOfSpeech}</em></p></li>`)
        $('#target_ul').append(`<li><p class="special">Definition </p><p><em>${tweeze.text}</em></p></li>`)
        $('input').val('')
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
          $('input').val("Search a word").focus()
          $('#myModal').modal("Word spelling error");
        }
      })
    } else {
      $('input').val("Search a word")
    }
  })

  $(document).dblclick(function(e) {
      var wordToTweeze = get_selection();
      keySearchTerm = wordToTweeze;
      $('input').val(wordToTweeze)
      $('#star').innerHTML = '&#9734;'
  });

// ======================click event on favorites button========================
$(".favorite-star-character").click(function(){
  event.preventDefault()
  let star = event.target;
  star.innerHTML = '&#x1f31f;'
  console.log("ADDFAV", $('#addfav'));
 $('#addfav').append(`<li><a href="#" id="add" class="addfav">${keySearchTerm}</a></li>`)
})

// =========================click events on side nav bar========================
$("#second_nav_sidebar_actions").click(function(){
  if($(event.target).is("#WOTD")){
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
    `,
      dataType: 'json',
      success: function(data) {
        if($('#target_ul').children('li').hasClass('WOTD')){}
        else{
          return wordOfTheDayFunc(data)
        }
      },
      error: function() {
        $('input').val("Search word").focus()
        alert("Something went wrong with your query")
      }
    })
  }
})


  $("#nav_sidebar_actions").click(function() {
    event.preventDefault()
    if ($(event.target).is('#rhymes')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=true&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#target_ul').children('li').hasClass('rhymes')){}
          else{
            return rhymeFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })
    } else if ($(event.target).is('#definitions')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/definitions?limit=5&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#target_ul').children('li').hasClass('definitions')){}
          else{
            return definitionsFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    } else if ($(event.target).is('#synonym')) {
      $.ajax({
        method: 'GET',
        url:       `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('synonym')){}
          else{
            return synonymFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    }else if ($(event.target).is('#etymology')) {
      $.ajax({
        method: 'GET',
        url:
        `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=etymologically-related-term&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('etymology')){}
          else{
            return entymologyFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    } else if ($(event.target).is('#same-context')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=same-context&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('same_context')){}
          else{
            return sameContextFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    } else if ($(event.target).is('#antonym')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('antonym')) {}
          else{
            return antonymFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    }else if ($(event.target).is('#crossRef')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=false&relationshipTypes=cross-reference&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('cross_ref')){}
          else{
            return crossRefFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    }else if ($(event.target).is('#example')) {
      $.ajax({
        method: 'GET',
        url: `http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('example')){}
          else{
            return exampleFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    }else if ($(event.target).is('#pronunciation')) {
      $.ajax({
        method: 'GET',
        url:`http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/audio?useCanonical=false&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          if($('#tbody').children('td').hasClass('pronunciation')){}
          else{
            return pronunciationFunc(data)
          }
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal('show');       }
      })

    }else if ($(event.target).is('#clear')) {
          $('tbody').children().remove();
          $('#target_ul').empty()
    }
  })

// ================================= functions =============================== //
  const rhymeFunc = (data) => {
    let tweeze = data[0]
    if (tweeze !== undefined) {
      $('#target_ul').append(`<li class="rhymes"><p class="special">Rhyming</p></b></li>`)
      $('#target_ul').append(`<li class="rhymes"><p><em>${tweeze.words}</em></p></li>`)

    } else {
      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      $('#tbody').append(
        `<td class="rhymes" colspan="3"><p class="special">Rhyming</p><em> Sorry, no data available for '${keySearchTerm}' available.</em></p></td>`)
    }
  }

  const definitionsFunc = (data) => {
    for (let i = 1; i < data.length; i++) {
      let definition = data[i].text
      $('#target_ul').append(`<li class="definitions"><p><b>${i}. </b><em>${definition}</em></p></li>`)
    }
  }

  const entymologyFunc = (data) => {
      let tweeze = data[0]
      if (tweeze !== undefined) {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td class="entymology" colspan="3"><p class="special">History and evolution</p></td>`)
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
        `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
      } else {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td colspan="3"><p class="special">Etymology </p><em>Sorry, no data available for '${keySearchTerm}' available.</em></p></td>`)
      }

    }

    const synonymFunc = (data) => {
        let tweeze = data[0]
        if (tweeze !== undefined) {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td class="synonym" colspan="3"><p class="special">Synonyms</p></td>`)
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
          `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
        } else {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td colspan="3"><p class="special">Synonyms </p><em>Sorry, no data available for '${keySearchTerm}'.</em></p></td>`)
        }
      }

      const sameContextFunc = (data) => {
          let tweeze = data[0]
          if (tweeze !== undefined) {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td class="same_context" colspan="3"><p class="special">Same context</p></td>`)
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
            `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
          } else {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td colspan="3"><p class="special">Same Context<p><em> Sorry, no data available for '${keySearchTerm}'.</em></p></td>`)
          }
        }

        const antonymFunc = (data) => {
            let tweeze = data[0]
            if (tweeze !== undefined) {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td class="antonym" colspan="3"><p class="special">Antonyms</p></td>`)
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(`<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
            } else {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td colspan="3"><p class="special">Antonyms </p><em>Sorry, no data available for '${keySearchTerm}'.</em></p></td>`)
            }
          }

          const crossRefFunc = (data) => {
              let tweeze = data[0]
              if (tweeze !== undefined) {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td class="cross_ref" colspan="3"><p class="special">Cross references</p></td>`)
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
              } else {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td colspan="3"><p class="special">Cross-references</p><em> Sorry, no data available for '${keySearchTerm}'.</em></p></td>`)
              }
            }

            const exampleFunc = (data) => {
                let tweeze = data
                if (tweeze !== undefined) {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td class="example" colspan="3"><p class="special">Example of use</p></td>`)
                    $('#tbody').append('<tr class="tr_result_data"></tr>')
                    $('#tbody').append(
                  `<td colspan="2"><p><em>${tweeze.text}</em></p></td><td> </td>`)
                } else {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td colspan="3"><p><b>Same context</b><em> Sorry, no examples available for '${keySearchTerm}'.</em></p></td>`)
                }
              }

              const pronunciationFunc = (data) => {
                  let tweeze = data[0]
                  if (tweeze !== undefined) {
                    $('#tbody').append('<tr class="tr_result_data"></tr>')
                    $('#tbody').append(
                      `<td class="pronunciation" colspan="3"><p class="special">Pronunciation</p><p> for "${keySearchTerm}"  </b></p></td>`)
                      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                      $('#tbody').append(
                    `<td colspan="2"><p><audio src="${tweeze.fileUrl}" controls></audio></p></td><td> </td>`)
                  } else {
                    $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                    $('#tbody').append(
                      `<td colspan="3"><p class="special">Pronounciation</p><em> Sorry, no data available for '${keySearchTerm}'.</em></p></td>`)
                  }
                }







  // end document ready
})
