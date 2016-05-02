/* global DMAX, BLOCK, jeu, plateau, fightLoop */
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
        jeu[i][j].style.backgroundColor = "white"
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
    jeu[row][col].style.backgroundColor = "gold"
  },

  isSelected: function (row, col) {
    return jeu[row][col].className == "select"
  },

  showWeapon: function (player) {
    var scorediv = document.querySelector("#" + player.name)
    scorediv.getElementsByClassName("weapon")[0].innerHTML = player.weapon.icon()
  },

  showStrength: function (player) {
    var scorediv = document.querySelector("#" + player.name)
    scorediv.getElementsByClassName("strength")[0].innerHTML = player.strength
  },

  showDialog: function (player) {
    carte.hideInfo()
    var Dlg = document.getElementById("fightDialog")
    document.getElementById("icon").innerHTML = player.icon()
    Dlg.dataset["player"] = player.name
    Dlg.style.visibility = "visible"
  },

  hideDialog: function (result) {
    // Hide the dialog box.
    var Dlg = document.getElementById("fightDialog")
    Dlg.style.visibility = "hidden"
    Dlg.dataset["player"] = ""
    Dlg.dataset["result"] = result
    console.log("Dialogue cahé !")
    fightLoop()
  },

  getResult: function () {
    var Dlg = document.getElementById("fightDialog")
    return Dlg.dataset["result"]
  },

  showInfo: function (info) {
    var Dlg = document.getElementById("infoWindow")
    document.getElementById("infoText").innerHTML = info
    Dlg.style.visibility = "visible"
  },

  hideInfo: function () {
    var Dlg = document.getElementById("infoWindow")
    Dlg.style.visibility = "hidden"
  }
}
