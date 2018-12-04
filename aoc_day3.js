const fs = require('fs');

const data = fs.readFileSync('aoc_day3_data.txt', 'utf8').split("\n");

console.log(data[0]);

// PART A

function getObjOfOrderedPairs(claimData) {

	const dataPartsOne = claimData.split("@");
	const claimNum = parseInt(dataPartsOne[0].trim().slice(1));
	const dataPartsTwo = dataPartsOne[1].split(":");
	const leftTop = dataPartsTwo[0].trim().split(",");
	const left = parseInt(leftTop[0]);
	const top = parseInt(leftTop[1]);
	const widthHeight = dataPartsTwo[1].trim().split("x");
	const width = parseInt(widthHeight[0]);
	const height = parseInt(widthHeight[1]);
	console.log(claimNum, left, top, width, height);

	// return {claimNum: [(x, y),(x, y),(x, y)...]}
	return 1;
}

getObjOfOrderedPairs(data[0]);


// PART B
