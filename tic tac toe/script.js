var currPlayer;
var gameOver =false;
/* X =1,O=2;*/



function generatePlayer(){
    var random = Math.floor(Math.random() * (2) ) + 1;
    if (random == 1){
        document.getElementById("consol").innerHTML = "'X' starts!";
        currPlayer=1;
    }else{
        document.getElementById("consol").innerHTML = "'O' starts!";
        currPlayer=2;
    }
   

function nextTurn(){
    if(currPlayer ==1){
        document.getElementById("consol").innerHTML = "Player 'X' turn!"
    }
    else{
        if(currPlayer == 2){
            document.getElementById("consol").innerHTML = "Player 'O' turn!"
        }
    }
}

function drawInCell(n){
    if(gameOver ==false){

        if (currPlayer == 1){
            document.getElementById(n).innerHTML = "X";
            currPlayer=2; 
        }   
        else{
                if (currPlayer == 2){
                    document.getElementById(n).innerHTML = "O";
                    currPlayer=1;
                }
        }
        nextTurn();
        checkForWinner();
        
    }
}

function checkRows(brd){
    for(let i=0;i < brd.length;i +=3){
        if(((brd[i].innerHTML == brd[i+1].innerHTML) && (brd[i+1].innerHTML == brd[i+2].innerHTML)) &&(brd[i].innerHTML != "" )){  
            document.getElementById("consol").innerHTML = brd[i].innerHTML + " Is the Winner!";
            gameOver =true;
            brd[i].style.backgroundColor = "white";
            brd[i+1].style.backgroundColor = "white";
            brd[i+2].style.backgroundColor = "white";

        }
    }
}
function checkCols(brd){
    for(let i=0;i < 3;i++){
        if(((brd[i].innerHTML == brd[i+3].innerHTML) && (brd[i+3].innerHTML == brd[i+6].innerHTML)) &&(brd[i].innerHTML != "" )){
            document.getElementById("consol").innerHTML = brd[i].innerHTML + " Is the Winner!";
            gameOver =true;
            brd[i].style.backgroundColor = "white";
            brd[i+3].style.backgroundColor = "white";
            brd[i+6].style.backgroundColor = "white";
        }
    }  
}
function checkDiagnols(brd){
    if(((brd[0].innerHTML == brd[4].innerHTML) && (brd[4].innerHTML == brd[8].innerHTML)) &&(brd[0].innerHTML != "" )){
        document.getElementById("consol").innerHTML = brd[0].innerHTML + " Is the Winner!";
            gameOver =true;
            brd[0].style.backgroundColor = "white";
            brd[4].style.backgroundColor = "white";
            brd[8].style.backgroundColor = "white";
    }
    if(((brd[2].innerHTML == brd[4].innerHTML) && (brd[4].innerHTML == brd[6].innerHTML)) &&(brd[2].innerHTML != "" )){
        document.getElementById("consol").innerHTML = brd[2].innerHTML + " Is the Winner!";
            gameOver =true;
            brd[2].style.backgroundColor = "white";
            brd[4].style.backgroundColor = "white";
            brd[6].style.backgroundColor = "white";
    }
}

function checkForWinner(){
    var board = document.getElementsByTagName("td");
    checkRows(board);
    checkCols(board); 
    checkDiagnols(board);  
}

