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

const SERVICE = "http://localhost:3000/api/data?api-key=c4game";

//  Initialize game
//
function initGame() {
  let board = showBoard();
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
      const field = elt("div", { class: "field" });
      field.addEventListener("click", (event) => setStone(j));
      if (boardState[i][j] === "r") {
        field.appendChild(elt("div", { class: "red piece" }));
      }
      if (boardState[i][j] === "b") {
        field.appendChild(elt("div", { class: "blue piece" }));
      }
      board.appendChild(field);
    }
  }

  // for (let i = 0; i < 6; i++) {
  //   let row = ["div", { style: "background: white" }];
  //   for (let j = 0; j < 7; j++) {
  //     let cell = ["div", { class: "field" }, "-"];
  //     row.push(cell);
  //   }
  //   renderSJDON(row, board);
  // }

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

  showBoard();

  //  Check for winner
  if (connect4Winner(previousPlayer, boardState)) {
    document.getElementById("winner").textContent =
      getPreviousPlayer() + " wins!";
  }

  // if (connect4Winner(previousPlayer, boardState)) {
  //   showBoard()
  //   alert(getPreviousPlayer() + ' wins!')
  //   //reset()
  // }
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
  initGame();
}

// //  Attach event handler to board
// //
// function attachEventHandler (board) {
//   board.addEventListener("click", (e) => {

//     // ...
//     // your implementation
//     // ...

//     showBoard()
//   })
// }

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

function loadState() {
  fetch(SERVICE, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      boardState = data.board;
      showBoard();
    });
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
function saveState() {
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
  let [tag, props, ...children] = element

  let el = document.createElement(tag)
  for (let p in props) {
    el.setAttribute(p, props[p])
  }

  for (let child of children) {
    let node = document.createElement(child[0])
    let num = child.length
    for (let i = 1; i < num; i++) {
      if (typeof child[i] === "string") {
        node.textContent = child[i]
      } else {
        let attrs = child[i];
        for (let a in attrs) {
          node.setAttribute(a, attrs[a])
        }
      }
    }
    el.appendChild(node)
  }
  appRoot.appendChild(el)
}
