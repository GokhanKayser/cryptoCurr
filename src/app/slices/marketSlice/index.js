import { createSlice } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
	name: "market",
	initialState: { data: [] },
	reducers: {
		setMarketData: (state, action) => {
			state.data = action.payload;
			return state;
		},
	},
});

export const { setMarketData } = marketSlice.actions;

export default marketSlice.reducer;
