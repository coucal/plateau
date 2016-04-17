function Carte(myDiv) {
  document.querySelector(myDiv).innerHTML="<table id=\"plateau\"></table>";
  this.plateau=document.querySelector('#plateau')

  this.tableau=[];
  for(var i=0; i<DMAX;i++) {
    var ligne=document.createElement('tr');
    this.tableau[i]=[];
    for(var j=0;j<DMAX;j++) {
      this.tableau[i][j]=document.createElement('td');
      this.tableau[i][j].dataset['row'] = i;
      this.tableau[i][j].dataset['column'] = j;
      ligne.appendChild(this.tableau[i][j]);
    }
    this.plateau.appendChild(ligne);
  }


 this.play=function (row,col, player) {
        console.log(row,col,this.tableau[row][col],this.tableau[row][col].className);
        if(this.tableau[row][col].className=='select') {
        this.tableau[player1.row][player1.col].innerHTML="";
        player1.row=row;
        player1.col=col;
        this.tableau[player1.row][player1.col].innerHTML="A";
      }
  }

  this.select=function(row, col,click) {
    for(var i=-3; i<=3;i++) {
        var row1=row+i;
        if(row1>=0 && row1<DMAX ) {
            var elt = this.tableau[row1][col];
            elt.className = click ? 'select' : 'plateau';
        }
        var col1=col+i;
        if(col1>=0 && col1<DMAX ) {
            var elt = this.tableau[row][col1];
            elt.className = click ? 'select' : 'plateau';
        }
      }
  }



}
