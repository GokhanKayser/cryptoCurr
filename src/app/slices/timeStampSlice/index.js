import { createSlice } from "@reduxjs/toolkit";

export const timeStampSlice = createSlice({
	name: "timeStamp",
	initialState: { data: [] },
	reducers: {
		timeStampStartEnd: (state, action) => {
			state.data = action.payload;
			return state;
		},
	},
});

export const { timeStampStartEnd } = timeStampSlice.actions;

export default timeStampSlice.reducer;
