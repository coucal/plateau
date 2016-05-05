/* global DMAX, BLOCK, jeu, plateau, fightLoop */
/* eslint no-unused-vars: ["off", { "vars": "local" }]*/
/* eslint no-native-reassign: ["off"] */

/* la représentation dans la page du tableau de jeu est faite sous forme d'un nameSPace */

var carte = {
  // Initialisation du tableau de jeu
  init: function (terrain) {
    // l'espace de jeu est rempli par un tableau défini par programme
    document.querySelector("#jeu").innerHTML = "<table id=\"plateau\"></table>"
    plateau = document.querySelector("#plateau")
    jeu = []
    for (var i = 0; i < DMAX; i++) {
      var ligne = document.createElement("tr")
      jeu[i] = []
      for (var j = 0; j < DMAX; j++) {
        jeu[i][j] = document.createElement("td")
        // le dataset permet de savoir dans quel case l'utilisateur clique
        jeu[i][j].dataset["row"] = i
        jeu[i][j].dataset["col"] = j
        ligne.appendChild(jeu[i][j])
      }
      plateau.appendChild(ligne)
    }
  },
  // dessine le tableau dans la page avec les attributs par défaut
  draw: function (terrain) {
    for (var i = 0; i < DMAX; i++) {
      for (var j = 0; j < DMAX; j++) {
        jeu[i][j].className = "plateau"
        jeu[i][j].style.backgroundColor = "white"
        if (terrain.map[i][j] != null) {
          jeu[i][j].innerHTML = terrain.map[i][j].icon()
          if (terrain.map[i][j].name == "block") {
            // Les blocs ont un fond gris
            jeu[i][j].style.backgroundColor = "grey"
          }
        } else {
          jeu[i][j].innerHTML = ""
        }
      }
    }
  },

  // encadre les cases ou le joueur peut se déplacer
  select: function (player) {
    var row = player.row
    var col = player.col
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
    // marque le joueur actif
    jeu[row][col].style.backgroundColor = "gold"
  },

  // vrai s
  isSelected: function (row, col) {
    return jeu[row][col].className == "select"
  },

  // affiche l'arme détenue par le joueur
  showWeapon: function (player) {
    var scorediv = document.querySelector("#" + player.name)
    scorediv.getElementsByClassName("weapon")[0].innerHTML = player.weapon.icon()
  },

  // Affiche la force du joueur
  showStrength: function (player) {
    var scorediv = document.querySelector("#" + player.name)
    scorediv.getElementsByClassName("strength")[0].innerHTML = player.strength
  },

  // affche le dialogue de combat
  showDialog: function (player) {
    carte.hideInfo()
    var Dlg = document.getElementById("fightDialog")
    document.getElementById("icon").innerHTML = player.icon()
    Dlg.style.visibility = "visible"
  },

  // cache le dialogue de combat et relance la boucle de combat du main
  hideDialog: function (result) {
    var Dlg = document.getElementById("fightDialog")
    Dlg.style.visibility = "hidden"
    Dlg.dataset["result"] = result
    fightLoop()
  },

  // retoune le résultat du dernler combat (Attaquer ou Defendre)
  getResult: function () {
    var Dlg = document.getElementById("fightDialog")
    return Dlg.dataset["result"]
  },

  // affche la fenêtre d'info
  showInfo: function (info) {
    var Dlg = document.getElementById("infoWindow")
    document.getElementById("infoText").innerHTML = info
    Dlg.style.visibility = "visible"
  },

  // cache la fenêtre d'info
  hideInfo: function () {
    var Dlg = document.getElementById("infoWindow")
    Dlg.style.visibility = "hidden"
  }
}
