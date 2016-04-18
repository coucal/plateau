/*eslint no-unused-vars: ["off"] */
/* global Terrain, Player, gui, plateau, jeu  */

const DMAX = 10
const BLOCK = 9
const NB_BLOC = 5

var aTerrain = new Terrain()
gui.init(aTerrain)

var player1 = new Player(1)
var player2 = new Player(2)
if (player1.getRow() == player2.getRow() && player1.getCol() == player2.getCol()) {
  player2.moveTo((player1.getRow() + 3) % DMAX, player2.getCol())
}

aTerrain.setCase(player2.getRow(), player2.getCol(), 2) // provisoire pour éviter les collisions

gui.drawPlayer(player1.getRow(), player1.getCol(), "A")
gui.drawPlayer(player2.getRow(), player2.getCol(), "B")

gui.select(player1.getRow(), player1.getCol(), true)

plateau.addEventListener("click", playturn, false)

function playturn (event) {
  var where = event.target.dataset
  console.log(player1)

  console.log(where)
  var oldrow = player1.getRow()
  var oldcol = player1.getCol()
  if (aTerrain.is_free(parseInt(where.row), parseInt(where.column))) {
    play(parseInt(where.row), parseInt(where.column), 1)
    gui.select(oldrow, oldcol, false)
    console.log(player1)
    gui.select(player1.getRow(), player1.getCol(), true)
  }
}

function play (row, col, player) {
  console.log(row, col, jeu[row][col], jeu[row][col].className)
  if (jeu[row][col].className == "select") {
    jeu[player1.row][player1.col].innerHTML = ""
    player1.row = row
    player1.col = col
    jeu[player1.row][player1.col].innerHTML = "A"
  }
}
