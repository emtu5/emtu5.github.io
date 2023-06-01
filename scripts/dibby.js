const dibbyButton = document.getElementsByClassName("dibby")
const audioFolder = "assets/audio/"
const audioPath = [
    "colon3.mp3", "colon4.mp3", "eagle.mp3", "horn.mp3",
    "meow.mp3", "poke1.mp3", "poke2.mp3", "squeak.mp3"
]
const soundBoard = audioPath.map(p => new Audio(audioFolder + p))

function playAudio() {
    void soundBoard[Math.floor(Math.random()*audioPath.length)].play()
}

Array.from(dibbyButton).forEach(dibby => {
    dibby.addEventListener("mousedown", ev => {
        console.log("dimpy")
        if(dibby.dataset.animate === "nope") {
            dibby.dataset.animate = "yup"
            playAudio()
            moreDibbyActions(ev)
            setTimeout(() => {
                dibby.dataset.animate = "nope"
            }, 200)
        }
        ev.stopImmediatePropagation();
    })
})