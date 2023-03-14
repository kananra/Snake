const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;


//game loop
function drawGame() {
    clearScreen();
    changeSnakePosition();

    checkApple();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

}


function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkApple() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.keyCode === 38) {
        if (yVelocity === 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if (event.keyCode == 40) {
        if (yVelocity === -1) {
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if (event.keyCode == 37) {
        if (xVelocity === 1) {
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if (event.keyCode == 39) {
        if (xVelocity === -1) {
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }


}





drawGame();