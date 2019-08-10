const len = 600;
const breadth = 600;

var htmlbody = document.getElementById("htmlbody");
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var score = document.getElementById("score");
var count = 0;
const sizeOfSnake = 20;
let speed = 100;

var foodX;
var foodY;

createFoodCoordinates();

let snakeBody = [];

let head = {x:0,y:0};

snakeBody.push(head);

htmlbody.addEventListener("keydown",(e)=>{
    switch (e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
});

var flag = 1;
function moveLeft(){
    if(flag == 1)
    return ;
    flag = 2;
}

function moveRight(){
    if(flag == 2)
    return ;
    flag = 1;
}

function moveUp(){
    if(flag == 4)
    return ;
    flag = 3;
}

function moveDown(){
    if(flag == 3)
    return 4;
    flag = 4;
}

function createBoard(){
    ctx.fillStyle = "#008000"; 
    ctx.fillRect(0,0,len,breadth);
}

function createFoodCoordinates(){
   foodX = (Math.floor(Math.random()*600)*20)%600;
   foodY = (Math.floor(Math.random()*600)*20)%600;
}
function placeOnBoard(){
    placeFood();
    for(let i=0;i<snakeBody.length;i++)
    {
        if(i == 0)
        {
            ctx.fillStyle = "#ffff00";
        }
        else
        {
            ctx.fillStyle = "#000";
        }
        ctx.fillRect(snakeBody[i].x,snakeBody[i].y,sizeOfSnake,sizeOfSnake);
    }
}

function placeFood(){
    ctx.fillStyle = "#DB7093"
    ctx.fillRect(foodX,foodY,20,20);
}

function move(){
    var prevheadX = snakeBody[0].x;
    var prevHeadY = snakeBody[0].y;
    if(flag == 1)
    {
        snakeBody[0].x += sizeOfSnake;
    }
    if(flag == 2)
    {
        snakeBody[0].x -= sizeOfSnake;
    }
    if(flag == 3)
    {
        snakeBody[0].y -= sizeOfSnake;
    }
    if(flag == 4)
    {
        snakeBody[0].y += sizeOfSnake;
    }

    snakeBody[0].x = snakeBody[0].x%len;
    snakeBody[0].y = snakeBody[0].y%breadth;

    if(snakeBody[0].x < 0)
    {
        snakeBody[0].x += breadth;
    }
    if(snakeBody[0].y < 0)
    {
        snakeBody[0].y += len;
    }

    for(let i=1;i<snakeBody.length;i++)
    {
        var prevx = snakeBody[i].x;
        var prevy = snakeBody[i].y;
        
        snakeBody[i].x = prevheadX;
        snakeBody[i].y = prevHeadY;

        prevheadX = prevx;
        prevHeadY = prevy;
    }
    if(checkHit() == true)
    {
        clearInterval(timer);
        alert("Game Over");
    }
    if(snakeBody[0].x == foodX && snakeBody[0].y == foodY)
    {
        createFoodCoordinates();
        updateScore();
        snakeBody.push({
            x:prevheadX,
            y:prevHeadY
        })
    }
    placeOnBoard();
}

function checkHit(){
    for(let i=1;i<snakeBody.length;i++)
    {
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y)
        return true;
    }
}

function updateScore(){
    count++;
    score.textContent = count
}
let timer = setInterval(() => {
    createBoard();
    move();
}, speed);