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
    object.setPos(x, y)
  }

  this.is_free = function (arow, acol) {
    return this.map[arow][acol] == null || this.map[arow][acol].type == "weapon"
  }

  this.setCase = function (row, col, obj) {
    this.map[row][col] = obj
  }

  this.moveTo = function (row, col, obj) {
    // TODO mémoriser ce qu'il y avait dans la case
    this.map[obj.getRow()][obj.getCol()] = null
    this.map[row][col] = obj
    obj.moveTo(row, col)
  }
}
