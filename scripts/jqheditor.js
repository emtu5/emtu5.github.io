const boardWidth = 13
const boardHeight = 11
let tileSize = 40

const canvasBoard = document.querySelector("#boardCanvas")
canvasBoard.width = boardWidth * tileSize; canvasBoard.height = boardHeight * tileSize;
const ctxBoard = canvasBoard.getContext("2d")

const canvasHotbar = document.querySelector("#hotbarCanvas")
canvasHotbar.width = boardWidth * tileSize; canvasHotbar.height = tileSize;
const ctxHotbar = canvasHotbar.getContext("2d")

const canvasJewel = document.querySelector("#jewelCanvas")
canvasJewel.width = 3 * tileSize; canvasJewel.height = boardHeight * tileSize;
const ctxJewel = canvasJewel.getContext("2d")

let hotbarImage = new Image()
let boardImage = new Image()
let jewelImage = new Image()
hotbarImage.src =  "assets/projects/hotbar.png"
boardImage.src = "assets/projects/boardspaces1.jpg"
jewelImage.src = "assets/projects/alljewels2.png"

let board = []
let isMouseDown = false
let isRightClick = false
let currentTileSelectionLeft = 1
let currentJewelCollection = []

const reset = document.getElementById("reset")
const copy = document.getElementById("copy")
const save = document.getElementById("save")

function drawBoard() {
    ctxBoard.drawImage(boardImage, 0, 0)
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            ctxBoard.drawImage(
                hotbarImage,
                board[i][j].type * tileSize, 0, tileSize, tileSize,
                board[i][j].x, board[i][j].y, tileSize, tileSize
            )
        }
    }
    localStorage.setItem('jqhboard', JSON.stringify(board))
}

function drawHotbar() {
    ctxHotbar.drawImage(
        boardImage, 0, 0, hotbarImage.width, hotbarImage.height, 0, 0, hotbarImage.width, hotbarImage.height
    )
    ctxHotbar.drawImage(hotbarImage, 0, 0)
    ctxHotbar.lineWidth = 2
    ctxHotbar.strokeStyle = '#00FFFF'
    ctxHotbar.strokeRect(tileSize * currentTileSelectionLeft, 1, tileSize - 2, tileSize - 2)
}

function drawJewel() {
    ctxJewel.drawImage(
        boardImage, (boardWidth - 3) * tileSize, 0, jewelImage.width, jewelImage.height, 0, 0,  jewelImage.width, jewelImage.height
    )
    ctxJewel.drawImage(jewelImage, 0, 0)
    ctxJewel.lineWidth = 2
    ctxJewel.strokeStyle = '#00FFFF'
    currentJewelCollection.forEach(elem => {
        console.log("bruh", elem - 2)
        ctxJewel.strokeRect(
            tileSize * Math.floor((elem - 1) / 11) ,
            1 + (tileSize) * ((elem - 1) % 11), tileSize - 2, tileSize - 2
        )
    })
}

function getTileCoords(ev) {
    const rect = ev.target.getBoundingClientRect();
    let x = ev.clientX - rect.left
    let y = ev.clientY - rect.top
    return [Math.floor(y / tileSize), Math.floor(x / tileSize)]
}

function drawTile(ev) {
    const [i, j] = getTileCoords(ev)
    board[i][j].type = currentTileSelectionLeft
    drawBoard()
}

function changeSelection(ev) {
    currentTileSelectionLeft = getTileCoords(ev)[1]
    drawHotbar()
}

function addJewelToCollection(ev) {
    let x = getTileCoords(ev)
    let newJewel = boardHeight * x[1] + x[0] + 1;
    let index = currentJewelCollection.indexOf(newJewel)
    if (newJewel < 32) {
        if (index > -1) {
            currentJewelCollection.splice(index, 1)
        }
        else if (currentJewelCollection.length === 8) {
            let para = document.getElementById("status")
            para.style.color = "rgb(255, 0, 0)"
            para.innerHTML = "TOO MANY TYPES"
            setTimeout(() => {
                para.innerHTML = ""
            }, 2000)
        }
        else {
            currentJewelCollection.push(newJewel)
        }
    }
    drawJewel()
}

canvasHotbar.addEventListener("mousedown", ev => {
    isMouseDown = true
    changeSelection(ev)
    console.log(currentTileSelectionLeft)
    ev.stopImmediatePropagation()
})

canvasHotbar.addEventListener("mousemove", ev => {
    if (isMouseDown) {
        changeSelection(ev)
        console.log(currentTileSelectionLeft)
    }

})

