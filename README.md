/_-------------------------------- Constants --------------------------------_/

/_-------------------------------- Variables --------------------------------_/
let board
let food
let gameOver
let score
let snake
/_------------------------ Cached Element References ------------------------_/
const messageEl = document.querySelector('#message')
const scoreEl = document.querySelector('#score')
const reserBtn = document.querySelector('#reset')
const boardEl = document.querySelector('#board')
/_-------------------------------- Functions --------------------------------_/
const init = () => {
board = Array(8).fill(null).map(() => Array(8).fill(' ')) // 8x8 2D array for the board
winState = false
score = 0
snake = []
food
render()
}

const generateMap = () => {
boardEl.style.display = 'grid'
boardEl.style.gridTemplateColumns = 'repeat(8, 1fr)' // Set up a grid with 8 columns for visual layout

for (let row = 0; row < 8; row++) {
for (let col = 0; col < 8; col++) {
const newDiv = document.createElement('div')
newDiv.classList.add('sqr')
newDiv.id = `${row}-${col}` // Use row-col as id to identify each cell
boardEl.appendChild(newDiv)
}
}
}

const render = () => {}

const placeFood = () => {
const foodRow = Math.floor(Math.random() _ 8)
const foodCol = Math.floor(Math.random() _ 8)
board[foodRow][foodCol] = 'F' // Place food in the board array

const foodDiv = document.getElementById(`${foodRow}-${foodCol}`)
foodDiv.style.backgroundColor = 'red'
}

const updateMessage = () => {
// Update message logic here
}

const checkGameOver = () => {}

const generateSnake = () => {
const snakeRow = Math.floor(Math.random() _ 8)
const snakeCol = Math.floor(Math.random() _ 8)
board[snakeRow][snakeCol] = 'S' // Place snake in the board array

const snakeDiv = document.getElementById(`${snakeRow}-${snakeCol}`)
snakeDiv.style.backgroundColor = 'green'
snake.push({ row: snakeRow, col: snakeCol }) // Track snake position in an array
}

const calculateScore = () => {
scoreEl.textContent = `Score: ${score} `
}

const movingSnake = () => {}

/_----------------------------- Event Listeners -----------------------------_/
window.onload = () => {
init()
}

init()
generateMap()
placeFood()
generateSnake()
calculateScore()

---

for (let i = 0; i < 8; i++) {
board[i] = [] // Create a new row
for (let j = 0; j < 8; j++) {
board[i][j] = ' ' // Initialize each cell with a blank space
}
}

console.log(board)
