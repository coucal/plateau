/*global DMAX */


function Player (newId) {
  this.row = Math.floor(Math.random() * DMAX)
  this.col = Math.floor(Math.random() * DMAX)
  this.id = newId
  console.log(this.row, this.col, newId)
  this.getRow = function () {
    return this.row
  }

  this.getCol = function () {
    return this.col
  }

  this.moveTo = function (newRow, newCol) {
    this.row = newRow
    this.col = newCol
  }

}
