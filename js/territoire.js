/*eslint no-unused-vars: ["off"] */
/* global DMAX, BLOCK, NB_BLOC */
// Classe qui représente le territoire de jeu

function Territoire () {
  this.map = []
  this.fight = false
  for (var i = 0; i < DMAX; i++) {
    this.map[i] = []
    for (var j = 0; j < DMAX; j++) {
      this.map[i][j] = null
    }
  }
// place une pièce sur une case libre du tableau de jeu
  this.place = function (piece) {
    do {
      var x = Math.floor(Math.random() * DMAX)
      var y = Math.floor(Math.random() * DMAX)
    } while (!this.is_free(x, y))
    this.map[x][y] = piece
    piece.setPos(x, y)
  }

// Retourne true si la case est libre pour s'y déplacer
  this.is_free = function (arow, acol) {
    return this.map[arow][acol] == null || this.map[arow][acol].type == "weapon"
  }

// efface la pièce du tableau et restaure son contenu
  this.clear = function (piece) {
    this.map[piece.row][piece.col] = piece.oldContent
  }

// Déplace une pièce sur le tableau
  this.moveTo = function (row, col, piece) {
    this.clear(piece)
    piece.oldContent = this.map[row][col]
    this.map[row][col] = piece
    piece.setPos(row, col)
  }
}
