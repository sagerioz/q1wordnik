// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function(){
let keySearchTerm = ''
$('#search').click(function(){
  event.preventDefault()
  $('#target_ul').empty() // to reset the target viewport for a new search term
  let userInput = $('input').val()
  keySearchTerm = userInput
  if(userInput.length > 0){

    const processResults = (data) => {
      let displayWordToTweeze = $('#mainTitle')[0]
      let displayInfoArea = $('#target_ul')[0]
      displayInfoArea.innerHTML = ''
      console.log("ul", displayInfoArea);
      // wordToTweeze.innerHTML = '';
      // collection.show();
      let tweeze = data[0]
      displayWordToTweeze.innerHTML = `&ldquo;<em>${data[0].word} </em>&rdquo;`;
      $('#target_ul').append(`<li><p class="special">Part of Speech </p>${tweeze.partOfSpeech}</li>`)
      $('#target_ul').append(`<li><p class="special">Definition </p>${tweeze.text}</li>`)
      $('input').val('')
      console.log("USERINPUT", userInput);
      console.log("WORD TO TWEEZE", data[0].word);
      console.log("DATA", data)
      console.log(tweeze.partOfSpeech)
      console.log(tweeze.text);
      // for (var i = 0; i < data.Search.length; i++) {
      //   console.log(data.Search[i]);
      //   let year = data.Search[i].Year
      //   let title = data.Search[i].Title
      //   $(collection).append(`<li class="collection-item">${title}(${year})</li>`)
      // }

    }



  $.ajax({
    method: 'GET',
    //${userInput}
    url:`http://api.wordnik.com:80/v4/word.json/${userInput}/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
    dataType:'json',
    success: function (data){
      return processResults(data)},
    error: function(){
      alert("Something went wrong with your query")
    }
  })
}else{
  $('input').val("Enter something here to search")
}
})//end main search field click event

// =========================click events on side nav bar========================

$("#nav_sidebar_actions").click(function() {
  event.preventDefault()
  console.log("YOUR EVENT TARGET IS HERE:", event.target);
  // let userInput = $('input').val()
    if ($(event.target).is('#rhymes')) {
      $.ajax({
        method: 'GET',
        url:`http://api.wordnik.com:80/v4/word.json/${keySearchTerm}/relatedWords?useCanonical=true&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`
,
        dataType:'json',
        success: function (data){
          return processRhymes(data)},
        error: function(){
          alert("Something went wrong with your query")
        }
      })
}


})

const processRhymes = (data) => {
  //let displayWordToTweeze = $('#mainTitle')[0]
  let displayInfoArea = $('#target_ul')[0]
  displayInfoArea.innerHTML = ''
  console.log("ul", displayInfoArea);
  // wordToTweeze.innerHTML = '';
  // collection.show();
  let tweeze = data[0]
  // displayWordToTweeze.innerHTML = `&ldquo;<em>${data[0].word} </em>&rdquo;`;
  $('#target_ul').append(`<li><p class="special">Rhyming words </p>${tweeze.words}</li>`)
  // $('input').val('')
  console.log("KEYSEARCHTERM", keySearchTerm);
  console.log("WORD TO TWEEZE", data[0].word);
  console.log("DATA", data)
  console.log(tweeze.partOfSpeech)
  console.log(tweeze.text);
  // for (var i = 0; i < data.Search.length; i++) {
  //   console.log(data.Search[i]);
  //   let year = data.Search[i].Year
  //   let title = data.Search[i].Title
  //   $(collection).append(`<li class="collection-item">${title}(${year})</li>`)
  // }

}

})//end document ready
