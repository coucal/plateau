/* global gui, plateau, table */
/*jslint browser:true */

const DMAX = 10;

gui.init();

var player1=new Player(1);
var player2=new Player(2);
if (player1.getRow()==player2.getRow() && player1.getCol()==player2.getCol()) {
  player2.moveTo((player1.getRow()+3 )% DMAX, player2.getCol());
}
console.log(player1.getRow(),player1.getCol())
gui.drawPlayer(player1.getRow(),player1.getCol(),"A");
gui.drawPlayer(player2.getRow(),player2.getCol(),"B");

gui.select(player1.getRow(),player1.getCol(),true);

plateau.addEventListener("click",playturn,false);

function playturn(event) {
  var where=event.target.dataset;
  console.log(player1);

  console.log(where);
  var oldrow=player1.getRow();
  var oldcol=player1.getCol();
  play(parseInt(where.row),parseInt(where.column),1);
  gui.select(oldrow,oldcol,false);
  console.log(player1);
  gui.select(player1.getRow(),player1.getCol(),true);
}

 function play (row,col, player) {
        console.log(row,col,table[row][col],table[row][col].className);
        if(table[row][col].className=='select') {
        table[player1.row][player1.col].innerHTML="";
        player1.row=row;
        player1.col=col;
        table[player1.row][player1.col].innerHTML="A";
      }
  }
