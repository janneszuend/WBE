const Player = {
  red: "r",
  blue: "b",
};

let currentPlayer = Player.red;
let previousPlayer = Player.blue;
let isServerConnected = false;

let boardState = Array(6)
  .fill("-")
  .map((el) => Array(7).fill("-"));

let stateSeq = [];

let winner = false;

const SERVICE = "http://localhost:3000/api/data?api-key=c4game";

//  Initialize game
//
function initGame() {
  stateSeq.push(boardState.map((arr) => arr.slice()));
  let board = showBoard();
  winner = false;
}

function shouldButtonBeVisible() {
  checkServerAvailability();
  let loadFromServerButton = document.querySelector(".loadFromServerButton");
  loadFromServerButton.style.visibility = isServerConnected
    ? "visible"
    : "hidden";
  let saveToServerButton = document.querySelector(".saveToServerButton");
  saveToServerButton.style.visibility = isServerConnected
    ? "visible"
    : "hidden";
}

//  Show board
//
function showBoard() {
  const board = document.querySelector(".board");
  board.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      let field = document.createElement("div");

      if (boardState[i][j] === "-") {
        renderSJDON(["div", { class: "field" }], field);
      }

      if (boardState[i][j] === "r") {
        renderSJDON(
          ["div", { class: "field" }, ["div", { class: "red piece" }]],
          field
        );
      }

      if (boardState[i][j] === "b") {
        renderSJDON(
          ["div", { class: "field" }, ["div", { class: "blue piece" }]],
          field
        );
      }
      field.addEventListener("click", (event) => setStone(j));
      board.appendChild(field);
    }
  }

  if (countStones("r") > countStones("b")) {
    currentPlayer = Player.blue;
  } else {
    currentPlayer = Player.red;
  }

  document.getElementById("currentPlayer").textContent = getCurrentPlayer();
  shouldButtonBeVisible();
}

//  Helper function for DOM manipulation
//
function elt(type, attrs, ...children) {
  let node = document.createElement(type);
  for (a in attrs) {
    node.setAttribute(a, attrs[a]);
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

function setStone(column) {
  let rowElements = getRowElementsInArray(column);
  for (let i = 5; i >= 0; i--) {
    if (rowElements[i] === "-") {
      boardState[i][column] = currentPlayer;
      break;
    }
  }

  previousPlayer = currentPlayer;
  if (currentPlayer === Player.red) {
    currentPlayer = Player.blue;
  } else {
    currentPlayer = Player.red;
  }

  // how to push a copy of the array to a array
  stateSeq.push(boardState.map((arr) => arr.slice()));

  showBoard();

  //  Check for winner
  if (connect4Winner(previousPlayer, boardState)) {
    document.getElementById("winner").textContent =
      getPreviousPlayer() + " wins!";
    winner = true;
  }
  if (winner) {
    setTimeout(() => {
      alert("Player " + getPreviousPlayer() + " has won the game!");
    }, 10);
  }
}

function getRowElementsInArray(column) {
  let rowElements = [];
  for (let i = 0; i < 6; i++) {
    rowElements.push(boardState[i][column]);
  }
  return rowElements;
}

function getCurrentPlayer() {
  if (currentPlayer === Player.red) {
    return "red";
  } else {
    return "blue";
  }
}

function getPreviousPlayer() {
  if (previousPlayer === Player.red) {
    return "red";
  } else {
    return "blue";
  }
}

function reset() {
  boardState = Array(6)
    .fill("-")
    .map((el) => Array(7).fill("-"));
  currentPlayer = Player.red;
  document.getElementById("winner").textContent = "you both are loosers";
  stateSeq = [];
  initGame();
}

function undo() {
  if (stateSeq.length > 1) {
    currentPlayer = previousPlayer;
    stateSeq.pop();
    boardState = stateSeq[stateSeq.length - 1];
  }
  showBoard();
}

function checkServerAvailability() {
  fetch(SERVICE, {
    method: "GET",
  })
    .then((response) => {
      console.log("Server is available");
      isServerConnected = true;
      // Server is available, you can enable the buttons here
    })
    .catch((error) => {
      console.log("Server is not available");
      isServerConnected = false;
      // Server is not available, you can disable the buttons here
    });
}

// Save current state to LocalStorage
function saveState() {
  localStorage.setItem("boardState", JSON.stringify(boardState));
}

// Load state from LocalStorage
function loadState() {
  const savedState = localStorage.getItem("boardState");
  if (savedState) {
    boardState = JSON.parse(savedState);
    showBoard();
  }
}

function loadStateFromServer() {
  fetch(SERVICE, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      boardState = data.board;
      showBoard();
    });
}

//  Put current state to server
//
function saveStateToServer() {
  fetch(SERVICE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // replace with the actual id
      board: boardState,
    }),
  });
}

function countStones(colour) {
  let count = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (boardState[i][j] === colour) {
        count++;
      }
    }
  }
  return count;
}

function connect4Winner(colour, board) {
  let winner = false;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        board[i][j] === colour &&
        board[i][j + 1] === colour &&
        board[i][j + 2] === colour &&
        board[i][j + 3] === colour
      ) {
        winner = true;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (
        board[i][j] === colour &&
        board[i + 1][j] === colour &&
        board[i + 2][j] === colour &&
        board[i + 3][j] === colour
      ) {
        winner = true;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        board[i][j] === colour &&
        board[i + 1][j + 1] === colour &&
        board[i + 2][j + 2] === colour &&
        board[i + 3][j + 3] === colour
      ) {
        winner = true;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 3; j < 7; j++) {
      if (
        board[i][j] === colour &&
        board[i + 1][j - 1] === colour &&
        board[i + 2][j - 2] === colour &&
        board[i + 3][j - 3] === colour
      ) {
        winner = true;
      }
    }
  }
  return winner;
}

function renderSJDON(element, appRoot) {
  let [tag, props, ...children] = element;

  let el = document.createElement(tag);
  for (let p in props) {
    el.setAttribute(p, props[p]);
  }

  for (let child of children) {
    let node = document.createElement(child[0]);
    let num = child.length;
    for (let i = 1; i < num; i++) {
      if (typeof child[i] === "string") {
        node.textContent = child[i];
      } else {
        let attrs = child[i];
        for (let a in attrs) {
          node.setAttribute(a, attrs[a]);
        }
      }
    }
    el.appendChild(node);
  }
  appRoot.appendChild(el);
}
