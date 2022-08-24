
var currPlayer ='X';
var gameOver =false;
let gameBoard = new Board(3);
let bestScore=9;

function nextTurn(){
    if(currPlayer =='X'){
        document.getElementById("consol").innerHTML = "Player 'X' turn!"
    }
    else{
        if(currPlayer == 'O'){
            document.getElementById("consol").innerHTML = "Player 'O' turn!"
        }
    }

}  
function updateCounter(){
    document.getElementById("counter").innerHTML = "Moves played: " + gameBoard.movesMade.length;
} 
function isAvailable(row,col){
    if (gameBoard.matrix[row][col] ==" "){return true}
    else {return false}
}
function draw(row,col,cell){
    if(isAvailable(row,col) && !gameOver){
        if (currPlayer == 'X'){
            gameBoard.matrix[row][col] ='X';
            gameBoard.movesMade.push({x:row,y:col,ref:cell,playedBy:"X"});
            cell.innerHTML = 'X';
            currPlayer='O';
        }   
        else{
                if (currPlayer == 'O'){
                    gameBoard.matrix[row][col] ='O';
                    gameBoard.movesMade.push({x:row,y:col,ref:cell,playedBy:"O"});
                    cell.innerHTML = "O";
                    currPlayer='X';
                }
        }
        
        nextTurn();
        checkForWinner();  
        updateCounter();
    }   
}
function colorSequence(shape,index){

    switch(shape) {
        case "row":
                for(let j = 0;j < gameBoard.size;j++){
                  document.getElementById(index+","+j).setAttribute('class',"isWinner")
                }
          break;
        case "col":
                for(let i = 0;i < gameBoard.size;i++){
                    document.getElementById(i+","+index).setAttribute('class',"isWinner")
                }
          break;
        case "diagnol":
            if(index == 0){//decreasing diagnol
                for(let i = 0;i < gameBoard.size;i++){
                    document.getElementById(i+","+i).setAttribute('class',"isWinner")
                }  
            }
            if(index == gameBoard.size - 1){//increasing diagnol
                for(let i = gameBoard.size -1; i >= 0; i--){    
                    let j = (gameBoard.size-1) - i; //calc col index
                    document.getElementById(i+","+j).setAttribute('class',"isWinner")
                }
            }

      }
}
function checkForWinner(){
   // checkRows
    gameBoard.checkRowSeq();
    if(gameBoard.rowSeq.seq ==true){
        document.getElementById("consol").innerHTML = "winner is " + gameBoard.matrix[gameBoard.rowSeq.rowNum][0];
        colorSequence("row",gameBoard.rowSeq.rowNum);
        gameOver =true;
        if(gameBoard.movesMade.length < bestScore){
            bestScore = gameBoard.movesMade.length;
        }
        return;
    }
    //checkCols
    gameBoard.checkColSeq();
    if(gameBoard.colSeq.seq ==true){
        document.getElementById("consol").innerHTML = "winner is "+ gameBoard.matrix[0][gameBoard.colSeq.colNum];
        colorSequence("col",gameBoard.colSeq.colNum);
        gameOver =true;
        if(gameBoard.movesMade.length < bestScore){
            bestScore = gameBoard.movesMade.length;
        }
        return;
    }
    //check top(decreaing) diagnol
    gameBoard.checkDecreasingDiagnolSeq();
     if(gameBoard.diagnolSeq.seq ==true){
         document.getElementById("consol").innerHTML = "winner is "+ gameBoard.matrix[0][0];
         colorSequence("diagnol",0);
         gameOver =true;
         if(gameBoard.movesMade.length < bestScore){
            bestScore = gameBoard.movesMade.length;
        }
         return;
     }
    //check bottom(increasing) diagnol
    gameBoard.checkIncreasingDiagnolSeq();
     if(gameBoard.diagnolSeq.seq ==true){
         document.getElementById("consol").innerHTML = "winner is "+ gameBoard.matrix[gameBoard.size-1][0];
         colorSequence("diagnol",gameBoard.size-1);
         gameOver =true;
         if(gameBoard.movesMade.length < bestScore){
            bestScore = gameBoard.movesMade.length;
        }
         return;
     }
}
function newG(size){
    gameOver = false;
    currPlayer ='X';
    gameBoard.newGame(size);
    updateCounter();
    document.getElementById("consol").innerHTML = "Player 'X' starts!"
    let table = document.createElement("table");
    table.id = "board";
    table.className="brd";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        row.id ="rows";
        for (let j = 0; j < size; j++) {
           
           let cell = document.createElement("td"); 
           cell.id = i+","+j;
           
           cell.addEventListener("click", () => {draw(i,j,cell)});
           row.appendChild(cell);  
        } 
        table.appendChild(row);  
    }
    let container = document.getElementById("container");
    container.removeChild(container.childNodes[0]);
    document.getElementById("container").appendChild(table);
 
}
function changeM(){
    let boardSize = prompt("enter board size NxN");
    if(boardSize <= 3){
        prompt("board too small creating default");
        boardSize =3;
    }
    gameBoard.changeMode(boardSize);
    newG(boardSize);
}
function deleteL(){
    let wasDeleted = " ";
    if(gameOver == true){
        gameBoard.rowSeq.seq =false;
        gameBoard.colSeq.seq = false;
        gameBoard.diagnolSeq.seq =false;
        gameOver = false;
        let tableCells = document.querySelectorAll('td');
        tableCells.forEach( el =>{el.classList.remove('isWinner')});
    }
    if(gameBoard.movesMade.length > 0){
        cellToDelete = gameBoard.movesMade.pop();
        gameBoard.matrix[cellToDelete.x][cellToDelete.y] = " "; 
        document.getElementById(cellToDelete.x+","+cellToDelete.y).innerHTML = " ";
        updateCounter(); 
    }
    if(cellToDelete.playedBy == 'X'){currPlayer = 'X';nextTurn();}
    if(cellToDelete.playedBy == 'O'){currPlayer = 'O';nextTurn();}
       
}
function showR(){
    if(bestScore == 9){
        window.alert("no best Score ,try a new game.."); 
    }
    else{
    window.alert("Best score =" + bestScore);
    }
}
function save(){
    let jsonBoard = gameBoard.save();
    let gameToSave = {'board':jsonBoard,'gameOver':gameOver,'currentPlayer':currPlayer}
    let gameToSaveStr= JSON.stringify(gameToSave);
    localStorage.clear();
    localStorage.setItem('savedGame',gameToSaveStr);
   
}
function load(){    
    let GameFromStorage= localStorage.getItem('savedGame');
    let objGame = JSON.parse(GameFromStorage);
    newG(objGame.board.size);
    currPlayer= objGame.currentPlayer;
    gameOver = objGame.gameOver;
    gameBoard.load(objGame.board);

    gameBoard.movesMade.forEach(element => {
        var cellId = element.x+","+element.y;
    document.getElementById(cellId).innerHTML = element.playedBy;
    });
    nextTurn();
    checkForWinner();  
    updateCounter();  
}
