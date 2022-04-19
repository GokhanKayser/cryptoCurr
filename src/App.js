import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, DetailPage, Asd, Fgh } from "./views";
import { Sidebar } from "./components";
import { useSelector, useDispatch } from "react-redux";
import theme from "./theme";
import { Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleMobileMenu } from "./app/slices/uiSlice";

function App() {
	const dispatch = useDispatch();
	const selectedTheme = useSelector((state) => state.theme.selected);
	const isOpen = useSelector((state) => state.theme.mobileMenu);

	return (
		<Grid
			className="App"
			container
			spacing={0}
			style={{
				flexWrap: "nowrap",
				minHeight: "100vh",
				minWidth: "100%",
				backgroundColor: theme[selectedTheme].bg2,
				color: theme[selectedTheme].color2,
			}}
		>
			<Grid item xs={3} sm={3} md={1.5} id="desktopSidebar">
				<Sidebar
					style={{
						backgroundColor: theme[selectedTheme].bg1,
						color: theme[selectedTheme].color1,
					}}
				/>
			</Grid>
			{isOpen && (
				<Grid item xs={3} sm={3} md={1.5} id="mobileSidebar">
					<Sidebar
						style={{
							backgroundColor: theme[selectedTheme].bg1,
							color: theme[selectedTheme].color1,
						}}
					/>
				</Grid>
			)}

			<Grid item xs={9} sm={9} md={10}>
				<button
					onClick={() => {
						dispatch(toggleMobileMenu());
					}}
					id="mobileMenuButton"
					style={{
						padding: "10px 20px",
						marginRight: "15vw",
						cursor: "pointer",
						backgroundColor: theme[selectedTheme].bg1,
						color: theme[selectedTheme].color1,
						border: `1px solid ${theme[selectedTheme].color2}`,
					}}
				>
					<MenuIcon />
				</button>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Asd" element={<Asd />} />
					<Route path="/fgh" element={<Fgh />} />
					<Route path="/detail/:id" element={<DetailPage />} />
				</Routes>
			</Grid>
		</Grid>
	);
}

export default App;
