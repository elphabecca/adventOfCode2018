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

// CHANGE FROM TESTDATA --> DATA
let arrayData = data.split("");
let needsAnotherSplicing = true;

function runASpliceThrough() {
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
	runASpliceThrough();
}

console.log("Final Polymer String Length:", arrayData.length);

// PART B
// What is the length of the shortest polymer you can produce by:
	// first removing all of one type
	// then splicing

console.log("!!! PART B !!!")

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function getFreshData() {
	// CHANGE TO DATA
	return data.split("");
}

const alphabetMapOfArrays = {};

function removeLetterFromPolymer(letter) {

	const currDataArray = getFreshData();

	for (let b = 0; b < currDataArray.length; b++) {
		if (currDataArray[b].toLowerCase() === letter) {
			currDataArray.splice(b, 1);
			b -= 1;
		}
	}
	return currDataArray;
}

function createAlphabetMapOfArrays() {

	for (let c = 0; c < alphabet.length; c++) {
		const currAlphaLetter = alphabet[c];
		const trimmedAlphaLetterArray = removeLetterFromPolymer(currAlphaLetter);
		alphabetMapOfArrays[currAlphaLetter] = {trimmedAlphaLetterArray, "needsMoarSplicing": true, "finalLength": 0}
	}
}

createAlphabetMapOfArrays();

function runASpliceThroughModded(stringGoneArray) {
	needsAnotherSplicing = false;
	for (let a = 0; a < (stringGoneArray.length - 1); a++) {
		let currLetter = stringGoneArray[a];
		let compLetter = stringGoneArray[a + 1];
		if (currLetter.toLowerCase() === compLetter.toLowerCase() && currLetter !== compLetter) {
			stringGoneArray.splice(a, 2);
			needsAnotherSplicing = true;
		}
	}
	return needsAnotherSplicing;
}

function spliceEachAlphaArray(alphabetMapOfArrays) {

	for (const [key, value] of Object.entries(alphabetMapOfArrays)) {
		while (value.needsMoarSplicing) {
			value.needsMoarSplicing = runASpliceThroughModded(value.trimmedAlphaLetterArray);
		}
		value.finalLength = value.trimmedAlphaLetterArray.length;
	}
}

spliceEachAlphaArray(alphabetMapOfArrays);

// CHANGE TO DATA
let shortestStringLength = data.length;

for (const [key, value] of Object.entries(alphabetMapOfArrays)) {
	if (value.finalLength < shortestStringLength) {
		console.log("trading:", shortestStringLength, "for", value.finalLength)
		shortestStringLength = value.finalLength;
	}
}

console.log("!!!", shortestStringLength);

// While I was testing stuff that I want to get out of my way:
	// I could clean it up...but I'm sorta happy with it.

// TestData Help:
	// Removing all A/a units produces dbcCCBcCcD. Fully reacting this polymer produces dbCBcD,
		// which has length 6.
	// Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this polymer produces daCAcaDA,
		// which has length 8.
	// Removing all C/c units produces dabAaBAaDA. Fully reacting this polymer produces daDA,
		// which has length 4.
	// Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this polymer produces abCBAc,
		// which has length 6.
	// In this example, removing all C/c units was best, producing the answer 4.

// removeLetterFromPolymer("a");
// console.log("a:", removeLetterFromPolymer("a").join("") === "dbcCCBcCcD");
// removeLetterFromPolymer("b");
// console.log("b:", removeLetterFromPolymer("b").join("") === "daAcCaCAcCcaDA");
// removeLetterFromPolymer("c");
// console.log("c:", removeLetterFromPolymer("c").join("") === "dabAaBAaDA");
// removeLetterFromPolymer("d");
// console.log("d:", removeLetterFromPolymer("d").join("") === "abAcCaCBAcCcaA");

// console.log("a:", alphabetMapOfArrays.a.trimmedAlphaLetterArray.join("") === "dbcCCBcCcD");
// console.log("b:", alphabetMapOfArrays.b.trimmedAlphaLetterArray.join("") === "daAcCaCAcCcaDA");
// console.log("c:", alphabetMapOfArrays.c.trimmedAlphaLetterArray.join("") === "dabAaBAaDA");
// console.log("d:", alphabetMapOfArrays.d.trimmedAlphaLetterArray.join("") === "abAcCaCBAcCcaA");

// console.log("a:", alphabetMapOfArrays.a);
// console.log("b:", alphabetMapOfArrays.b);
// console.log("c:", alphabetMapOfArrays.c);
// console.log("d:", alphabetMapOfArrays.d);

// console.log("a:", alphabetMapOfArrays.a.trimmedAlphaLetterArray.join("") === "dbCBcD", alphabetMapOfArrays.a.finalLength === 6);
// console.log("b:", alphabetMapOfArrays.b.trimmedAlphaLetterArray.join("") === "daCAcaDA", alphabetMapOfArrays.b.finalLength === 8);
// console.log("c:", alphabetMapOfArrays.c.trimmedAlphaLetterArray.join("") === "daDA", alphabetMapOfArrays.c.finalLength === 4);
// console.log("d:", alphabetMapOfArrays.d.trimmedAlphaLetterArray.join("") === "abCBAc", alphabetMapOfArrays.d.finalLength === 6);