canvasHotbar.addEventListener("contextmenu", ev => {
    ev.preventDefault()
})

// canvasHotbar.addEventListener("mouseleave", ev => {
//     isMouseDown = false
// })
canvasBoard.addEventListener("contextmenu", ev => {
    ev.preventDefault()
})

canvasBoard.addEventListener("mousedown", ev => {
    isMouseDown = true
    drawTile(ev)
})

canvasBoard.addEventListener("mousemove", ev => {
    if (isMouseDown) {
        drawTile(ev)
        console.log(currentTileSelectionLeft)
    }

})

canvasHotbar.addEventListener("mousedown", ev => {
    isMouseDown = true
    changeSelection(ev)
    console.log(currentTileSelectionLeft)
})

canvasJewel.addEventListener("mousedown", ev => {
    addJewelToCollection(ev)
    console.log(currentJewelCollection)
})

window.addEventListener("mouseup", () => {
    console.log("aaaaa")
    isMouseDown = false;
    isRightClick = false;
})

function addBoardAndJewels(stringBoard){
    // board

    stringBoard += 'rowa='
    for (let i = 0; i < boardWidth; i++) {
        if (board[0][i].type < 10) {
            stringBoard += board[0][i].type
        }
        else {
            stringBoard += String.fromCharCode(87 + board[0][i].type)
        }
    }
    stringBoard += '\n'
    for (let i = 1; i < boardHeight; i++) {
        stringBoard += 'row' + (10 - i) + '='
        for (let j = 0; j < boardWidth; j++) {
            if (board[i][j].type < 10) {
                stringBoard += board[i][j].type
            }
            else {
                stringBoard += String.fromCharCode(87 + board[i][j].type)
            }
        }
        stringBoard += '\n'
    }

    // jewel selection

    for (let i = 0; i < currentJewelCollection.length; i++) {
        stringBoard += `item${i + 1}type=${currentJewelCollection[i]}\n`
    }
    navigator.clipboard.writeText(stringBoard).then(() => {
        let para = document.getElementById("status")
        para.style.color = "rgb(0, 255, 0)"
        para.innerHTML = "COPIED SUCCESFULLY"
        setTimeout(() => {
            para.innerHTML = ""
        }, 2000)
    })
}

save.addEventListener('click', () => {
    window.open(canvasBoard.toDataURL("image/png"), '_blank');
})

reset.addEventListener('click', () => {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            board[i][j].type = 0
        }
    }
    drawBoard()
})

window.onload = () => {
    // init
    board = JSON.parse(localStorage.getItem('jqhboard'))
    if(!board) {
        board = []
        for (let i = 0; i < boardHeight; i++) {
            let row = []
            for (let j = 0; j < boardWidth; j++) {
                row.push({'x': j * tileSize, 'y': i * tileSize, 'type': 0})
            }
            board.push(row)
        }
    }

    drawBoard()

    // prep the hotbar
    drawHotbar()
    drawJewel()
}

document.querySelector("form").addEventListener("submit", ev => {
    ev.preventDefault()
    let clipboardString= ""
    let formdata = new FormData(document.querySelector("form"))

    //board and timer
    switch (formdata.get("board-type")) {
        case "Classic Board":
            clipboardString += "boardType=boardtype_standard\n"
            break
        case "Swaps Board":
            clipboardString += "boardType=boardtype_swaps\n"
            break
        case "Limited Jewels Board":
            clipboardString += "boardType=boardtype_limited\n"
            break
    }
    let timer = formdata.get("time-info")
    let numbers = timer.match(/\d+/g);
    clipboardString += "time=" + numbers[0] + "\n"
    if (numbers[1]) {
        clipboardString += "timeExpert=" + numbers[1] + "\n"
    }

    //blocked goal
    switch (formdata.get("blocked-coin-type")) {
        case "aztec": {
            clipboardString += "extraGoal=1\n"
            break
        }
        case "silver": {
            clipboardString += "extraGoal=6\nsilverCoinsEnabled=1\n"
            break
        }
    }

    // silver spaces
    if(formdata.get("silver-goal")) {
        clipboardString += "boardGoal=2\n"
    }
    else {
        clipboardString += "boardGoal=1\n"
    }

    // specials
    if(formdata.get("specials")) {
        clipboardString += "specialButtonEnabled=1\n"
    }

    addBoardAndJewels(clipboardString)
    // console.log(numbers)
    // console.log(new FormData(document.querySelector("form")))
})
