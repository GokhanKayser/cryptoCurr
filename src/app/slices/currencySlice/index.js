import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
	name: "currency",
	initialState: {
		selected: localStorage.getItem("currency") || "usd",
		currentRate: 1,
	},
	reducers: {
		toggleCurrency: (state, action) => {
			if (state.selected === "usd") {
				state.selected = "euro";
			} else {
				state.selected = "usd";
			}
			localStorage.setItem("currency", state.selected);
		},
		setCurrentRate: (state, action) => {
			console.log(action.payload);
			state.currentRate = action.payload.data?.rateUsd || 1;
			return state;
		},
	},
});

export const { toggleCurrency, setCurrentRate } = currencySlice.actions;

export default currencySlice.reducer;
