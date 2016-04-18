/* global DMAX, BLOCK, jeu, plateau */
/* exported gui */
/* eslint no-unused-vars: ["off", { "vars": "local" }]*/
/* eslint no-native-reassign: ["off"] */

var gui = {
  init: function (terrain) {
    document.querySelector("#jeu").innerHTML = "<table id=\"plateau\"></table>"
    plateau = document.querySelector("#plateau")
    jeu = []
    for (var i = 0; i < DMAX; i++) {
      var ligne = document.createElement("tr")
      jeu[i] = []
      for (var j = 0; j < DMAX; j++) {
        jeu[i][j] = document.createElement("td")
        jeu[i][j].dataset["row"] = i
        jeu[i][j].dataset["column"] = j
        if (terrain.map[i][j] == BLOCK) {
          this.drawBlock(i, j)
        }
        ligne.appendChild(jeu[i][j])
      }
      plateau.appendChild(ligne)
    }
  },

  drawPlayer: function (aRow, aCol, aPlayer) {
    jeu[aRow][aCol].innerHTML = aPlayer
  },

  drawBlock: function (aRow, aCol) {
    jeu[aRow][aCol].innerHTML = "X"
  },

  select: function (row, col, click) {
    for (var i = -3; i <= 3; i++) {
      var row1 = row + i
      if (row1 >= 0 && row1 < DMAX) {
        var elt = jeu[row1][col]
        elt.className = click ? "select" : "plateau"
      }
      var col1 = col + i
      if (col1 >= 0 && col1 < DMAX) {
        elt = jeu[row][col1]
        elt.className = click ? "select" : "plateau"
      }
    }
  }
}
