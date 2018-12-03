const fs = require('fs');

const data = fs.readFileSync('aoc_day1_data.txt', 'utf8').split("\n");

// PART A
let ans = 0;

for (let i = 0; i < data.length; i++) {
	const num = parseInt(data[i]);
	ans += num;
}

console.log("part 1: ", ans);

// PART B
const frequencies = [];
frequency = 0;

function isFrequencyFound(dataArray, frequencies, frequency) {

	let frequencyFound = false;
	for (let j = 0; j < data.length; j++) {
		const numData = parseInt(data[j]);
		if (frequencies.includes(frequency)) {
			console.log("found it: ", frequency);
			frequencyFound = true;
			break;
		}
		frequencies.push(frequency);
		frequency += numData;
	}

	if (frequencyFound) {
		return frequency
	}
	else {
		return isFrequencyFound(dataArray, frequencies, frequency)
	}
}

isFrequencyFound(data, [], 0);