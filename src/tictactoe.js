var prompt = require('prompt');

var Board = function() {
	this.turn = 'X'
	this.storage = {
		A: [],
		B: [],
		C: []
	};
};

Board.prototype.insert = function(col, row) {
	console.log('insert called. turn =>', this.turn)

	this.storage[col][row] = this.turn  // (row-1) because user doesn't see 0
	this.turn === 'X' ? this.turn = 'O' : this.turn = 'X'
}

// only check most recent entry, not entire board
Board.prototype.success = function(col,row) {
	return this.rowSuccess(row) || this.columnSuccess(col) || this.diagonalSuccess();
}

Board.prototype.rowSuccess = function(row) {
	var storage = this.storage;
	if (storage.A[row] === storage.B[row] && storage.A[row] === storage.C[row]) {
		console.log('rowSuccess')
		return true;
	}
	return false;
}

Board.prototype.columnSuccess = function(col){
	var column = this.storage[col];
	if (column[0] === column[1] && column[0] === column[2]) {
		console.log('columnSuccess')
		return true;
	}
	return false;
}

Board.prototype.diagonalSuccess = function() {
	var storage = this.storage;
	if (!!storage.A[0] && storage.A[0] === storage.B[1] && storage.A[0] === storage.C[2]) {
		console.log('left diagonal success')
		return true;
	}
	if (!!storage.C[0] && storage.C[0] === storage.B[1] && storage.C[0]=== storage.A[2]) {
		console.log('right diagonal success')
		return true;
	}
	return false;
}


Board.prototype.display = function() {
	var storage = this.storage;
	console.log('         1   2   3')
	console.log('')
	this.displayCol('A');
	console.log('         _ | _ | _')
	this.displayCol('B');
	console.log('         _ | _ | _')
	this.displayCol('C');
	console.log('           |   |  ')
}

Board.prototype.displayCol = function(col) {
	var storage = this.storage;
	displayZero = storage[col][0] || ' '
	displayOne = storage[col][1] || ' '
	displayTwo = storage[col][2] || ' '
	console.log('  '+ col + '      ' + displayZero +   ' | ' + displayOne + ' | ' + displayTwo)
}

function inputIsValid(col,row) {
	return rowIsValid(row) && columnIsValid(col);
}

function rowIsValid(row) {
	var row = parseInt(row);
	return row === 1 || row === 2 || row === 3;
}

function columnIsValid(col) {
	// check type first so string method doesn't throw error
	if (typeof col !== 'string') {
		return false;
	}
	var col = col.toUpperCase();
	return col === 'A' || col === 'B' || col === 'C'
}

function spotTaken(col,row,board) {
	return !!(board.storage[col][row])
}


// has closure over both board and prompt
function setPromptMessage() {
	var messageEnding = board.turn === 'X' ? '1' : '2';
	prompt.message = 'Your move, Player ' + messageEnding;
}


function playGame(board) {
	board.display();
	setPromptMessage();
	prompt.get(['column', 'row'], function(err,data) {
		var col = data.column;
		var row = data.row;
		// handle invalid user input
		if (!inputIsValid(col,row)){
			console.log('You\'re nuts! Please enter a valid input. A-C for columns, 1-3 for rows')
			return playGame(board); 
		}
		var row = data.row-1  // we don't display row 0 to users
		var col = col.toUpperCase();
		// handle spot already taken
		if (spotTaken(col, row, board)) {
			console.log('Spot already taken, please try again.')
			return playGame(board);
		}
		board.insert(col, row);
		// handle player wins
		if (board.success(col,row)) {
			var playerId = board.turn === 'X' ? '2' : '1';
			board.display();
			return console.log('Congratulations! Player ' + playerId + ' wins!');
		}
		// recurse
		playGame(board);
	})
}

var board = new Board();
prompt.start();
setPromptMessage();
playGame(board);






