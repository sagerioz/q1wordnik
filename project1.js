// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function(){
$('#search').click(function(){
  let userInput = $('input').val()
  if(userInput.length > 0){

    const processResults = (data) => {
      let displayWordToTweeze = $('#mainTitle')[0]
      let displayInfoArea = $('<ul>')[0]
      displayInfoArea.innerHTML = ''
      console.log("ul", displayInfoArea);
      // wordToTweeze.innerHTML = '';
      // collection.show();
      let tweeze = data[0]
      displayWordToTweeze.innerHTML = `&ldquo;<em>${data[0].word} </em>&rdquo;`;
      $('#target_ul').append(`<li><p class="special">Part of Speech </p>${tweeze.partOfSpeech}</li>`)
      $('#target_ul').append(`<li><p class="special">Definition </p>${tweeze.text}</li>`)

      console.log("WORD TO TWEEZE", data[0].word);
      console.log("DATA", data)
      console.log(tweeze.partOfSpeech)
      console.log(tweeze.text);
      //go thru each movie from the json object
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
    url:`http://api.wordnik.com:80/v4/word.json/${userInput}/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

`,
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
})

})
