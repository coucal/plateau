/*eslint no-unused-vars: ["off"] */
/* global Territoire, Player, Block, carte, plateau, curPlayer */
/* eslint no-native-reassign: ["off"] */

const DMAX = 10
const BLOCK = 9
const NB_BLOC = 5

var aTerr = new Territoire()
carte.init(aTerr)

for (var i = 0; i < NB_BLOC; i++) {
  aTerr.place(new Block())
}

var player1 = new Player("A")
aTerr.place(player1)
var player2 = new Player("B")
aTerr.place(player2)

carte.draw(aTerr)

carte.select(player1)

curPlayer = player1

plateau.addEventListener("click", playturn, false)

function playturn (event) {
  var where = event.target.dataset

  console.log(where)
  var oldrow = curPlayer.getRow()
  var oldcol = curPlayer.getCol()
  if (aTerr.is_free(parseInt(where.row), parseInt(where.col)) && carte.isSelected(parseInt(where.row), parseInt(where.col))) {
    play(parseInt(where.row), parseInt(where.col), curPlayer)
    carte.draw(aTerr)
    if (curPlayer == player1) {
      curPlayer = player2
    } else {
      curPlayer = player1
    }
    carte.select(curPlayer)
  } else {
    console.log("Notfree", where.row, where.col)
  }
}

function play (row, col, player) {
  console.log("play", row, col, player)
  aTerr.moveTo(row, col, player)
}
