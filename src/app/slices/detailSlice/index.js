import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
	name: "detail",
	initialState: { data: {} },
	reducers: {
		detailData: (state, action) => {
			state.data = action.payload;
			return state;
		},
	},
});

export const { detailData } = detailSlice.actions;

export default detailSlice.reducer;
