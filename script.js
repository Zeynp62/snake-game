/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let board
let food
let gameOver
let score
let snake
let gameStart
let direction
/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector('#message')
const scoreEl = document.querySelector('#score')
const reserBtn = document.querySelector('#reset')
const boardEl = document.querySelector('#board')
/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = []
  winState = false
  score = 0
  snake = [' ']
  food
  gameStart = false
  direction = 'right'
  render()
}
const generateMap = () => {
  for (let i = 0; i < 8; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      const newDivs = document.createElement('div')
      newDivs.classList.add('sqr')
      newDivs.id = `${i}-${j}`
      boardEl.appendChild(newDivs)
      board[i][j] = newDivs
    }
  }
  //console.log(board)// displaying the board in console
}

const render = () => {}
const placeFood = () => {
  foodIndexI = Math.floor(Math.random() * (7 - 0 + 1) + 0)
  foodIndexJ = Math.floor(Math.random() * (7 - 0 + 1) + 0)
  document.getElementById(`${foodIndexI}-${foodIndexJ}`).style.backgroundColor =
    'red'
}
const updateMessage = () => {
  // if (Event) {
  //   messageEl.textContent = `Game started`
  // } else if (gameOver) {
  //   messageEl.textContent = `Game Over`
  // }
}
const checkGameOver = () => {}
const generateSnake = () => {
  snakeIndexI = Math.floor(Math.random() * (7 - 0 + 1) + 0)
  snakeIndexJ = Math.floor(Math.random() * (7 - 0 + 1) + 0)
  document.getElementById(
    `${snakeIndexI}-${snakeIndexJ}`
  ).style.backgroundColor = 'green'
  snake = document.getElementById(`${snakeIndexI}-${snakeIndexJ}`)
}
const calculateScore = () => {
  scoreEl.textContent = `Score: ${score} `
}
const movingSnake = () => {}
//-------------------------------------------------------------------------------
function handleKeyPress(event) {
  if (!event) return
  //   if (
  //     (!gameStarted && event.code === 'Space') ||
  //     (!gameStarted && event.key === ' ')
  //   ) {
  //     startGame()
  //   } else {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') {
        --snakeIndexI
        snake = document.getElementById(`${snakeIndexI}-${snakeIndexJ}`)
        direction = 'up'
        break
      }
    case 'ArrowDown':
      if (direction !== 'up') {
        ++snakeIndexI
        snake = document.getElementById(`${snakeIndexI}-${snakeIndexJ}`)
        direction = 'down'
        break
      }
    case 'ArrowLeft':
      if (direction !== 'right') {
        --snakeIndexJ
        snake = document.getElementById(`${snakeIndexI}-${snakeIndexJ}`)
        direction = 'left'
        break
      }
    case 'ArrowRight':
      if (direction !== 'left') {
        ++snakeIndexJ
        snake = document.getElementById(`${snakeIndexI}-${snakeIndexJ}`)
        direction = 'right'
        break
      }

      console.log(snakeIndexI)
  }
}
// }

/*----------------------------- Event Listeners -----------------------------*/
window.onload = () => {
  init()
}
init()
generateMap()
placeFood()
generateSnake()
calculateScore()
handleKeyPress()
document.addEventListener('keydown', handleKeyPress)
