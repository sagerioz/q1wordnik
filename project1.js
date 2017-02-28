// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function() {
  let keySearchTerm = ''
  // let modal = $('#basicModal').modal();
  // console.log("MODAL",modal);
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
      $('input').val("Enter something here to search")
      $('#target_ul').append(`<li><p class="special"><b>Sorry, </b><em>something went wrong with our query</em></p></li>`)
    }
  })

  const initialPageLoad = (data) => {
    let displayWordToTweeze = $('#mainTitle')[0]
    let displayInfoArea = $('#target_ul')[0]
    let mainDiv = $('#main_div')[0]
    $(displayInfoArea).append(`<img src="images/alice1.jpeg"/><h2>Word of the Day</h1>`)
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
          $('#myModal').modal("Error: something went wrong with your API search!");
        }
      })
    } else {
      $('input').val("Search a word")
      $('#myModal').modal("What would you like to seach?");
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
          $('input').val("Search word").focus()
          //alert("Enter a word to search")
          $('#myModal').modal("What would you like to search?");
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
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
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
          $('input').val("Search word").focus()
          alert("Enter a word to search")
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
          return entymologyFunc(data)
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
          return sameContextFunc(data)
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
          return antonymFunc(data)
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
          return crossRefFunc(data)
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
          return exampleFunc(data)
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal("What would you like to search?");
        }
      })

    }else if ($(event.target).is('#pronounciation')) {
      $.ajax({
        method: 'GET',
        url:`http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/audio?useCanonical=false&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        dataType: 'json',
        success: function(data) {
          return pronounciationFunc(data)
        },
        error: function() {
          $('input').val("Search word").focus()
          $('#myModal').modal('show');       }
      })

    }else if ($(event.target).is('#clear')) {
          $('tbody').children().remove();
    }
  })

// ================================= functions =============================== //
  const processRhymes = (data) => {
    let tweeze = data[0]
    if (tweeze !== undefined) {
      $('#target_ul').append(`<li><p class="special"><b>Rhyming words for "${keySearchTerm}" </b></p></li>`)
      $('#target_ul').append(`<li><p><em>${tweeze.words}</em></p></li>`)

      // $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      // $('#tbody').append(
      //   `<td colspan="3"><p class="special"><b>Rhyming words for "${keySearchTerm}" </b></p></td>`)
      //   $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      //   $('#tbody').append(
      // `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
    } else {
      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
      $('#tbody').append(
        `<td colspan="3"><p class="special"><em>Sorry, no rhyming words for "${keySearchTerm}" available.</em></p></td>`)
    }
  }

  const processDefinitions = (data) => {
    for (let i = 1; i < data.length; i++) {
      let definition = data[i].text
      console.log("DEFINITIONS DATA LOOP", data[i].text);
      $('#target_ul').append(`<li><p class="special"><b>${i}. </b><em>${definition}</em></p></li>`)
    }
  }

  const entymologyFunc = (data) => {
      console.log("ENTYMOLOGY DATA LOOP", data);
      let tweeze = data[0]
      if (tweeze !== undefined) {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td colspan="3"><p class="special"><b>History and evolution of ${keySearchTerm} </b></p></td>`)
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
        `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
      } else {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td colspan="3"><p class="special"><b>Etymology </b><em>Sorry, no examples of etymology for "${keySearchTerm}" available.</em></p></td>`)
      }
      // let xmlDoc = $.parseXML( data )
      // let $xml = $( xmlDoc )
      //  console.log("ENTYMOLOGY DATA LOOP AFTER PARSING", $xml);
    }

    const synonymFunc = (data) => {
        console.log("SYNONYM DATA", data);
        let tweeze = data[0]
        if (tweeze !== undefined) {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td colspan="3"><p class="special"><b>Synonyms for ${keySearchTerm} </b></p></td>`)
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
          `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
        } else {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td colspan="3"><p class="special"><em>Sorry, no synonyms available for ${keySearchTerm}.</em></p></td>`)
        }
      }

      const sameContextFunc = (data) => {
          console.log("same context DATA", data);
          let tweeze = data[0]
          if (tweeze !== undefined) {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td colspan="3"><p class="special"><b>Words that could be found in the same context as "${keySearchTerm}" </b></p></td>`)
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
            `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
          } else {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td colspan="3"><p class="special"><em>Sorry, no "same context" data available for ${keySearchTerm}.</em></p></td>`)
          }
        }

        const antonymFunc = (data) => {
            console.log("same context DATA", data);
            let tweeze = data[0]
            if (tweeze !== undefined) {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td colspan="3"><p class="special"><b>Antonyms for "${keySearchTerm}" </b></p></td>`)
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(`<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
            } else {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td colspan="3"><p class="special"><b>Antonyms </b><em>Sorry, no antonyms available for "${keySearchTerm}".</em></p></td>`)
            }
          }

          const crossRefFunc = (data) => {
              console.log("same context DATA", data);
              let tweeze = data[0]
              if (tweeze !== undefined) {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td colspan="3"><p class="special"><b>Cross references for "${keySearchTerm}" </b></p></td>`)
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
              } else {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td colspan="3"><p class="special"><em>Sorry, no cross-refernce data available for "${keySearchTerm}".</em></p></td>`)
              }
            }

            const exampleFunc = (data) => {
                console.log("same context DATA", data);
                console.log("EXAMPLE", data);
                let tweeze = data
                if (tweeze !== undefined) {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td colspan="3"><p class="special"><b>Example of use for "${keySearchTerm}"  </b></p></td>`)
                    $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                    $('#tbody').append(
                  `<td colspan="2"><p><em>${tweeze.text}</em></p></td><td> </td>`)
                } else {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td colspan="3"><p class="special"><em>Sorry, no examples available for "${keySearchTerm}".</em></p></td>`)
                }
              }

              const pronounciationFunc = (data) => {
                  let tweeze = data[0]
                  console.log("pronounc DATA", tweeze.fileUrl);
                  if (tweeze !== undefined) {
                    $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                    $('#tbody').append(
                      `<td colspan="3"><p class="special"><b>Pronounciation for "${keySearchTerm}"  </b></p></td>`)
                      $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                      $('#tbody').append(
                    `<td colspan="2"><p><audio src="${tweeze.fileUrl}" controls></audio></p></td><td> </td>`)
                  } else {
                    $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                    $('#tbody').append(
                      `<td colspan="3"><p class="special"><em>Sorry, no pronounciation available for "${keySearchTerm}".</em></p></td>`)
                  }
                }
  // }
  // end document ready
})
