import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "theme",
	initialState: {
		selected: localStorage.getItem("theme") || "light",
		mobileMenu: false,
	},
	reducers: {
		toggleTheme: (state, action) => {
			if (state.selected === "light") {
				state.selected = "dark";
			} else {
				state.selected = "light";
			}
			localStorage.setItem("theme", state.selected);
		},

		toggleMobileMenu: (state, action) => {
			state.mobileMenu ? (state.mobileMenu = false) : (state.mobileMenu = true);
		},
	},
});

export const { toggleTheme, toggleMobileMenu } = uiSlice.actions;

export default uiSlice.reducer;
