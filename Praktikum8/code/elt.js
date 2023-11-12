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

function showBoard() {
  const board = document.querySelector(".board")
  // Clear the board before rendering new pieces
  board.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const field = elt("div", { class: "field" })
      if(boardState[i][j] === 'r') {
        field.appendChild(elt("div", { class: "red piece" }))
      }
      if(boardState[i][j] === 'b') {
        field.appendChild(elt("div", { class: "blue piece" }))
      }
      board.appendChild(field)
    }
  }
}

var timer

function setTimer(){
  timer = setInterval(function(){randomSetter()}, 1000)
}

function randomSetter(){
  column = Math.floor(Math.random() * (6 - 0 + 1) + 0)
  row = Math.floor(Math.random() * (5 - 0 + 1) + 0)
  state = Math.floor(Math.random() * (2 - 0 + 1) + 0)

  if(state === 0){
    boardState[row][column] = 'r'
  }
  else if(state === 1){
    boardState[row][column] = 'b'
  }
  else if(state === 2){
    boardState[row][column] = ''
  }
  showBoard()
}
