/*eslint no-unused-vars: ["off"] */
/* global DMAX, BLOCK, NB_BLOC */

function Territoire () {
  this.map = []
  for (var i = 0; i < DMAX; i++) {
    this.map[i] = []
    for (var j = 0; j < DMAX; j++) {
      this.map[i][j] = 0
    }
  }
  for (i = 0; i < NB_BLOC; i++) {
    this.map[ Math.floor(Math.random() * DMAX) ] [ Math.floor(Math.random() * DMAX) ] = BLOCK
  }

  this.is_free = function (arow, acol) {
    return this.map[arow][acol] == 0
  }

  this.setCase = function (row, col, value) {
    this.map[row][col] = value
  }
}
