
DMAX=10;

var maCarte= new Carte('#jeu');

player1={"row":2, "col":2};
maCarte.tableau[player1.row][player1.col].innerHTML="A";

player2={"row":8, "col":8};
maCarte.tableau[player2.row][player2.col].innerHTML="B";

maCarte.select(player1.row,player1.col,true);

maCarte.plateau.addEventListener("click",playturn,false)

function playturn(event) {
  var where=event.target.dataset;
  console.log(player1);

  console.log(where);
  var oldrow=player1.row;
  var oldcol=player1.col;
  maCarte.play(parseInt(where.row),parseInt(where.column),1);
  maCarte.select(oldrow,oldcol,false);
  console.log(player1);
  maCarte.select(player1.row,player1.col,true);
}
