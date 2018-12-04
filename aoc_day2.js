const fs = require('fs');

const data = fs.readFileSync('aoc_day2_data.txt', 'utf8').split("\n");

// PART A
let twoCounter = 0;
let threeCounter = 0;

for (let i = 0; i < data.length; i++) {
	const counterDict = {};
	console.log(data[i])
	for (let j = 0; j < data[i].length; j++) {
		if (counterDict[data[i][j]]) {
			counterDict[data[i][j]] += 1;
		}
		else {
			counterDict[data[i][j]] = 1;
		}
	}
	console.log(Object.values(counterDict));
	let countArray = Object.values(counterDict);
	if (countArray.includes(2)) {
		twoCounter += 1;
	}
	if (countArray.includes(3)) {
		threeCounter += 1;
	}
}

const sumCheck = twoCounter * threeCounter;
console.log("twoCounter: ", twoCounter, "threeCounter: ", threeCounter);
console.log("sumCheck: ", sumCheck);

// PART B