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
  '0-9',
  '0-10',
  '1-0',
  '2-0',
  '3-0',
  '4-0',
  '5-0',
  '6-0',
  '7-0',
  '8-0',
  '9-0',
  '10-0',
  '10-1',
  '10-2',
  '10-3',
  '10-4',
  '10-5',
  '10-6',
  '10-7',
  '10-8',
  '10-9',
  '10-10',
  '1-10',
  '2-10',
  '3-10',
  '4-10',
  '5-10',
  '6-10',
  '7-10',
  '8-10',
  '9-10',
  '10-10'
]
/*-------------------------------- Variables --------------------------------*/
let board
let food
let gameOver
let score
let snake
let gameStart
let direction
let lastDirection
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const reserBtn = document.querySelector('#reset')
const messageEl = document.querySelector('#message')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  board = []
  gameOver = false
  gameStart = true
  score = 0
  direction = 'up'
  lastDirection = ''
  generateMap()
  boardFrame()
  generateSnake()
  generateFood()
  updateMessage()
  render()
}
const generateMap = () => {
  for (let i = 0; i < 11; i++) {
    board[i] = []
    for (let j = 0; j < 11; j++) {
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
  } while (
    gameOverCombos.includes(foodPosition) ||
    isFoodOnSnake(foodIndexI, foodIndexJ)
  )

  food = { x: foodIndexI, y: foodIndexJ }
  document.getElementById(`${foodIndexI}-${foodIndexJ}`).style.backgroundColor =
    'coral'
}

const calculateScore = () => {
  scoreEl.textContent = `Score: ${score}`
  const head = snake[0]

  if (head.x === food.x && head.y === food.y) {
    score++
    scoreEl.textContent = `Score: ${score}`
    const newHead = { x: head.x, y: head.y }
    snake.unshift(newHead)
    document.getElementById(`${food.x}-${food.y}`).style.backgroundColor = ''
    generateFood()
  }
}
const moveSnake = () => {
  const head = { ...snake[0] }
  if (!gameOver) {
    if (direction === 'right') {
      head.y++
      lastDirection = 'right'
    } else if (direction === 'left') {
      head.y--
      lastDirection = 'left'
    } else if (direction === 'down') {
      head.x++
      lastDirection = 'down'
    } else if (direction === 'up') {
      head.x--
      lastDirection = 'up'
    } else {
      direction = direction
    }
  }
  snake.unshift(head)
  snake.pop()
  calculateScore()

  render()
}
const updateMessage = () => {
  if (gameOver) {
    messageEl.textContent = 'Game Over!'
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
    }
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y && i !== 1) {
      gameOver = true
      updateMessage()
    }
  }
}
const isFoodOnSnake = (x, y) => {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      return true
    }
  }
  return false
}
const boardFrame = () => {
  for (let i = 0; i < gameOverCombos.length; i++) {
    document.getElementById(gameOverCombos[i]).style.color = 'blue'
  }
}
// const music = () => {
const sound = new Howl({
  src: ['Eye of the Storm.mp3'],
  loop: true,
  volume: 0.5
})
// }
const handleKeyPress = (event) => {
  if (event.code === 'ArrowRight' && lastDirection != 'left')
    direction = 'right'
  if (event.code === 'ArrowLeft' && lastDirection != 'right') direction = 'left'
  if (event.code === 'ArrowDown' && lastDirection != 'up') direction = 'down'
  if (event.code === 'ArrowUp' && lastDirection != 'down') direction = 'up'
}
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', handleKeyPress)
reserBtn.addEventListener('click', init)
document.getElementById('music').addEventListener('click', () => {
  if (sound.playing()) {
    sound.pause()
  } else {
    sound.play()
  }
})
window.onload = () => {
  init()
  sound.play()
  setInterval(moveSnake, 400)
}
