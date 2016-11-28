
function Hanoi(src){
    this.algorithmMoveTracker = 0;
    this.src = src;
    this.aux = [];
    this.dest = [];
    this.numberOfMoves = Math.pow(2, this.src.length) - 1;
    this.moveMap = {
        odd: {
            0: ['src', 'dest'],
            1: ['src', 'aux'],
            2: ['aux', 'dest']
        },
        even: {
            0: ['src', 'aux'],
            1: ['src', 'dest'],
            2: ['aux', 'dest']
        }
    }
}

Hanoi.prototype.isOdd = function () {
    if ( this.src.length % 2 === 0) return 'even';
    return 'odd';
}

Hanoi.prototype.isLegalMove = function(from, to) {
    var pieceIndex = this[from].length - 1;
    var getPieceToMove = this.getPieceToMove(this[from], pieceIndex);
    var getFoundationPiece = this.getFoundationPiece(this[to]) || Infinity;
    if( getPieceToMove < getFoundationPiece) return true;

}

Hanoi.prototype.getPieceToMove = function (from, index) {
    return from[index];
}

Hanoi.prototype.getFoundationPiece = function(to){
    return to[to.length - 1];
}
Hanoi.prototype.logMovement = function(from, to, disk) {
    console.log('Move number ' + this.algorithmMoveTracker + '.Moved '+ disk +' from ' + from + ' to ' + to)
}

Hanoi.prototype.bidirectionalMove = function(from, to, moveTrace) {
    var succesfulMove = false;
    this.algorithmMoveTracker++;

    //Forward move
    if(this.isLegalMove(from, to)){

        succesfulMove = true;
        var tempDisk = this[from].pop()
        this[to].push(tempDisk);
        if(moveTrace) this.logMovement(from, to, tempDisk);

    }

    //Backward move
    if(!succesfulMove && this.isLegalMove(to, from)) {
        var tempDisk = this[to].pop();
        this[from].push(tempDisk);
        if(moveTrace) this.logMovement(to, from, tempDisk);
    }

}

Hanoi.prototype.solve = function(moveTrace){
    var gameType = this.isOdd()
    for(var i = 0; i< this.numberOfMoves; i++){
        this.bidirectionalMove(this.moveMap[gameType][i%3][0], this.moveMap[gameType][i%3][1], moveTrace)
    }
}


//change length prop in order to generate numbers
var dataSet = Array.from({ length: 20 }, function(v, k) { return k + 1 }).reverse();

var puzzle = new Hanoi(dataSet);
puzzle.solve(true); //Pass in true or false for Log in console moves

console.log('source Pilon',puzzle.src);
console.log('auxilliary Pilon',puzzle.aux);
console.log('destination Pilon',puzzle.dest);
console.log('OptimalNumberOfMoves',puzzle.numberOfMoves);
