
import { render, parseSjdon, createElement } from "./lib/suiweb.min.js"

let state = {
  board: [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ]
  ],
  next: 'r'
}

let stateSeq = []


//  Components
//
const App = () => [Board, {board: state.board}] 

const Board = ({board}) => {
  let flatBoard = [].concat(...board)
  let fields = flatBoard.map((type) => [Field, {type}])
  return (
    ["div", {"class": "board"}, ...fields]
  )
}

const Field = ({type}) => {
  // ...
}


//  Show board:
//  render [App]
//
function showBoard () {
  const app = document.querySelector(".app")
  render([App], app)
  return app
}


  
// document.querySelector("button.undo").addEventListener("click", () => {
//   if (stateSeq.length > 0) {
//     state = stateSeq.pop()
//     showBoard()
//   }
// })

