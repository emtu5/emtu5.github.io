let sillyLevel = 0
const sillyLevelRequired = 30
let sillynessAchieved = false
const misbehavePara = [
    "Why are you clicking the tile instead of the dibby? ",
    "Your one job: be silly, click dibby. ",
    "'Tile' is a weird way to spell 'dibby'. ",
    "Sometimes, curiosity gets the best of us. "
]
const congrats = new Audio("assets/audio/Applause.mp3")

document.querySelector(".tile").addEventListener('mousedown', ev => {
    if (!sillynessAchieved) {
        let tile = ev.target.closest(".tile").querySelector("p")
        tile.innerHTML = misbehavePara[Math.floor(Math.random() * misbehavePara.length)];
        sillyLevel = 0
    }
})

function moreDibbyActions(ev) {
    let sillyPara = "SILLYNESS ACHIEVED"
    let tile = ev.target.closest(".tile").querySelector("p")
    if(!sillynessAchieved) {
        if (sillyLevel >= sillyLevelRequired) {
            sillynessAchieved = true
            tile.innerHTML = "";
            tile.style.fontSize = "30px";
            tile.style.textAlign = "center"
            for (let i = 0; i < sillyPara.length; i++) {
                tile.innerHTML += `<span style="color: hsl(${i * 360 / (sillyPara.length - 1) }deg 100% 50%);" >${sillyPara[i]}</span>`
            }
            void congrats.play()
        }
        else {
            tile.innerHTML += `<span style="color: hsl(${sillyLevel * 360 / sillyLevelRequired}deg 100% 50%);" >!</span>`
            sillyLevel++
        }
    }
}