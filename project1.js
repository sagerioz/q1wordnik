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
      return wordOfTheDayFunc(data)
    },
    error: function() {
      $('input').val("Enter something here to search")
      $('#target_ul').append(`<li><p class="special"><b>Sorry, </b><em>something went wrong with our query</em></p></li>`)
    }
  })

  const wordOfTheDayFunc = (data) => {
    // let displayWordToTweeze = $('#mainTitle')[0]
    // let displayInfoArea = $('#target_ul')[0]
    // let mainDiv = $('#main_div')[0]
//    displayWordToTweeze.innerHTML = `&ldquo;<em>${data.word} </em>&rdquo;`;
    $('#target_ul').append(`<li><p class="special">Word of the Day </p><p><em> ${data.word}</em></p></li>`)
    $('#target_ul').append(`<li><p class="special">Definition </p><p><em>${data.note}</em></p></li>`)
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
          $('#myModal').modal("Error: something went wrong with your API search!");
        }
      })
    } else {
      $('input').val("Search a word")
      $('#myModal').modal("What would you like to seach?");
    }
  })

  // =========================click events on side nav bar========================
$("#second_nav_sidebar_actions").click(function(){
  if($(event.target).is("#WOTD")){
    event.preventDefault();
    console.log($('hey it works'));
    $.ajax({
      method: 'GET',
      url: `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
    `,
      dataType: 'json',
      success: function(data) {
        return wordOfTheDayFunc(data)
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
  const processRhymes = (data) => {
    let tweeze = data[0]
    if (tweeze !== undefined) {
      $('#target_ul').append(`<li><p class="special">Rhyming</p></b></li>`)
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
        `<td colspan="3"><p class="special">Rhyming</p><em> Sorry, no data available for "${keySearchTerm}" available.</em></p></td>`)
    }
  }

  const processDefinitions = (data) => {
    for (let i = 1; i < data.length; i++) {
      let definition = data[i].text
      console.log("DEFINITIONS DATA LOOP", data[i].text);
      $('#target_ul').append(`<li><p><b>${i}. </b><em>${definition}</em></p></li>`)
    }
  }

  const entymologyFunc = (data) => {
      console.log("ENTYMOLOGY DATA LOOP", data);
      let tweeze = data[0]
      if (tweeze !== undefined) {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td colspan="3" class="entymology"><p class="special">History and evolution</p></td>`)
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
        `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
      } else {
        $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
        $('#tbody').append(
          `<td colspan="3"><p class="special">Etymology </p><em>Sorry, no data available for "${keySearchTerm}" available.</em></p></td>`)
      }

    }

    const synonymFunc = (data) => {
        console.log("SYNONYM DATA", data);
        let tweeze = data[0]
        if (tweeze !== undefined) {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td colspan="3"><p class="special">Synonyms</p></td>`)
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
          `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
        } else {
          $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
          $('#tbody').append(
            `<td colspan="3"><p class="special">Synonyms </p><em>Sorry, no data available for ${keySearchTerm}.</em></p></td>`)
        }
      }

      const sameContextFunc = (data) => {
          console.log("same context DATA", data);
          let tweeze = data[0]
          if (tweeze !== undefined) {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td colspan="3" class="same_context"><p class="special">Same context</p></td>`)
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
            `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
          } else {
            $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
            $('#tbody').append(
              `<td colspan="3"><p class="special">Same Context<p><em> Sorry, no data available for ${keySearchTerm}.</em></p></td>`)
          }
        }

        const antonymFunc = (data) => {
            let tweeze = data[0]
            if (tweeze !== undefined) {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td colspan="3" class="antonym"><p class="special">Antonyms</p></td>`)
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(`<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
            } else {
              $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
              $('#tbody').append(
                `<td colspan="3"><p class="special">Antonyms </p><em>Sorry, no data available for "${keySearchTerm}".</em></p></td>`)
            }
          }

          const crossRefFunc = (data) => {
              let tweeze = data[0]
              if (tweeze !== undefined) {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td colspan="3" class="cross_ref"><p class="special">Cross references</p></td>`)
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                `<td colspan="3"><p><em>${tweeze.words}</em></p></td>`)
              } else {
                $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                $('#tbody').append(
                  `<td colspan="3"><p class="special">Cross-references</p><em> Sorry, no data available for "${keySearchTerm}".</em></p></td>`)
              }
            }

            const exampleFunc = (data) => {
                console.log("EXAMPLE", data);
                let tweeze = data
                if (tweeze !== undefined) {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td colspan="3" class="example"><p class="special">Example of use</p></td>`)
                    $('#tbody').append('<tr class="tr_result_data"></tr>')
                    $('#tbody').append(
                  `<td colspan="2"><p><em>${tweeze.text}</em></p></td><td> </td>`)
                } else {
                  $('#tbody').append('<tr class="tr_result_data"><hr></tr>')
                  $('#tbody').append(
                    `<td colspan="3"><p><b>Same context</b><em> Sorry, no examples available for "${keySearchTerm}".</em></p></td>`)
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
                      `<td colspan="3"><p class="special">Pronounciation</p><em> Sorry, no data available for "${keySearchTerm}".</em></p></td>`)
                  }
                }
  // }
  // end document ready
})
