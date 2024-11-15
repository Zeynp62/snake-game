/*-------------------------------- Variables --------------------------------*/
let board
let food
let gameOver
let score
let snake
let gameStart
let direction
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const reserBtn = document.querySelector('#reset')
const messageEl = document.querySelector('#message')

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = []
  gameOver = false
  score = 0
  direction = 'right'
  generateMap()
  generateSnake()
  generateFood()
  render()
  calculateScore()
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
}
const generateSnake = () => {
  let i = Math.floor(Math.random() * 8)
  let j = Math.floor(Math.random() * 8)
  snake = [{ x: i, y: j }]
}
const render = () => {
  document.querySelectorAll('.snakeClass').forEach((sqr) => {
    sqr.classList.remove('snakeClass')
  })

  snake.forEach((part) => {
    const snakePart = document.getElementById(`${part.x}-${part.y}`)
    snakePart.classList.add('snakeClass')
  })
}

const generateFood = () => {
  const foodIndexI = Math.floor(Math.random() * 8)
  const foodIndexJ = Math.floor(Math.random() * 8)
  food = { x: foodIndexI, y: foodIndexJ }
  document.getElementById(`${foodIndexI}-${foodIndexJ}`).style.backgroundColor =
    'red'
}

const calculateScore = () => {
  scoreEl.textContent = `Score: ${score}`
}

const moveSnake = () => {
  const head = { ...snake[0] }

  if (direction === 'right') head.y++
  else if (direction === 'left') head.y--
  else if (direction === 'down') head.x++
  else if (direction === 'up') head.x--

  snake.unshift(head)
  snake.pop()

  render()
}
const updateMessage = () => {
  // if (Event) {
  //   messageEl.textContent = `Game started`
  // } else if (gameOver) {
  //   messageEl.textContent = `Game Over`
  // }
}
const checkGameOver = () => {}

function handleKeyPress(event) {
  if (event.code === 'ArrowRight') direction = 'right'
  if (event.code === 'ArrowLeft') direction = 'left'
  if (event.code === 'ArrowDown') direction = 'down'
  if (event.code === 'ArrowUp') direction = 'up'
}
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', handleKeyPress)
reserBtn.addEventListener('click', init)
window.onload = () => {
  init()
  setInterval(moveSnake, 300)
}
