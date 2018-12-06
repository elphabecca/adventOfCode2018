const fs = require('fs');

const data = fs.readFileSync('aoc_day6_data.txt', 'utf8').split("\n");

let testData = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9";
testData = testData.split("\n");

// PART A

console.log("\n!!! PART A !!!\n")

// console.log(data);
// console.log(testData);

function cleanData(rawDataArray) {
	const dataArray = [];

	for (let a = 0; a < rawDataArray.length; a++) {
		const x = parseInt(rawDataArray[a].split(", ")[0]);
		const y = parseInt(rawDataArray[a].split(", ")[1]);
		dataArray.push({x, y});
	}

	return dataArray;
}

// CHANGE FROM TESTDATA
const cleanDataArray = cleanData(testData);

// console.log("clean data: ", cleanDataArray);

function findGridMaxes(dataArray) {
	let maxX = 0;
	let maxY = 0;

	for (let b = 0; b < dataArray.length; b++) {
		if (dataArray[b].x > maxX) {
			maxX = dataArray[b].x;
		}
		if (dataArray[b].y > maxY) {
			maxY = dataArray[b].y;
		}
	}
	maxX += 1;
	return {maxX, maxY};
}

const maxXY = findGridMaxes(cleanDataArray);

// console.log(maxXY);

function createGridMap(maxXY) {
	const gridPoints = [];

	for (let c = 0; c <= maxXY.maxX; c++) {
		for (let d = 0; d <= maxXY.maxY; d++) {
			const coordString = JSON.stringify({"x": c, "y": d});
			const coordMap = {[coordString]: []};
			// console.log(coordMap); --> { '{"x":0,"y":0}': [] }
			for (let e = 0; e < cleanDataArray.length; e++) {
				const coordFromDataString = JSON.stringify(cleanDataArray[e]);
				// console.log(coordFromDataString, typeof coordFromDataString); --> {"x":1,"y":1} string
				const distance = c + cleanDataArray[e].x + d + cleanDataArray[e].y;
				// console.log(distance); --> 33
				// console.log(coordMap[coordString]); --> []
				const distanceMap = {[coordFromDataString]: distance};
				// console.log(distanceMap); --> { '{"x":8,"y":3}': 28 }
				coordMap[coordString].push(distanceMap);
				console.log(coordMap);
					// { '{"x":9,"y":9}':
					//    [ { '{"x":1,"y":1}': 20 },
					//      { '{"x":1,"y":6}': 25 },
					//      { '{"x":8,"y":3}': 29 },
					//      { '{"x":3,"y":4}': 25 },
					//      { '{"x":5,"y":5}': 28 },
					//      { '{"x":8,"y":9}': 35 } ] }
				gridPoints.push(coordMap);
			}
		}
	}

	return gridPoints;
}

const grid = createGridMap(maxXY);

// console.log(grid);

// '{"x":0,"y":0}': [{"{ x: 8, y: 3 }": distance}, ...]

// PART B

// console.log("\n!!! PART B !!!\n")