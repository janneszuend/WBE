function elt (type, attrs, ...children) {
  let node = document.createElement(type)
  Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key])
  })
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
  }
  return node
}

let boardState = Array(6).fill('').map(el => Array(7).fill(''))

const Player = {
  red: 'r',
  blue: 'b'
} 

let currentPlayer = Player.red

function showBoard() {
  const board = document.querySelector(".board")
  board.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const field = elt("div", { class: "field" })
      field.addEventListener("click", event => setStone(j))
      if(boardState[i][j] === 'r') {
        field.appendChild(elt("div", { class: "red piece" }))
      }
      if(boardState[i][j] === 'b') {
        field.appendChild(elt("div", { class: "blue piece" }))
      }
      board.appendChild(field)
    }
  }
  document.getElementById('currentPlayer').textContent = getCurrentPlayer()
}

function setStone(column){
  let rowElements = getRowElementsInArray(column)
  for(let i = 5; i >= 0; i--){
    if(rowElements[i] === ''){
      boardState[i][column] = currentPlayer
      break
    }
  }
  if (currentPlayer === Player.red) {
    currentPlayer = Player.blue
  } else {
    currentPlayer = Player.red
  }
  showBoard()
}

function getRowElementsInArray(column){
  let rowElements = []
  for(let i = 0; i < 6; i++){
    rowElements.push(boardState[i][column])
  }
  return rowElements
}

function getCurrentPlayer() {
  if (currentPlayer === Player.red) {
    return 'red'
  } else {
    return 'blue'
  }
}

function reset() {
  boardState = Array(6).fill('').map(el => Array(7).fill(''))
  currentPlayer = Player.red
  showBoard()
}

