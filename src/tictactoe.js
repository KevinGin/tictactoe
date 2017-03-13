var prompt = require('prompt');

// console.log('hello!')

// console.log('1 | 2 | 3')
// console.log('_ | _ | _')
// console.log('1 | 2 | 3')
// console.log('_ | _ | _')
// console.log('1 | 2 | 3')

// console.log('X | X | X')
// console.log('_ | _ | _')
// console.log('O | O | X')
// console.log('_ | _ | _')
// console.log('X | O | X')


var Board = function() {
	this.turn = 'X'
	this.storage = {
		A: [],
		B: [],
		C: []
	};
};

Board.prototype.insert = function(col, row) {
	this.storage[col][row] = this.turn  // (row-1) because user doesn't see 0
	this.turn === 'X' ? this.turn = 'O' : this.turn = 'X'
}

//only check most recent entry, not entire board
Board.prototype.check = function(col,row) {
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



// board.insert('A', 2, 'X')
// board.insert('A', 1, 'X')
// board.insert('B', 0, 'O')
// board.insert('A', 0, 'O')
// board.insert('C', 0, 'O')





var board = new Board();

prompt.start()



function playGame(board) {
	board.display();
	prompt.get(['column', 'row'], function(err,data) {
		console.log('got info')
		board.insert(data.column, data.row - 1);
		playGame(board);
	})
}


playGame(board);












