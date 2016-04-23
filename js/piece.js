/*global DMAX */
/*eslint no-unused-vars: ["off"] */
/*eslint new-parens: ["off"] */

const D_STRENGTH = 10
function Piece () {
  this.name = ""
  this.icon = function () {
    return "<img src = \"icon/" + this.type + "-" + this.name + ".png\">"
  }

  this.getRow = function () {
    return this.row
  }

  this.getCol = function () {
    return this.col
  }

  this.setPos = function (aRow, aCol) {
    this.row = aRow
    this.col = aCol
  }

  this.moveTo = function (newRow, newCol) {
    this.row = newRow
    this.col = newCol
  }
}
// objet Joueur
function Player (newName) {
  this.row = 0
  this.col = 0
  this.type = "player"
  this.name = newName
  this.weapon = null
  this.strength = D_STRENGTH
}
Player.prototype = new Piece

function Weapon (newName, newPower) {
  this.type = "weapon"
  this.name = newName
  this.power = newPower
}
Weapon.prototype = new Piece

function Block () {
  this.type = "placeholder"
  this.name = "block"
}
Block.prototype = new Piece
