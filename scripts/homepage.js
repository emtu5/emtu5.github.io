let quotes = null
let dibby = null
let quoteCounter = null
let hbar = null

fetch("assets/jason/homepage.json")
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

function moreDibbyActions() {
    quoteCounter++
    if (quoteCounter % 10 === 0) {
        hbar.innerHTML = dibby
    }
    else {
        hbar.innerHTML = getRandomQuote()
    }
}