/*-------------------------------- Constants --------------------------------*/
const gameOverCombos = [
  '0-0',
  '0-1',
  '0-2',
  '0-3',
  '0-4',
  '0-5',
  '0-6',
  '0-7',
  '0-8',
  '1-0',
  '2-0',
  '3-0',
  '4-0',
  '5-0',
  '6-0',
  '7-0',
  '8-0',
  '8-2',
  '8-3',
  '8-4',
  '8-5',
  '8-6',
  '8-7',
  '8-8',
  '1-8',
  '2-8',
  '3-8',
  '4-8',
  '5-8',
  '6-8',
  '7-8'
]
/*-------------------------------- Variables --------------------------------*/
let board
let food
let gameOver
let score
let snake
let gameStart = false
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
  updateMessage()
  render()
}
const generateMap = () => {
  for (let i = 0; i < 9; i++) {
    board[i] = []
    for (let j = 0; j < 9; j++) {
      const newDivs = document.createElement('div')
      newDivs.classList.add('sqr')
      newDivs.id = `${i}-${j}`
      boardEl.appendChild(newDivs)
      board[i][j] = newDivs
    }
  }
}
const generateSnake = () => {
  let snakeIndexI, snakeIndexJ
  let snakePosition
  do {
    snakeIndexI = Math.floor(Math.random() * 9)
    snakeIndexJ = Math.floor(Math.random() * 9)
    snakePosition = `${snakeIndexI}-${snakeIndexJ}`
  } while (gameOverCombos.includes(snakePosition))

  snake = [{ x: snakeIndexI, y: snakeIndexJ }]
}
const render = () => {
  document.querySelectorAll('.snakeClass').forEach((sqr) => {
    sqr.classList.remove('snakeClass')
  })

  snake.forEach((part) => {
    const snakePart = document.getElementById(`${part.x}-${part.y}`)
    snakePart.classList.add('snakeClass')
  })
  checkGameOver()
}

const generateFood = () => {
  let foodIndexI, foodIndexJ
  let foodPosition

  do {
    foodIndexI = Math.floor(Math.random() * 9)
    foodIndexJ = Math.floor(Math.random() * 9)
    foodPosition = `${foodIndexI}-${foodIndexJ}`
  } while (gameOverCombos.includes(foodPosition))

  food = { x: foodIndexI, y: foodIndexJ }
  document.getElementById(`${foodIndexI}-${foodIndexJ}`).style.backgroundColor =
    'red'
}

const calculateScore = () => {
  scoreEl.textContent = `Score: ${score}`
  const head = snake[0]

  if (head.x === food.x && head.y === food.y) {
    score++
    scoreEl.textContent = `Score: ${score}`
    console.log(score)
    const newHead = { x: head.x, y: head.y }
    snake.unshift(newHead)
    document.getElementById(`${food.x}-${food.y}`).style.backgroundColor = ''

    generateFood()
  }
}
const moveSnake = () => {
  const head = { ...snake[0] }

  if (direction === 'right') {
    head.y++
  } else if (direction === 'left') {
    head.y--
  } else if (direction === 'down') {
    head.x++
  } else if (direction === 'up') {
    head.x--
  }

  snake.unshift(head)
  snake.pop()
  calculateScore()

  render()
}
const updateMessage = () => {
  if (gameOver) {
    messageEl.textContent = 'Game Over!'
  } else if (!gameStart) {
    messageEl.textContent = 'Press any arrow key to start!'
  } else {
    messageEl.textContent = 'Game in progress...'
  }
}
const checkGameOver = () => {
  const head = snake[0]
  const headPosition = `${head.x}-${head.y}`
  for (let i = 0; i < gameOverCombos.length; i++) {
    if (gameOverCombos.includes(headPosition)) {
      gameOver = true
      updateMessage()
      clearInterval(gameLoop)
      return
    }
  }
  //check if snake eats the tail
}

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
  setInterval(moveSnake, 400)
}
