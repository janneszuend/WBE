function connect4Winner(colour, board) {
  let winner = false
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === colour && board[i][j + 1] === colour && board[i][j + 2] === colour && board[i][j + 3] === colour) {
        winner = true
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      if (board[i][j] === colour && board[i + 1][j] === colour && board[i + 2][j] === colour && board[i + 3][j] === colour) {
        winner = true
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === colour && board[i + 1][j + 1] === colour && board[i + 2][j + 2] === colour && board[i + 3][j + 3] === colour) {
        winner = true
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 3; j < 7; j++) {
      if (board[i][j] === colour && board[i + 1][j - 1] === colour && board[i + 2][j - 2] === colour && board[i + 3][j - 3] === colour) {
        winner = true
      }
    }
  }
  return winner
}

module.exports = { connect4Winner }