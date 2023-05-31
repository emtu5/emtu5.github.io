let quotes = null
let dibby = null
let quoteCounter = null
let hbar = null
const dibbyButton = document.getElementById("dibby")

fetch("assets/jason/quotes.json")
    .then(response => response.json())
    .then(data => {
        prep(data)
    })

function prep(data) {
    quotes = data["quotes"]
    dibby = data["dibby"]
    quoteCounter = 0
    hbar = document.getElementsByClassName("header-bar")[0]
    hbar.innerHTML = getRandomQuote()
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random()*quotes.length)]
}

dibbyButton.addEventListener("click", () => {
    if(dibbyButton.dataset.animate === "nope") {
        dibbyButton.dataset.animate = "yup"
        quoteCounter++;
        if (quoteCounter % 10 === 0) {
            hbar.innerHTML = dibby
        }
        else {
            hbar.innerHTML = getRandomQuote()
        }

        setTimeout(() => {
            dibbyButton.dataset.animate = "nope"
        }, 200)
    }
})