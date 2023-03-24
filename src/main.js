const boardGame = document.querySelector(".board__game")
const scoreText = document.querySelector(".score__text")
const btnReset = document.querySelector(".btn__reset")

const ctx = boardGame.getContext("2d")
const gameWidht = boardGame.width
const gameheight = boardGame.height

const boardBg = "white"
const snakeColor = "lightgreen"
const snakeBorder = "black"
const foodColor = "red"

const unitSize = 25 //root unit
let running = false //game running or not
let xVelocity = unitSize //how far we moe in the x axis every game
let yVelocity = 0 //how far we move in the y axis every game
let foodX 
let foodY

let score = 0
let snake = [ //array of body parts
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0} //top left corner
]


window.addEventListener("keydown", changeDirection)
btnReset.addEventListener("click", resetGame)

gameStart()

function gameStart(){
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 75)
    } else{
        displayGameOver()
    }
}
function clearBoard(){
  ctx.fillStyle = boardBg
  ctx.fillRect(0, 0, gameWidht, gameheight) //top left corner, bottom right corner
}
function createFood(){
  const randomFood = (min, max) => {
    const randNum = Math.round((Math.random() * (max - min)) / unitSize) * unitSize;
    return randNum
  }
  foodX = randomFood(0, gameWidht - unitSize)
  foodY = randomFood(0, gameWidht - unitSize)
}
function drawFood(){
  ctx.fillStyle = foodColor //color
  ctx.fillRect(foodX, foodY, unitSize, unitSize) //coordinate X, coordinate Y, widht, height
}
function moveSnake(){
    const head = {
        x: snake[0].x  + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head)
    //if food is eaten
    if(snake[0].x === foodX && snake[0].y === foodY){
        score += 1
        scoreText.textContent = score
        createFood()
    }
    else{
        snake.pop()
    }
}
function drawSnake(){
  ctx.fillStyle = snakeColor //color
  ctx.strokeStyle = snakeBorder //border
  for(let i = 0; i < snake.length; i++){
    ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize) //coordinate X, coordinate Y, widht, height
    ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize) //add a strke on the snake body
  }
}
function changeDirection(event){
    const keyPress = event.keyCode 
    console.log(keyPress)
    const left = 37,
    top = 38,
    right = 39, 
    bottom = 40

    const keyUP = (yVelocity == -unitSize)
    const keyDown = (yVelocity == unitSize)
    const keyLeft = (xVelocity == unitSize)
    const keyRight = (xVelocity == -unitSize)

    switch(true){
        case(keyPress == left && !keyRight):
            xVelocity = -unitSize
            yVelocity = 0
        break
        case(keyPress == top && !keyDown):
            xVelocity = 0
            yVelocity = -unitSize
        break
        case(keyPress == right && !keyLeft):
            xVelocity = unitSize
            yVelocity = 0
        break
        case(keyPress == bottom && !keyUP):
            xVelocity = 0
            yVelocity = unitSize
        break
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
                running = false
            break
        case(snake[0].y < 0):
                running = false
            break
        case(snake[0].x >= gameWidht):
                running = false
            break
        case(snake[0].y >= gameheight):
                running = false
            break
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}
function displayGameOver(){
    ctx.font = "50px MV Boil"
    ctx.fillStyle = "Black"
    ctx.textAlign = "center"
    ctx.fillText("Game Over", gameWidht / 2, gameheight / 2)
    running = false
}
function resetGame(){
    score = 0
    scoreText.textContent = score
    snake = [ //array of body parts
        {x: unitSize * 6, y: 0},
        {x: unitSize * 5, y: 0},
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0} //top left corner
    ]
    gameStart()
}
