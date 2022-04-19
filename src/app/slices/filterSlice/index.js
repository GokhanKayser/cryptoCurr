import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
	name: "filter",
	initialState: {
		symbol: "",
		name: "",
	},
	reducers: {
		filterSymbol: (state, action) => {
			state.symbol = action.payload;
			return state;
		},
		filterName: (state, action) => {
			state.name = action.payload;
			return state;
		},
	},
});

export const { filterSymbol, filterName } = filterSlice.actions;

export default filterSlice.reducer;
