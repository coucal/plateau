/* global gui, plateau, table, DMAX */
/*jslint browser:true */
/*jslint white:true */


var gui = {
  init: function () {
  document.querySelector('#jeu').innerHTML="<table id=\"plateau\"></table>";
  plateau=document.querySelector('#plateau');

  table=[];
  for(var i=0; i<DMAX;i++) {
    var ligne=document.createElement('tr');
    table[i]=[];
    for(var j=0; j<DMAX; j++) {
      table[i][j]=document.createElement('td');
      table[i][j].dataset['row'] = i;
      table[i][j].dataset['column'] = j;
      ligne.appendChild(table[i][j]);
    }
    plateau.appendChild(ligne);
  }
},


  drawPlayer: function(aRow,aCol,aPlayer) {
    console.log(aRow,aCol,aPlayer);
    table[aRow][aCol].innerHTML=aPlayer;
  },

  select: function(row, col,click) {
    for(var i=-3; i<=3;i++) {
        var row1=row+i;
        if(row1>=0 && row1<DMAX ) {
            var elt = table[row1][col];
            elt.className = click ? 'select' : 'plateau';
        }
        var col1=col+i;
        if(col1>=0 && col1<DMAX ) {
            var elt = table[row][col1];
            elt.className = click ? 'select' : 'plateau';
        }
      }
  }
}
