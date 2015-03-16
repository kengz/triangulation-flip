
// Dependencies
var _ = require('underscore');

var input = require('./input5.json');
var N = input.N;
var g1 = input.graph1;
var g2 = input.graph2;


////////////////////////////
// Cosntruct Adj Matrices //
////////////////////////////

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

// var m1 = GtoM(g1);
// var m2 = GtoM(g2);

// console.log(m1);
// console.log(m2);



// Triangulation Verifier

// quad searcher
// single-diag checker

// All the 4-cycles (quadrilaterals) in the graph
// Note that when the convex hull's vertices are ordered clockwise, all unique cycles are ordered. Thus for any two cycles equivalent when sorted, they are the same cycles.
var cycles;

// Helper: Check if two arrays are the same, ignore ordering
var sameSubset = function(ar1, ar2) {
	// Sort the cycle arrays, equivalence by sorting shown above
	sar1 = _.sortBy(ar1);
	sar2 = _.sortBy(ar2);
	var same = true;
	// if not same length, just false
	if (sar1.length != sar2.length) { same = false; }
	// else, check each term
	else {
		for (var i = 0; i < sar1.length; i++) {
			if (sar1[i] != sar2[i]) same = false;
		};
	}
	return same;
}
// Helper: Check if the set of cycles has subset = array, ignore ordering
var hasSubset = function(cycles, arr) {
	var isSub = false;
	_.each(cycles, function(ar) {
		if (sameSubset(ar, arr)) { isSub = true; };
	})
	return isSub;
}


// Helper: recursive method to find quad-cycles in the graph, starting from a node = key
var findCycles = function(g, key, i, ar) {
	// control: i = len of array
	i++;
	// copy the ar, and push the key
	var cpy = ar.slice(0);
	cpy.push(key);
	// Then for each value (connected vertex) for the key
	_.each(g[key], function(val) {
		if (i < 4+1) {
			// recurse with val, find next connected vertex
			findCycles(g, val, i, cpy);
		}
	});
	// when array has 5 nodes for quadrilateral cycle
	if (i == 4+1) {
		// quad = all but last of cpy,
		var quad = _.sortBy(_.initial(cpy));
		// check valid quad cycle:
		// quad uniq, and first = last node in cpy
		if (_.size(_.uniq(quad)) == 4 && (_.first(cpy) == _.last(cpy)) ) {
			// if the quadrilateral is new, add to cycles
			if (!hasSubset(cycles, quad)) { cycles.push(quad); };
		}
	}
}

// Helper: recursive method to find N-cycles in the graph, starting from a node = key
var findCyclesN = function(g, key, i, ar) {
	// control: i = len of array
	i++;
	// copy the ar, and push the key
	var cpy = ar.slice(0);
	cpy.push(key);
	// Then for each value (connected vertex) for the key
	_.each(g[key], function(val) {
		// while cycle isn't completed, recurse, up till the largest possible N-cycle. By Pigeon-hole: if encounter first duplicate, terminate
		if (_.size(_.uniq(cpy)) == _.size(cpy)) {
			console.log("entering by diff, at ", i , cpy);
			findCyclesN(g, val, i, cpy);
		}
	});
	// Take only the real cycles, i.e. first = last
	if (_.size(cpy) > 1 && _.first(cpy) == _.last(cpy)) {
		// sorted, take all by last entry; is equivalent for ordered vertices in convex
		var cyc = _.sortBy(_.initial(cpy));
			// if the cyc is new, add to cycles
			if (!hasSubset(cycles, cyc)) { cycles.push(cyc); };
	}
}


// Find all cycles (for all nodes) in graph g
var findAllCycles = function(g) {
	// reset the cycles
	cycles = [];
	// find the cycles for g, by running through each node
	_.each(_.keys(g), function(node) {
		findCycles(g, node, 0, []);
	});
	return cycles;
}
// Find all cycles (for all nodes) in graph g
var findAllCyclesN = function(g) {
	// reset the cycles
	cycles = [];
	// find the cycles for g, by running through each node
	_.each(_.keys(g), function(node) {
		findCyclesN(g, node, 0, []);
	});
	return cycles;
}

// Picks out only cycles of length k
var cycleK = function(k) {
	return _.filter(cycles, function(arr) {
		return arr.length == k;
	});
}


var g1c = findAllCyclesN(g1);
console.log(g1c);
console.log(cycleK(3));
console.log(cycleK(4));
// var g2c = findAllCycles(g2);
// console.log(g2c);


