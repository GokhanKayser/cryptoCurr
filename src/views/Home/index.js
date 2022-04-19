import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMarketData, fetchRates } from "../../services/api";
import { setMarketData } from "../../app/slices/marketSlice";
import { toggleCurrency } from "../../app/slices/currencySlice";
import { ListTable, FilterTable } from "../../components";

export default function Home() {
	const dispatch = useDispatch();

	async function getMarketData() {
		const resMarketData = await fetchMarketData();
		dispatch(setMarketData(resMarketData.data));
	}

	useEffect(() => {
		getMarketData();
		const interval = setInterval(() => {
			getMarketData();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			id="homeContainer"
			style={{
				padding: "0px 1vw 0 1vw",
				width: "86vw",
			}}
		>
			<FilterTable />
			<ListTable />
		</div>
	);
}
