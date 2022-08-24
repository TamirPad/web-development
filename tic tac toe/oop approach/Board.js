class Board{

    constructor(size) {
        this.size = size;
        this.rowSeq = {rowNum:0 , seq:false};
        this.colSeq = {colNum:0 , seq:false};
        this.diagnolSeq = {diagnoltype:"decreasing" , seq:false}; 
        this.movesMade= new Array();
        this.matrix = new Array(size);
        for(let i = 0; i < size; i++) {
            this.matrix[i] = new Array(size);
        }
    }
    checkRowSeq(){
        for(let i = 0; i < this.size; i++){
            if(this.rowSeq.seq == true){return}
            for(let j = 0; j < this.size - 1 ; j++){
                if (this.matrix[i][j] == this.matrix[i][j+1] && this.matrix[i][j] != " " ){
                    this.rowSeq.seq = true;
                    this.rowSeq.rowNum = i;
                }
                else{
                    this.rowSeq.seq = false;
                    break;
                }

            }
        }
    }
    checkColSeq(){
        for(let j = 0; j < this.size; j++){
            if(this.colSeq.seq == true){return}
            for(let i = 0; i < this.size - 1 ; i++){
                if (this.matrix[i][j] == this.matrix[i+1][j] && this.matrix[i][j] != " " ){
                    this.colSeq.seq = true;
                    this.colSeq.colNum = j;
                }
                else{
                    this.colSeq.seq = false;
                    break;
                }
            }
        }
    }   
    checkDecreasingDiagnolSeq(){
             //check top(decreaing) diagnol
    for(let i = 0; i < this.size - 1; i++){
        if (this.matrix[i][i] == this.matrix[i+1][i+1] && this.matrix[i][i] != " " ){
            this.diagnolSeq.seq =true;
            this.diagnolSeq.diagnoltype = "decreasing";
        }
        else{
            this.diagnolSeq.seq=false;
            break;
        }
    }
    }
    checkIncreasingDiagnolSeq(){
        for(let i = this.size -1; i > 0; i--){    
            let j = (this.size-1) - i; //calc col index
                if (this.matrix[i][j] == this.matrix[i-1][j+1] && this.matrix[i][j] != " " ){
                    this.diagnolSeq.seq =true;
                    this.diagnolSeq.diagnoltype = "decreasing";
                }
                else{
                    this.diagnolSeq.seq=false;
                    break;
                }
        }

    }
     newGame(size){
        this.size = size;
        this.rowSeq = {rowNum:0 , seq:false};
        this.colSeq = {colNum:0 , seq:false};
        this.diagnolSeq = {diagnoltype:"decreasing" , seq:false}; 
        this.movesMade= new Array();
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                this.matrix[i][j] = " ";
            }
        }
    }
     changeMode(size){
        this.size = size; 
        this.matrix = new Array(size);
        this.movesMade= new Array();
        for(let i = 0; i < size; i++) {
            this.matrix[i] = new Array(size);
        }
    }
     save(){
         let board;
        return board ={'size': this.size, 
                        'rowSeq':this.rowSeq,
                        'colSeq':this.colSeq,
                        'diagnolSeq':this.diagnolSeq,
                        'matrix': this.matrix,
                        'moves' : this.movesMade
                    };  
    }
     load(Board){
        this.size = Board.size;
        this.rowSeq = Board.rowSeq;
        this.colSeq = Board.colSeq;
        this.diagnolSeq = Board.diagnolSeq
        this.movesMade= Board.moves;
        this.matrix = Board.matrix;
    }








}