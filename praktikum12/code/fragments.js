import { render, parseSjdon, createElement } from "./lib/suiweb.min.js";

const SERVICE = "http://localhost:3000/api/data?api-key=c4game";

const Player = {
  red: "r",
  blue: "b",
};

let state = {
  board: [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ],
  current: Player.red,
  previous: Player.blue,
  winner: false,
  isServerConnected: false,
};

let stateSeq = [];

function initGame() {
  stateSeq.push(state.board.map((arr) => arr.slice()));
  showBoard();
  state.board.winner = false;
}

function shouldButtonBeVisible() {
  checkServerAvailability();
  let loadFromServerButton = document.querySelector(".loadFromServerButton");
  loadFromServerButton.style.visibility = state.isServerConnected
    ? "visible"
    : "hidden";
  let saveToServerButton = document.querySelector(".saveToServerButton");
  saveToServerButton.style.visibility = state.isServerConnected
    ? "visible"
    : "hidden";
}

function setStone(column) {
  let rowElements = getRowElementsInArray(column);
  for (let i = 5; i >= 0; i--) {
    if (rowElements[i] === "-") {
      state.board[i][column] = currentPlayer;
      break;
    }
  }

  state.previous = state.current;
  if (state.current === Player.red) {
    state.current = Player.blue;
  } else {
    state.current = Player.red;
  }

  // how to push a copy of the array to a array
  stateSeq.push(state.board.map((arr) => arr.slice()));

  showBoard();

  //  Check for winner
  if (connect4Winner(state.previous, state.board)) {
    document.getElementById("winner").textContent =
      getPreviousPlayer() + " wins!";
    state.winner = true;
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
  if (state.current === Player.red) {
    return "red";
  } else {
    return "blue";
  }
}

function getPreviousPlayer() {
  if (state.previous === Player.red) {
    return "red";
  } else {
    return "blue";
  }
}

function reset() {
  state.board = Array(6)
    .fill("-")
    .map((el) => Array(7).fill("-"));
  state.current = Player.red;
  document.getElementById("winner").textContent = "you both are loosers";
  stateSeq = [];
  initGame();
}

function undo() {
  if (stateSeq.length > 1) {
    state.current = staet.previous;
    stateSeq.pop();
    state.board = stateSeq[stateSeq.length - 1];
  }
  showBoard();
}

function checkServerAvailability() {
  fetch(SERVICE, {
    method: "GET",
  })
    .then((response) => {
      console.log("Server is available");
      state.isServerConnected = true;
      // Server is available, you can enable the buttons here
    })
    .catch((error) => {
      console.log("Server is not available");
      state.isServerConnected = false;
      // Server is not available, you can disable the buttons here
    });
}

// Save current state to LocalStorage
function saveState() {
  localStorage.setItem("boardState", JSON.stringify(state.board));
}

// Load state from LocalStorage
function loadState() {
  const savedState = localStorage.getItem("boardState");
  if (savedState) {
    state.board = JSON.parse(savedState);
    showBoard();
  }
}

function loadStateFromServer() {
  fetch(SERVICE, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      state.board = data.board;
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
      board: state.board,
    }),
  });
}

function countStones(colour) {
  let count = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (state.board[i][j] === colour) {
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

//  Components
//
const App = () => [Board, { board: state.board }];

const Board = ({ board }) => {
  let rows = [];
  for (const col in board) {
    rows.push([Row, { coll: board[col] }]);
  }
  return ["div", { class: "board" }, ...rows];
};

const Row = ({ row }) => {
  let fields = row.map((type) => [Field, { type }]);
  return ["div", { class: "row" }, ...fields];
};

const Field = ({type}) => {
  if(type == 'r'){
      return (["div", {"class": "field"}, ["div", {"class" : "red piece"}]])

  }else if (type == 'b'){
      return (["div", {"class": "field"}, ["div", {"class" : "blue piece"}]])
  }
  else{
      return (["div", {"class": "field"}])

  }
}
//  Show board:
//  render [App]
//
function showBoard() {
  const app = document.querySelector(".app");
  render(parseSjdon([App], createElement), app);
  return app;
}

// document.querySelector("button.undo").addEventListener("click", () => {
//   if (stateSeq.length > 0) {
//     state = stateSeq.pop()
//     showBoard()
//   }
// })
