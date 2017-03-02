window.onload = init;

function init() {

if(localStorage.getItem("favGenre") === null){
  localStorage.setItem("favGenre", JSON.stringify(favString);
  let favoriteGenre = JSON.parse(localStorage.getItem("favGenre"));
  console.log(favoriteGenre);
  // let = document.getElementById("items");
  // let li = document.createElement("li");
  // li.innerHTML = favoriteGenre;
  // ul.appendChild(li);

}

}
