/*global DMAX */
/*eslint no-unused-vars: ["off"] */
/*eslint new-parens: ["off"] */

const D_STRENGTH = 100
function Piece () {
  this.name = ""
  this.oldContent = null
  this.icon = function () {
    return "<img src = \"icon/" + this.type + "-" + this.name + ".png\">"
  }

  this.getRow = function () {
    return this.row
  }

  this.getCol = function () {
    return this.col
  }

  this.setPos = function (newRow, newCol) {
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
  this.oldContent = null
  this.weapon = new Weapon("sword", 10)
  this.strength = D_STRENGTH
  this.modeCombat = ""

  this.getWeapon = function () {
    return this.weapon
  }

  this.attack = function (otherPlayer) {
    var strike = this.weapon.power
    console.log(this.name + " attaque " + strike + " -> " + otherPlayer.name + " = " + otherPlayer.strength)
    if (otherPlayer.modeCombat == "D") {
      strike = strike / 2
    }
    otherPlayer.strength -= strike
    if (otherPlayer.strength < 0) {
      otherPlayer.strength = 0
    }
    console.log(otherPlayer.name + " prend " + strike + " = " + otherPlayer.strength)
    return strike
  }
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
