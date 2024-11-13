/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let board
let food
let winState
let score
let snake
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
  snake = []
  food // placed in the same place when start
  render()
}
const generateMap = () => {
  for (let i = 0; i < 64; i++) {
    const newDivs = document.createElement('div')
    newDivs.classList.add('sqr')
    newDivs.id = `${i}`
    boardEl.appendChild(newDivs)
  }
}

const render = () => {}
const placeFood = () => {
  foodIndex = Math.floor(Math.random() * (63 - 0 + 1) + 0)
  document.getElementById(foodIndex).style.backgroundColor = 'red'
}
const updateMessage = () => {}
const checkGameOver = () => {}
const growSnake = () => {}
const calculateScore = () => {}
const movingSnake = () => {}
/*----------------------------- Event Listeners -----------------------------*/
window.onload = () => {
  init()
}
generateMap()
placeFood()
