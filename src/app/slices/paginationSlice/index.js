import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
	name: "pagination",
	initialState: {
		page: 1,
		perPage: 10,
	},
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
			return state;
		},
	},
});

export const { setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
