/*eslint no-unused-vars: ["off"] */
/*eslint space-infix-ops: ["off"] */
/* global Territoire, Player, Block, Weapon, carte, plateau, curPlayer, loopStep */
/* eslint no-native-reassign: ["off"] */
/* eslint one-var: ["off"] */
/* jeu de plateau MOOC Open Classrooms */

const DMAX = 10 // taille du plateau
const NB_BLOC = 5 // nombre de blocs
const weapons = [
  { name: "axe", power: 10 },
  { name: "boneknife", power: 20 },
  { name: "scythe", power: 30 },
  { name: "forestbow", power: 50 }
]

// initialisation du tableau de jeu
var aTerr = new Territoire()
carte.init(aTerr)

for (var i = 0; i < NB_BLOC; i++) {
  aTerr.place(new Block())
}

// Instanciation des deux joueurs
var player1 = new Player("Sonic")
aTerr.place(player1)
var player2 = new Player("Mario")
aTerr.place(player2)
// La situation de départ ne peut pas êtr een conflit
while (conflict()) {
  aTerr.clear(player2)
  aTerr.place(player2)
}

// Instanciation des armes
for (var w in weapons) {
  var weapon = new Weapon(weapons[w].name, weapons[w].power)
  aTerr.place(weapon)
}

// Dessin initial de la carte
carte.draw(aTerr)
carte.select(player1)
// On pourrait faire un tirage au sort..
curPlayer = player1

// Attente du clic de joueur actif (en jaune sur la carte)
plateau.addEventListener("click", playturn, false)

// Callback du clic
function playturn (event) {
  // Si on clique sur une pièce, il faut remonter à son parent pour avoir la case cible du clic
  // Idéalement il faudrait faire une fonction dans la carte pour respecter l'encapsulation
  // le dataset d'une case contient ses coordonnées
  if (event.target.tagName == "TD") {
    var where = event.target.dataset
  } else {
    where = event.target.parentNode.dataset
  }

  var newRow = parseInt(where.row)
  var newCol = parseInt(where.col)
  if (aTerr.is_free(newRow, newCol) && carte.isSelected(newRow, newCol)) {
    // La case est libre et accessible, on joue le coup
    play(newRow, newCol, curPlayer)
    carte.draw(aTerr)
    if (curPlayer == player1) {
      curPlayer = player2
    } else {
      curPlayer = player1
    }
    if (!aTerr.fight) {
      carte.select(curPlayer)
    }
  }
}

function play (row, col, player) {
  aTerr.moveTo(row, col, player)
  if (player.oldContent != null) {
    // La case d'arrivée contenait une arme, on l'échange avec l'arme courante
    var weapon = player.weapon
    player.weapon = player.oldContent
    player.oldContent = weapon
    // mise à jour de l'arme détenue par le joueur dans la page
    carte.showWeapon(player)
  }
  if (conflict()) {
    startFight(player)
  }
}

function startFight (player) {
  // efface la selection
  carte.draw(aTerr)
  aTerr.fight = true
  // Selon le joueur qui attaque on entre dans la boucle de combat à une étape différente
  if (player==player1) {
    loopStep = 0
  } else {
    loopStep = 3
  }
  fightLoop()
}

// J'ai interprété "combat a mort" par le fait qu'une fois le combat commencé il ne s'arrête qu'à la mort d'un des deux joueurs
function doFight (firstPlayer, secondPlayer) {
  var s1 = 0, s2 = 0
  var info=""
  // Premier joueur attaque
  if (firstPlayer.modeCombat == "A") {
    s1=firstPlayer.attack(secondPlayer)
    carte.showStrength(secondPlayer)
    info= secondPlayer.name + " perd " + s1 + " points<br>"
    if (secondPlayer.strength == 0) {
      carte.showInfo(firstPlayer.name + " Vainqueur !")
      return
    }
  }
  // Second joueur attaque
  if (secondPlayer.modeCombat == "A") {
    s2=secondPlayer.attack(firstPlayer)
    carte.showStrength(firstPlayer)
    info= info+firstPlayer.name + " perd " + s2 + " points"
    if (firstPlayer.strength == 0) {
      carte.showInfo(secondPlayer.name + " Vainqueur !")
    }
  }
  if (info != "") {
    carte.showInfo(info)
  }
  // Le message d'info reste affiché deux secondes avant la prochaine étape du combat
  setTimeout(function () {
    fightLoop()
  }, 2000)
}

function fightLoop () {
  // Chaque fois que l'utilsateur clique dans un deialogue on avance d'une étape dans le combat
  // Cette fonction est appelée par doFight puis à chaque fermeture de dialogue de combat
  switch (loopStep++ % 6) {
    case 0:
      // Attaque joueur 1
      carte.showDialog(player1)
      break
    case 1:
      // On mémorise le résultat et on demande son choix au joeur 2
      player1.modeCombat=carte.getResult()
      carte.showDialog(player2)
      break
    case 2:
      // On mémorise le résultat et on gère le combat
      player2.modeCombat=carte.getResult()
      doFight(player1, player2)
      break
    case 3:
      // Attaque joueur 2 etc.
      carte.showDialog(player2)
      break
    case 4:
      player2.modeCombat=carte.getResult()
      carte.showDialog(player1)
      break
    case 5:
      player1.modeCombat=carte.getResult()
      doFight(player1, player2)
      break
  }
}

// return true si les deux joueurs sont en conflit
function conflict () {
  if (player1.row == player2.row && (player1.col == player2.col-1 || player1.col == player2.col +1)) {
    return true
  }
  if (player1.col == player2.col && (player1.row == player2.row-1 || player1.row == player2.row +1)) {
    return true
  }
  return false
}
