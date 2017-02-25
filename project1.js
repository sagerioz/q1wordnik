// my wordnik API key : f8f516018793386aa94e542a7222a0ee6717e9c23e5ab8a5c

$(document).ready(function(){
$('#search').click(function(){
  let userInput = $('input').val()
  if(userInput.length > 0){

    const processResults = (data) => {
      // let collection = $('#displayDiv')
      // collection[0].innerHTML = '';
      // collection.show();
      console.log("DATA", data)
      console.log(data[0].partOfSpeech)
      console.log(data[0].text);
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
