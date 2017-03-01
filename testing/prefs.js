window.onload = init;

function init() {
    // localStorage.setItem("favGenre", "fiction");
    var favoriteGenre = localStorage.getItem("favGenre");

    var ul = document.getElementById("items");
    var li = document.createElement("li");
    li.innerHTML = favoriteGenre;
    ul.appendChild(li);
}
