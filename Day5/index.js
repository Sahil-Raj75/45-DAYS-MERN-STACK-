const button = document.querySelector(".btn-mode")
const body = document.body
const card = document.querySelector(".card")
const cardname = document.querySelector(".card-name")
const cardtitle = document.querySelector(".card-title")
flag = 0
button.addEventListener("click", Mode)

function Mode() {
    body.classList.toggle("dark-mode")
    if (flag == 0) {
        button.innerHTML = "Dark Mode 🔆"
        card.style.backgroundColor = "#373535ff"
        cardname.style.color = "#ffffffff"
        cardtitle.style.color = "#fafafaff"
        flag = 1;
    }
    else {
        button.innerHTML = "Light Mode ☀️"
        card.style.backgroundColor = "#ffffffff"
        cardname.style.color = "#000000ff"
        cardtitle.style.color = "#000000ff"
        flag = 0;
    }
} 
