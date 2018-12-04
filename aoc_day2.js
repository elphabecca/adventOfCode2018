const fs = require('fs');

const data = fs.readFileSync('aoc_day2_data.txt', 'utf8').split("\n");

// PART A
let twoCounter = 0;
let threeCounter = 0;

for (let i = 0; i < data.length; i++) {
	const counterDict = {};
	for (let j = 0; j < data[i].length; j++) {
		if (counterDict[data[i][j]]) {
			counterDict[data[i][j]] += 1;
		}
		else {
			counterDict[data[i][j]] = 1;
		}
	}
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
// improvement for later -- go back and make sure you're not doubling every comparison.
// ie, once i=1 and j=2 have been compared, they don't need to be compared again
// once again when i=2 and j=1.

for (let i = 0; i < data.length; i++) {
	for (let j = 0; j < data.length; j++) {
		let strikeOne = false;
		let strikeTwo = false;
		for (let k = 0; k < data[i].length; k++) {
			if (data[i][k] !== data[j][k] && strikeOne) {
				strikeTwo = true;
				break;
			}
			if (data[i][k] !== data[j][k] && !strikeOne) {
				strikeOne = true;
			}
		}
		if (!strikeTwo && strikeOne) {
			console.log("Got it! ", i, ": ", data[i], j, ": ", data[j]);
			for (let l = 0; l < data[i].length; l++) {
				if (data[i][l] !== data[j][l]) {
					const retCharsOne = data[i].slice(0,l) + data[i].slice(l+1)
					const retCharsTwo = data[j].slice(0,l) + data[j].slice(l+1)
					if (retCharsOne === retCharsTwo) {
						console.log("woohoo! ", retCharsOne);
					}
					else {
						console.log("uh oh");
					}
				}
			}
		}
	}
}
