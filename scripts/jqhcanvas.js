window.onload = function () {
    const tile_size = 40
    const hotbarStart = [20, 20]
    const boardStart = [20, 80]
    const cvs = document.querySelector("canvas")
    // let scaleFactor = 560 / cvs.width
    // console.log(scaleFactor)
    const c = cvs.getContext('2d')
    let isMouseDown = false;
    let hotbarData = []
    let board = null
    let selectedType = 0;

    console.log("what")

    class Tile {
        constructor(row, column) {
            this.x = hotbarStart[0] + row * tile_size
            this.y = hotbarStart[1] + column * tile_size
            this.type = 1
        }

        draw() {
            c.drawImage(hotbarData[this.type], this.x, this.y, tile_size, tile_size)
        }
    }


    let headerTemp = new Image()
    headerTemp.src = "assets/projects/hotbar.png"
    headerTemp.onload = () => {
        console.log(headerTemp)
        let tempcvs = document.createElement("canvas");
        tempcvs.width = cvs.width
        tempcvs.height = cvs.height
        console.log(tempcvs)
        let tempc = tempcvs.getContext('2d')
        tempc.drawImage(headerTemp, 0, 0)
        for (let i = 0; i < 13; i++) {
            hotbarData.push(tempc.getImageData(tile_size * i, 0, tile_size, tile_size))
        }

    }

    board = new Image()
    board.src = "assets/projects/boardspaces1.jpg"
    board.onload = () => {
        c.drawImage(board, boardStart[0], boardStart[1])
        c.drawImage(board, 0, 0, 520, 40, hotbarStart[0], hotbarStart[1], 520, 40)
        c.drawImage(headerTemp, hotbarStart[0], hotbarStart[1])
    }


    function getMousePos(evt) {
        let rect = cvs.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    cvs.addEventListener('mousedown', (e) => {
        if(e.button === 0) {
            mouseDown(e)
        }
    })

    // Draw when left click
    function mouseDown(e) {
        let mousePos = getMousePos(e)
        console.log(mousePos)
    }
}



