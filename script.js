/* global interface, plateau, table */

const DMAX=10;

interface.init();

var player1={"row":2, "col":2};

interface.drawPlayer(player1.row,player1.col,"A");
var player2={"row":8, "col":8};
interface.drawPlayer(player2.row,player2.col,"B");

interface.select(player1.row,player1.col,true);

plateau.addEventListener("click",playturn,false);

function playturn(event) {
  var where=event.target.dataset;
  console.log(player1);

  console.log(where);
  var oldrow=player1.row;
  var oldcol=player1.col;
  play(parseInt(where.row),parseInt(where.column),1);
  interface.select(oldrow,oldcol,false);
  console.log(player1);
  interface.select(player1.row,player1.col,true);
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
