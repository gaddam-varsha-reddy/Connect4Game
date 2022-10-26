"use strict";
var player1=0,player2=1,activeplayer=0,gameover=false,
board,rows=6,columns=7,board,coOrd,x,y,newRow,newPosition,
player1Score,player2Score,score,player1Table,player2Table,
reStart,playAgain,modal,modalbody,modaltitle,count;

player1Score=document.querySelector("#player1-score");
player2Score=document.querySelector("#player2-score");
player1Table=document.querySelector("#player1Table");
player2Table=document.querySelector("#player2Table");
playAgain=document.querySelector(".playAgain");
reStart=document.querySelector(".reStart");
modal=document.getElementById("Modal");
modalbody=document.querySelector(".modal-body");
modaltitle=document.querySelector(".modal-title");
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
            if(board[i][j]==player && board[i][j+1]==player
            && board[i][j+2]==player && board[i][j+3]==player){
                document.getElementById(`${i}-${j}`).classList.add("strike");
                document.getElementById(`${i}-${j+1}`).classList.add("strike");
                document.getElementById(`${i}-${j+2}`).classList.add("strike");
                document.getElementById(`${i}-${j+3}`).classList.add("strike");
                gameover=true;
                return true;
            }
        }
    }
    for(let i=0;i<rows-3;i++){
        for(let j=0;j<columns;j++){
            if(board[i][j]==player && board[i+1][j]==player
                && board[i+2][j]==player && board[i+3][j]==player){
                    document.getElementById(`${i}-${j}`).classList.add("strike");
                    document.getElementById(`${i+1}-${j}`).classList.add("strike");
                    document.getElementById(`${i+2}-${j}`).classList.add("strike");
                    document.getElementById(`${i+3}-${j}`).classList.add("strike");
                    gameover=true;
                    return true;
                }
        }
    }
    for(let i=3;i<rows;i++){
        for(let j=0;j<columns-3;j++){
            if(board[i][j]==player && board[i-1][j+1]==player
                && board[i-2][j+2]==player && board[i-3][j+3]==player){
                    document.getElementById(`${i}-${j}`).classList.add("strike");
                    document.getElementById(`${i-1}-${j+1}`).classList.add("strike");
                    document.getElementById(`${i-2}-${j+2}`).classList.add("strike");
                    document.getElementById(`${i-3}-${j+3}`).classList.add("strike");
                    gameover=true;
                    return true;
                }
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]==player && board[i+1][j+1]==player
                && board[i+2][j+2]==player && board[i+3][j+3]==player){
                    document.getElementById(`${i}-${j}`).classList.add("strike");
                    document.getElementById(`${i+1}-${j+1}`).classList.add("strike");
                    document.getElementById(`${i+2}-${j+2}`).classList.add("strike");
                    document.getElementById(`${i+3}-${j+3}`).classList.add("strike");
                    gameover=true;
                    return true;
                }
        }
    }
}

function startPlay(e){
    if(!gameover){
        coOrd=e.target.id.split("-");
        x=parseInt(coOrd[0]);
        y=parseInt(coOrd[1]);
        if(validLocation(y)){
            newRow=GetVaccantRow(y);
            newPosition=document.getElementById(`${newRow}-${y}`);
            if(activeplayer==0){
                board[newRow][y]="player-0";
                newPosition.classList.add("player1Color");
                player1Table.classList.remove("activeTable");
                player2Table.classList.add("activeTable");
                activeplayer=1;
            }
            else{
                board[newRow][y]="player-1";
                newPosition.classList.add("player2Color");
                player2Table.classList.remove("activeTable");
                player1Table.classList.add("activeTable");
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
            if(winningCheck("player-0")){
                player2Table.classList.remove("activeTable");
                score=parseInt(player1Score.textContent);
                score+=1;
                player1Score.textContent=score;
                modalbody.textContent="Player 1 Won";
                modaltitle.textContent="Hurray!!";
                setTimeout(openModal, 1000);
            }
            else if(winningCheck("player-1")){
                player1Table.classList.remove("activeTable");
                score=parseInt(player2Score.textContent);
                score+=1;
                player2Score.textContent=score;
                modalbody.textContent="Player 2 Won";
                modaltitle.textContent="Hurray!!";
                setTimeout(openModal, 1000);
            }
            else if(count==42){
                modalbody.textContent="It's a Draw";
                modaltitle.textContent="Oops!!";
                setTimeout(openModal, 1000);
            }
        }
    }
    
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

