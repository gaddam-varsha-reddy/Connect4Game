"use strict";
var player1=0,player2=1,activeplayer=0,gameover=false,
board,rows=6,columns=7,board,coOrd,x,y,newRow,newPosition,
player1Score,player2Score,score,player1Table,player2Table,
reStart,playAgain,modal,modalbody,modaltitle,count,turn1,turn2;

player1Score=document.querySelector("#player1-score");
player2Score=document.querySelector("#player2-score");
player1Table=document.querySelector("#player1Table");
player2Table=document.querySelector("#player2Table");
playAgain=document.querySelector(".playAgain");
reStart=document.querySelector(".reStart");
modal=document.getElementById("Modal");
modalbody=document.querySelector(".modal-body");
modaltitle=document.querySelector(".modal-title");
turn1=document.querySelector("#turn1");
turn2=document.querySelector("#turn2");
board=[];
setGame();

playAgain.addEventListener('click',function(){
    newGame();
});
reStart.addEventListener('click',function(){
    newGame();
    player1Score.textContent=0;
    player2Score.textContent=0;
});

function newGame(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            board[i][j]=" ";
            document.getElementById(`${i}-${j}`).classList.remove("player1Color");
            document.getElementById(`${i}-${j}`).classList.remove("player2Color");
            document.getElementById(`${i}-${j}`).classList.remove("strike");
        }
    }
    activeplayer=0;
    player2Table.classList.remove("activeTable");
    player1Table.classList.add("activeTable");
    addTurnText(1);
    gameover=false;  
}
function setGame(){
    board=[];
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            row.push(' ');
            let tile=document.createElement("div");
            tile.id=r.toString()+ '-'+ c.toString();
            tile.classList.add("tile");
            tile.addEventListener('click',function(e){
                startPlay(e);
            });
            document.getElementById("board").appendChild(tile);
        }
        board.push(row);
    }
}
function validLocation(col){
    return board[0][col]==" ";
}
function GetVaccantRow(col){
    for(let i=5;i>=0;i--){
        if(board[i][col]===" ")
            return i;
    }
}
function winningCheck(player){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns-3;j++){
            if(CheckingConditions(i,j,i,j+1,i,j+2,i,j+3,player))
                return true;
        }
    }
    for(let i=0;i<rows-3;i++){
        for(let j=0;j<columns;j++){
            if(CheckingConditions(i,j,i+1,j,i+2,j,i+3,j,player))
                return true;
        }
    }
    for(let i=3;i<rows;i++){
        for(let j=0;j<columns-3;j++){
            if(CheckingConditions(i,j,i-1,j+1,i-2,j+2,i-3,j+3,player))
                return true;
        }
    }
    for(let i=0;i<rows-3;i++){
        for(let j=0;j<columns-3;j++){
            if(CheckingConditions(i,j,i+1,j+1,i+2,j+2,i+3,j+3,player))
                return true;
        }
    }
}
function CheckingConditions(a1,b1,a2,b2,a3,b3,a4,b4,player){
    if(board[a1][b1]==player && board[a2][b2]==player
        && board[a3][b3]==player && board[a4][b4]==player){
            AddingClassStrike(a1,b1);
            AddingClassStrike(a2,b2);
            AddingClassStrike(a3,b3);
            AddingClassStrike(a4,b4);
            gameover=true;
            return true;
        }
}
function AddingClassStrike(a,b){
    document.getElementById(`${a}-${b}`).classList.add("strike");
}
function startPlay(e){
    if(!gameover){
        coOrd=e.target.id.split("-");
        x=parseInt(coOrd[0]);
        y=parseInt(coOrd[1]);
        if(validLocation(y)){
            newRow=GetVaccantRow(y);
            newPosition=document.getElementById(`${newRow}-${y}`);
            newPosition.classList.add(`player${activeplayer+1}Color`);
            if(activeplayer==0){
                board[newRow][y]="player-0";
                player1Table.classList.remove("activeTable");
                player2Table.classList.add("activeTable");
                addTurnText(2);
                activeplayer=1;
            }
            else{
                board[newRow][y]="player-1";
                player2Table.classList.remove("activeTable");
                player1Table.classList.add("activeTable");
                addTurnText(1);
                activeplayer=0;
            }
        }
        count=0;
        for(let i=0;i<rows;i++){
            for(let j=0;j<columns;j++){
                if(board[`${i}`][`${j}`]!=" "){
                    count+=1;
                }
            }
        }
        if(count>6){ 
            if(winningCheck("player-0"))
                addModalContent(1);
            else if(winningCheck("player-1"))
                addModalContent(2);
            else if(count==42)
                addModalContent(3);
        }
    }   
}

function addTurnText(turn){
    turn==1 ? (turn1.textContent="Your Turn",turn2.textContent=" ") : (turn2.textContent="Your Turn",turn1.textContent=" ");
}

function addModalContent(playerno){
   if (playerno==1 || playerno==2){
        modalbody.textContent=`Player ${playerno} Won`;
        modaltitle.textContent="Hurray!!";
        let playerscore=document.getElementById(`player${playerno}-score`);
        playerscore.textContent=parseInt(playerscore.textContent)+1;
   }
   else{
        modalbody.textContent="It's a Draw";
        modaltitle.textContent="Oops!!";
   }
   player1Table.classList.remove("activeTable");
   player2Table.classList.remove("activeTable");
   turn1.textContent=" ";
   turn2.textContent=" ";
   setTimeout(openModal, 1000);
}

function openModal() {
    backdrop.style.display = "block";
    modal.style.display = "block";
}
function closeModal() {
    newGame();
    backdrop.style.display = "none";
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
      closeModal()
    }
  }

