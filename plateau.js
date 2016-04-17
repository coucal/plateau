
DMAX=10;


var table = document.createElement('table');
document.querySelector('#jeu').innerHTML="<table id=\"plateau\"></table>";
var plateau=document.querySelector('#plateau')
var map=[];
for(var i=0; i<DMAX;i++) {
  var ligne=document.createElement('tr');
  map[i]=[];
  for(var j=0;j<DMAX;j++) {
    map[i][j]=document.createElement('td');
    map[i][j].dataset['row'] = i;
    map[i][j].dataset['column'] = j;
    ligne.appendChild(map[i][j]);
  }
  plateau.appendChild(ligne);
}

plateau.addEventListener("click",playturn,false)

player1={"row":2, "col":2};
map[player1.row][player1.col].innerHTML="A";

player2={"row":8, "col":8};
map[player2.row][player2.col].innerHTML="B";

select(player1.row,player1.col,true);

function select(row, col,click) {
  for(var i=-3; i<=3;i++) {
      var row1=row+i;
      if(row1>=0 && row1<DMAX ) {
          var elt = map[row1][col];
          elt.className = click ? 'select' : 'plateau';
      }
      var col1=col+i;
      if(col1>=0 && col1<DMAX ) {
          var elt = map[row][col1];
          elt.className = click ? 'select' : 'plateau';
      }

  }
}

function play(row,col, player) {
      console.log(row,col,map[row][col],map[row][col].className);
      if(map[row][col].className=='select') {
      map[player1.row][player1.col].innerHTML="";
      player1.row=row;
      player1.col=col;
      map[player1.row][player1.col].innerHTML="A";
    }
}

function playturn(event) {
  var where=event.target.dataset;
  console.log(player1);

  console.log(where);
  var oldrow=player1.row;
  var oldcol=player1.col;
  play(parseInt(where.row),parseInt(where.column),1);
  select(oldrow,oldcol,false);
  console.log(player1);
  select(player1.row,player1.col,true);
}
