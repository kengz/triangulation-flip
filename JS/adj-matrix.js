
// Dependencies
var _ = require('underscore');

var input = require('./input.json');
var N = input["N"];
var g1 = input['graph1'];
var g2 = input['graph2'];

// function to initialize a matrix of size N to 0
var initM = function() {
	return _.range(N).map(function() { 
		return _.range(N).map(function() { return 0; });
	});
}

// Convert a graph g into adj-matrix, return it
var GtoM = function(g) {
	// init a N-size matrix to 0
	var mat = initM();
	// mark each entry specified in the input to 1
	_.each(_.keys(g), function(row) {
		_.each(g[row], function(col) {
			// mark for transpose symmetry
			mat[row][col] = 1;
			mat[col][row] = 1;
		});
	});
	return mat;
}

var m1 = GtoM(g1);

console.log(m1);
// console.log(m2);