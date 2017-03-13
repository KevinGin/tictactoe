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
	this.storage = {
		A: [],
		B: [],
		C: []
	};
};

Board.prototype.insert = function(col, row, val) {
	this.storage[col][row] = val  // (row-1) because user doesn't see 0
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


var a = new Board();

a.insert('A', 2, 'X')
a.insert('A', 1, 'X')
a.insert('B', 0, 'O')
a.insert('A', 0, 'O')
a.insert('C', 0, 'O')


console.log(a.storage)

console.log(a.check('C',0))




// console.log('         1   2   3')
// console.log('')
// console.log('  A        |   |  ')
// console.log('         _ | _ | _')
// console.log('  B        |   |  ')
// console.log('         _ | _ | _')
// console.log('  C        |   |  ')
// console.log('           |   |  ')





// prompt.start();

// prompt.get(['yo', 'hi'], function(err,data){
// 	console.log(data)
// })