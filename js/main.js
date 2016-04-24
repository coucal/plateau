/*eslint no-unused-vars: ["off"] */
/*eslint space-infix-ops: ["off"] */
/* global Territoire, Player, Block, Weapon, carte, plateau, curPlayer */
/* eslint no-native-reassign: ["off"] */

const DMAX = 10
const BLOCK = 9
const NB_BLOC = 5
const weapons = [
  { name: "axe", power: 10 },
  { name: "boneknife", power: 10 },
  { name: "scythe", power: 10 },
  { name: "forestbow", power: 10 }
]

var aTerr = new Territoire()
carte.init(aTerr)

for (var i = 0; i < NB_BLOC; i++) {
  aTerr.place(new Block())
}

var player1 = new Player("sonic")
aTerr.place(player1)
var player2 = new Player("mario")
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
    carte.select(curPlayer)
  }
}

function play (row, col, player) {
  aTerr.moveTo(row, col, player)
  if (player.oldContent != null) {
    // swap des armes
    var weapon = player.getWeapon()
    player.weapon = player.oldContent
    player.oldContent = weapon
  }
  if (conflict()) {
    console.log("Conflit !")
    document.querySelector("#status").innerHTML = "conflit !"
  } else {
    document.querySelector("#status").innerHTML = ""
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
function DlgShow (Message) {
  // Change the message.
  // var Msg = document.getElementById("DlgContent")
  // Msg.innerHTML = Message
  // Display the dialog box.
  var Dlg = document.getElementById("Overlay")
  Dlg.style.visibility = "visible"
}

function DlgHide (Result) {
  // Display the result onscreen.
  var Output = document.getElementById("status")
  Output.innerHTML = "You clicked: " + Result

  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay")
  Dlg.style.visibility = "hidden"
}
