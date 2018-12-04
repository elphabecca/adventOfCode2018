const fs = require('fs');

const data = fs.readFileSync('aoc_day4_data.txt', 'utf8').split("\n");

// PART A
// 1) Order the Data - CHECK!!!

function getRawDateFromDataLine(dataLine) {
	return dataLine.slice(1,17);
}

function getTZDateFromRawDate(rawDate) {
	let dateString = rawDate.split(" ").join("T");
	return dateString += "Z";
}

function getMSDateFromTZDate(TZDate) {
	let msDate = new Date(TZDate).getTime();

	return msDate;
}

function getInfoFromDataLine(dataLine) {
	return dataLine.slice(19)
}

function buildDataObj(msDate, TZDate, info, rawDate) {
	return {msDate, TZDate, info, rawDate};
}

function getTimeSortedArray(data) {
	const allObjs = [];

	for (let i = 0; i < data.length; i++) {
		const rawDate = getRawDateFromDataLine(data[i]);
		const TZDate = getTZDateFromRawDate(rawDate);
		const info = getInfoFromDataLine(data[i]);
		const msDate = getMSDateFromTZDate(TZDate);
		const currObj = buildDataObj(msDate, TZDate, info, rawDate);
		allObjs.push(currObj);
	}

	allObjs.sort(function (a, b) {
	  return a.msDate - b.msDate;
	});

	return allObjs;
}

const timeSortedArray = getTimeSortedArray(data);

// 2) Find the gaurd who slept the most total mins.
// Make an obj where the key is the guard number and value is minutes slept
// var diff = (new Date("1518-03-24T00:46Z") - new Date("1518-03-24T00:43Z"))/60000

function getGuardNumber(infoLine) {
	const infoArray = infoLine.split(" ");
	const guardNum = infoArray[1].slice(1);

	return guardNum;
}

function getMinsAsleep(sleepStart, sleepEnd) {
	return parseInt((new Date(sleepStart) - new Date(sleepEnd))/60000)
}

let guardNum;
const sleepMins = {};

for (let i = 0; i < timeSortedArray.length; i++) {

	const infoLine = timeSortedArray[i].info;

	if (infoLine.includes("Guard")) {
		guardNum = getGuardNumber(infoLine);
	}
	else {
		if (infoLine.includes("falls asleep")) {
			const minsAsleep = getMinsAsleep(timeSortedArray[i+1].TZDate, timeSortedArray[i].TZDate);
			if (sleepMins[guardNum]) sleepMins[guardNum] += minsAsleep;
			else {sleepMins[guardNum] = minsAsleep}
		}
	}
}

let maxSleeperMins = 0;
let maxSleeperGuardNum;
for (const [key, value] of Object.entries(sleepMins)) {
  if (parseInt(value) > maxSleeperMins) {
  	maxSleeperMins = value;
  	maxSleeperGuardNum = key;
  }
}

console.log("The sleepiest guard is #", maxSleeperGuardNum, "who slept for", maxSleeperMins, "minutes.");


// 3) Find what minute that gaurd slept the most.

let isCorrectGuard = false;
let sleepTimeArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

for (let i = 0; i < timeSortedArray.length; i++) {

	const infoLine = timeSortedArray[i].info;
	if (infoLine.includes(maxSleeperGuardNum)) {
		isCorrectGuard = true;
	}
	else if (infoLine.includes("falls") && isCorrectGuard) {
		const asleepIndex = parseInt(timeSortedArray[i].rawDate.slice(-2));
		const awakensIndex = parseInt(timeSortedArray[i+1].rawDate.slice(-2));
		for (let j = asleepIndex; j < awakensIndex; j++) {
			sleepTimeArray[j] += 1;
		}
	}
	else if (infoLine.includes("Guard") && !infoLine.includes(maxSleeperGuardNum)) {
		isCorrectGuard = false;
	}
}

const maxSleepyTime = sleepTimeArray.indexOf(Math.max(...sleepTimeArray));

console.log("GuardNum:", maxSleeperGuardNum, "maxSleepyTime:", maxSleepyTime);
const partAProduct = maxSleeperGuardNum * maxSleepyTime;
console.log(partAProduct);

// PART B
