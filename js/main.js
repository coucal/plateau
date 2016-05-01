/*eslint no-unused-vars: ["off"] */
/*eslint space-infix-ops: ["off"] */
/* global Territoire, Player, Block, Weapon, carte, plateau, curPlayer, loopStep */
/* eslint no-native-reassign: ["off"] */
// TODO remettre ce qui concerne la carte dans carte.js
const DMAX = 10
const BLOCK = 9
const NB_BLOC = 5
const weapons = [
  { name: "axe", power: 10 },
  { name: "boneknife", power: 20 },
  { name: "scythe", power: 30 },
  { name: "forestbow", power: 50 }
]

var aTerr = new Territoire()
carte.init(aTerr)

for (var i = 0; i < NB_BLOC; i++) {
  aTerr.place(new Block())
}

var player1 = new Player("Sonic")
aTerr.place(player1)
var player2 = new Player("Mario")
aTerr.place(player2)
while (conflict()) {
  aTerr.clear(player2)
  aTerr.place(player2)
}

for (var w in weapons) {
  var weapon = new Weapon(weapons[w].name, weapons[w].power)
  aTerr.place(weapon)
}

carte.draw(aTerr)

carte.select(player1)

curPlayer = player1

plateau.addEventListener("click", playturn, false)

function playturn (event) {
  if (event.target.tagName == "TD") {
    var where = event.target.dataset
  } else {
    where = event.target.parentNode.dataset
  }

  var oldrow = curPlayer.getRow()
  var oldcol = curPlayer.getCol()
  if (aTerr.is_free(parseInt(where.row), parseInt(where.col)) && carte.isSelected(parseInt(where.row), parseInt(where.col))) {
    play(parseInt(where.row), parseInt(where.col), curPlayer)
    carte.draw(aTerr)
    if (curPlayer == player1) {
      curPlayer = player2
    } else {
      curPlayer = player1
    }
    if (!aTerr.combat) {
      carte.select(curPlayer)
    }
  }
}

function play (row, col, player) {
  aTerr.moveTo(row, col, player)
  if (player.oldContent != null) {
    // swap des armes
    var weapon = player.getWeapon()
    player.weapon = player.oldContent
    player.oldContent = weapon
    carte.showWeapon(player)
  }
  if (conflict()) {
    console.log("Conflit !")
    startCombat(player)
  }
}

function startCombat (player) {
  // efface la selection
  carte.draw(aTerr)
  aTerr.combat = true
  console.log(player.name + " startCombat ")
  if (player==player1) {
    loopStep = 1
  } else {
    loopStep = 4
  }
  fightLoop()
}

function combat (firstPlayer, secondPlayer) {
  firstPlayer.attack(secondPlayer)
  carte.showStrength(secondPlayer)
  if (secondPlayer.strength <=0) {
    carte.showInfo(firstPlayer.name + "Vainqueur !")
  } else {
    secondPlayer.attack(firstPlayer)
    carte.showStrength(firstPlayer)
    if (firstPlayer.strength <= 0) {
      carte.showInfo(secondPlayer.name + "Vainqueur !")
    } else {
      aTerr.combat = false
      carte.select(curPlayer)
    }
  }
}

function fightLoop () {
  console.log("fightLoop " + loopStep)
  switch (loopStep++) {
    case 1:
      carte.showDialog(player1)
      break
    case 2:
      player1.modeCombat=carte.getResult()
      carte.showDialog(player2)
      break
    case 3:
      player2.modeCombat=carte.getResult()
      combat(player1, player2)
      break
    case 4:
      carte.showDialog(player2)
      break
    case 5:
      player2.modeCombat=carte.getResult()
      carte.showDialog(player1)
      break
    case 6:
      player1.modeCombat=carte.getResult()
      combat(player1, player2)
      break
  }
}

function conflict () {
  if (player1.getRow() == player2.getRow() && (player1.getCol() == player2.getCol()-1 || player1.getCol() == player2.getCol() +1)) {
    return true
  }
  if (player1.getCol() == player2.getCol() && (player1.getRow() == player2.getRow()-1 || player1.getRow() == player2.getRow() +1)) {
    return true
  }
  return false
}
