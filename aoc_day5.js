const fs = require('fs');

const data = fs.readFileSync('aoc_day5_data.txt', 'utf8');

const testData = "dabAcCaCBAcCcaDA";
// dab*Aa*CBAcCcaDA
// dabCBA*cCc*aDA  NOTE: whichever 'set' is removed yields the same result
// dabCBAcaDA

// PART A
// Get rid of the reactants (Ee or eE) in the data
// return the length of the final string (testData = 10, final string for testData is dabCBAcaDA)

console.log("!!! PART A !!!")

// console.log(data)
// console.log(testData)

// turn the data into an array
// CHANGE FROM TESTDATA --> DATA
let arrayData = data.split("");
let needsAnotherSplicing = true;

// console.log(arrayData);

function runASpliceThrough(stringGoneArray) {
	needsAnotherSplicing = false;
	for (let a = 0; a < (arrayData.length - 1); a++) {
		let currLetter = arrayData[a];
		let compLetter = arrayData[a + 1];
		// console.log("Comparing:", currLetter, compLetter, "arrayData.length:", arrayData.length);
		// check if they're the same letter (NOTE: 'a' === 'A' ==> FALSE)
		if (currLetter.toLowerCase() === compLetter.toLowerCase() && currLetter !== compLetter) {
			arrayData.splice(a, 2);
			// console.log("arrayData:", arrayData, "arrayData.length", arrayData.length)
			needsAnotherSplicing = true;
		}
	}
	return needsAnotherSplicing;
}

while (needsAnotherSplicing) {
	console.log("splicing... arrayData length is:", arrayData.length)
	runASpliceThrough(arrayData);
}

console.log("Final Polymer String Length:", arrayData.length);

// PART B

console.log("!!! PART B !!!")


