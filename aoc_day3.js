const fs = require('fs');

const data = fs.readFileSync('aoc_day3_data.txt', 'utf8').split("\n");

// PART A
// How many square inches of fabric are within two or more claims?

console.log("\n!!! PART A !!!\n");

const testData = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

function getObjOfOrderedPairs(claimData) {

	const dataPartsOne = claimData.split("@");
	const claimNum = dataPartsOne[0].trim().slice(1);
	const dataPartsTwo = dataPartsOne[1].split(":");
	const leftTop = dataPartsTwo[0].trim().split(",");
	const left = parseInt(leftTop[0]);
	const fromTheTop = parseInt(leftTop[1]);
	const widthHeight = dataPartsTwo[1].trim().split("x");
	const width = parseInt(widthHeight[0]);
	const height = parseInt(widthHeight[1]);

	const coordinatesArray = [];

	for (let x = left; x < left + width; x++) {
		for (let y = (1000-fromTheTop-height+1); y <= (1000-fromTheTop); y++) {
			coordinatesArray.push({x, y});
		}
	}

	return coordinatesArray;
}

const fullClaimsArray = [];

// adjust testData to be DATA
for (let i = 0; i < data.length; i++) {
	const claim = getObjOfOrderedPairs(data[i]);
	fullClaimsArray.push(claim);
}

let seenMap = {};

for (let j = 0; j < fullClaimsArray.length; j++) {
	for (let k = 0; k < fullClaimsArray[j].length; k++) {
		const keyName = JSON.stringify(fullClaimsArray[j][k]);
		seenMap[keyName] > -1 ? seenMap[keyName] += 1 : seenMap[keyName] = 0;
	}
}

let overlapCount = 0;

for (const [key, value] of Object.entries(seenMap)) {
	if (value) {
		overlapCount += 1;
	}
}

console.log("Final Overlap Count:", overlapCount);

// PART B

console.log("\n!!! PART B !!!\n");


