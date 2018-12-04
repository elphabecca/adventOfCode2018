const fs = require('fs');

const data = fs.readFileSync('aoc_day4_data.txt', 'utf8').split("\n");

// PART A
// 1) Order the Data - CHECK!!!
// 2) Find the gaurd who slept the most total mins.
// 3) Find what minute that gaurd slept the most.

function getRawDateFromDataLine(dataLine) {
	return dataLine.slice(1,17);
}

function getMSDateFromRawDate(rawDate) {
	let dateString = rawDate.split(" ").join("T");
	dateString += "Z";

	let msDate = new Date(dateString).getTime();

	return msDate;
}

function getInfoFromDataLine(dataLine) {
	return dataLine.slice(19)
}

function buildDataObj(msDate, info, rawDate) {
	return {msDate, info, rawDate};
}

function getTimeSortedArray(data) {
	const allObjs = [];

	for (let i = 0; i < data.length; i++) {
		const rawDate = getRawDateFromDataLine(data[i]);
		const info = getInfoFromDataLine(data[i]);
		const msDate = getMSDateFromRawDate(rawDate);
		const currObj = buildDataObj(msDate, info, rawDate);
		allObjs.push(currObj);
	}

	allObjs.sort(function (a, b) {
	  return a.msDate - b.msDate;
	});

	return allObjs;
}

const timeSortedArray = getTimeSortedArray(data);

console.log(timeSortedArray);

// PART B
