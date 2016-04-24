/* global DMAX, BLOCK, jeu, plateau */
/* eslint no-unused-vars: ["off", { "vars": "local" }]*/
/* eslint no-native-reassign: ["off"] */

var carte = {
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
        jeu[i][j].dataset["col"] = j
        ligne.appendChild(jeu[i][j])
      }
      plateau.appendChild(ligne)
    }
  },

  draw: function (terrain) {
    for (var i = 0; i < DMAX; i++) {
      for (var j = 0; j < DMAX; j++) {
        jeu[i][j].className = "plateau"
        if (terrain.map[i][j] != null) {
          jeu[i][j].innerHTML = terrain.map[i][j].icon()
          if (terrain.map[i][j].name == "block") {
            jeu[i][j].style.backgroundColor = "grey"
          }
        } else {
          jeu[i][j].innerHTML = ""
        }
      }
    }
  },

  select: function (player) {
    var row = player.getRow()
    var col = player.getCol()
    for (var i = -3; i <= 3; i++) {
      var row1 = row + i
      if (row1 >= 0 && row1 < DMAX) {
        var elt = jeu[row1][col]
        elt.className = "select"
      }
      var col1 = col + i
      if (col1 >= 0 && col1 < DMAX) {
        elt = jeu[row][col1]
        elt.className = "select"
      }
    }
  },

  isSelected: function (row, col) {
    return jeu[row][col].className == "select"
  }
}
