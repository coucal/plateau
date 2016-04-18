/* global DMAX */
/*jslint browser:true */
/*jslint white:true */

function plateau() {
  this.map = [];
  for(var i = 0; i < DMAX;i++) {
    this.map[i] = [];
    for(var j = 0;j<DMAX;j++) {
      this.map[i][j] = 0
    }
  }
}

this.setPlayer(var player) {
  this.map[player.row][player.col]=player.id
}

}
