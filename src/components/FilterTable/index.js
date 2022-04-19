import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
import theme from "../../theme";
import { filterSymbol, filterName } from "../../app/slices/filterSlice";

export default function FilterTable() {
	const selectedTheme = useSelector((state) => state.theme.selected);
	const symbolFilter = useSelector((state) => state.filter.symbol);
	const nameFilter = useSelector((state) => state.filter.name);
	const dispatch = useDispatch();

	const inputStyle = {
		backgroundColor: "transparent",
		padding: "7px 15px",
		outline: "none",
		border: `1.5px solid ${theme[selectedTheme].color1}`,
		color: theme[selectedTheme].color1,
	};
	return (
		<Box
			id="filerTableCss"
			sx={{
				flexGrow: 1,
				marginTop: "2vh",
				marginBottom: "2vh",
				padding: "3vh 3vw 2vh 3vw",
				borderRadius: "5px",
				border: "0.1px solid rgba(0, 0, 0, 0.3)",
				backgroundColor: theme[selectedTheme].bg1,
			}}
		>
			<Grid container spacing={2}>
				<div
					id="filerTableFlexBox"
					style={{ display: "flex", flexWrap: "wrap" }}
				>
					<Grid item style={{ margin: "1vh 3vw" }}>
						<input
							type="text"
							style={inputStyle}
							value={symbolFilter}
							placeholder="search symbol..."
							onChange={(e) => dispatch(filterSymbol(e.target.value))}
						/>
					</Grid>
					<Grid item style={{ margin: "1vh 3vw" }}>
						<input
							type="text"
							style={inputStyle}
							value={nameFilter}
							placeholder="search name..."
							onChange={(e) => dispatch(filterName(e.target.value))}
						/>
					</Grid>
				</div>
			</Grid>
		</Box>
	);
}
