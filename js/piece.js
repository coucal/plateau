/*global DMAX */
/*eslint no-unused-vars: ["off"] */
/*eslint new-parens: ["off"] */
// Classe qui représente les pièces du jeu

const D_STRENGTH = 100 // force par défaut

// Classe abstraite
function Piece () {
  this.name = ""
  this.oldContent = null
  // représentation graphique de la pièce
  this.icon = function () {
    return "<img src = \"icon/" + this.type + "-" + this.name + ".png\">"
  }

  // enregistre la position courante de la pièce
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
  this.weapon = new Weapon("sword", 10) // arme par défaut
  this.strength = D_STRENGTH
  this.modeCombat = ""

  // methode d'attaque
  this.attack = function (otherPlayer) {
    var strike = this.weapon.power
    // si l'autre joueur est en mode défense les degats sont divisés par deux
    if (otherPlayer.modeCombat == "D") {
      strike = strike / 2
    }
    otherPlayer.strength -= strike
    if (otherPlayer.strength < 0) {
      otherPlayer.strength = 0
    }
    return strike
  }
}
Player.prototype = new Piece

// Objet arme
function Weapon (newName, newPower) {
  this.type = "weapon"
  this.name = newName
  this.power = newPower
}
Weapon.prototype = new Piece

// Objet Bloc (occuoe une case)
function Block () {
  this.type = "placeholder"
  this.name = "block"
}
Block.prototype = new Piece
