/*eslint no-unused-vars: ["off"] */
/* global DMAX, BLOCK, NB_BLOC */

function Territoire () {
  this.map = []
  for (var i = 0; i < DMAX; i++) {
    this.map[i] = []
    for (var j = 0; j < DMAX; j++) {
      this.map[i][j] = null
    }
  }

  this.place = function (object) {
    do {
      var x = Math.floor(Math.random() * DMAX)
      var y = Math.floor(Math.random() * DMAX)
    } while (!this.is_free(x, y))
    this.map[x][y] = object
    object.moveTo(x, y)
  }

  this.is_free = function (arow, acol) {
    return this.map[arow][acol] == null || this.map[arow][acol].type == "weapon"
  }

  this.moveTo = function (row, col, piece) {
    this.map[piece.getRow()][piece.getCol()] = piece.oldContent
    piece.oldContent = this.map[row][col]
    this.map[row][col] = piece
    piece.moveTo(row, col)
  }
}
