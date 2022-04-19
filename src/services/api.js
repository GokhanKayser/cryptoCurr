export const fetchMarketData = async () => {
	const response = await fetch("https://api.coincap.io/v2/assets");
	const data = await response.json();
	return data;
};

export const fetchDetail = async (assetName) => {
	const response = await fetch(`https://api.coincap.io/v2/assets/${assetName}`);
	const data = await response.json();
	return data;
};

export const fetchRates = async (assetName) => {
	const response = await fetch(`https://api.coincap.io/v2/rates/${assetName}`);
	const data = await response.json();
	return data;
};

export const fetchTimeStamp = async (assetName) => {
	let newDate = new Date();
	let date = newDate.getDate();
	let date7 = newDate.getDate() - 8;
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
	let separator = ".";
	let today_dateTime = `${year}${separator}${
		month < 10 ? `0${month}` : `${month}`
	}${separator}${date} 04:00`;
	let day7_dateTime = `${year}${separator}${
		month < 10 ? `0${month}` : `${month}`
	}${separator}${date7} 04:00`;
	let today_timeStamp = Math.floor(new Date(today_dateTime).getTime());
	let day7_timeStamp = Math.floor(new Date(day7_dateTime).getTime());

	const response = await fetch(
		`https://api.coincap.io/v2/assets/${assetName}/history?interval=d1&start=${day7_timeStamp}&end=${today_timeStamp}`
	);

	const data = await response.json();
	return data;
};
