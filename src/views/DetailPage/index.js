import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme";
import { useParams } from "react-router-dom";
import { fetchDetail, fetchTimeStamp } from "../../services/api";
import { detailData } from "../../app/slices/detailSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { timeStampStartEnd } from "../../app/slices/timeStampSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function DetailPage() {
	const selectedTheme = useSelector((state) => state.theme.selected);
	const selectedCurrency = useSelector((state) => state.currency.selected);
	const currentRate = useSelector((state) => state.currency.currentRate);
	const { id } = useParams();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.detail.data);
	const dataHistory = useSelector((state) => state.timeStamp.data);
	const textStyle = { color: theme[selectedTheme].color1 };
	const styleTheme = {
		backgroundColor: theme[selectedTheme].bg1,
		color: theme[selectedTheme].color1,
	};
	const styleThemeReverse = {
		backgroundColor: theme[selectedTheme].color1,
		color: theme[selectedTheme].bg1,
	};

	async function getDetailData() {
		const resDetail = await fetchDetail(id);
		const resTime = await fetchTimeStamp(id);
		dispatch(detailData(resDetail.data));
		dispatch(timeStampStartEnd(resTime.data));
	}

	useEffect(() => {
		getDetailData();
		const interval = setInterval(() => {
			getDetailData();
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	return (
		<Box
			sx={{ marginTop: "2vh", padding: "0 1vw 5vh 1vw", width: "86vw" }}
			id="detailPagebox"
		>
			<Paper
				style={{
					backgroundColor: theme[selectedTheme].bg1,
					padding: "2%",
				}}
			>
				<Grid container spacing={2} id="detailPageGrid">
					<Grid item xs={6} md={4} id="gridDiv1">
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography variant="h2" style={styleTheme} id="detailPageH2">
								{data.name}
							</Typography>
							<Typography
								variant="p"
								style={{
									padding: "4px 10px",
									margin: "0 10px",
									borderRadius: "10px",
									fontWeight: "bold",
								}}
								sx={styleThemeReverse}
							>
								{data.symbol}
							</Typography>
						</div>
						<div
							style={{
								margin: "10px 0",
							}}
						>
							<Typography
								variant="p"
								style={{
									padding: "4px 10px",
									borderRadius: "10px",
								}}
								sx={styleThemeReverse}
							>
								Rank: <span style={{ fontWeight: "bold" }}>{data.rank}</span>
							</Typography>
						</div>
					</Grid>
					<Grid item xs={6} md={8} id="gridDiv2">
						<div style={{ display: "flex", alignItems: "center" }}>
							{selectedCurrency === "usd" ? (
								<Typography variant="h2" style={styleTheme}>
									${" "}
									{Number(data.priceUsd).toLocaleString(undefined, {
										maximumFractionDigits: 2,
									})}
								</Typography>
							) : (
								<Typography variant="h2" style={styleTheme}>
									€
									{(Number(data.priceUsd) / Number(currentRate)).toLocaleString(
										undefined,
										{
											maximumFractionDigits: 2,
										}
									)}
								</Typography>
							)}
							{data.changePercent24Hr > 0 ? (
								<Typography
									variant="p"
									style={{
										padding: "2px 10px 6px 10px",
										margin: "0 10px",
										borderRadius: "10px",
										fontWeight: "bold",
									}}
									sx={{
										backgroundColor: theme[selectedTheme].color1,
										color: "#16c784",
									}}
								>
									<ArrowDropUpIcon />
									{Number(data.changePercent24Hr).toFixed(2)} %
								</Typography>
							) : (
								<Typography
									variant="p"
									style={{
										padding: "2px 10px 6px 10px",
										margin: "0 15px",
										borderRadius: "10px",
										fontWeight: "bold",
									}}
									sx={{
										backgroundColor: theme[selectedTheme].color1,
										color: "#ea3943",
									}}
								>
									<ArrowDropDownIcon />
									{-Number(data.changePercent24Hr).toFixed(2)} %
								</Typography>
							)}
						</div>
					</Grid>
				</Grid>
			</Paper>

			<Paper
				style={{
					backgroundColor: theme[selectedTheme].bg1,
					padding: "2%",
					marginTop: "2%",
				}}
			>
				<Grid container spacing={2} id="detailPageGrid2">
					<Grid item xs={12} md={12}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center" sx={textStyle}>
										Date
									</TableCell>

									<TableCell align="center" sx={textStyle}>
										Name
									</TableCell>
									<TableCell align="center" sx={textStyle}>
										Symbol
									</TableCell>
									<TableCell align="center" sx={textStyle}>
										Price
									</TableCell>
									{/* <TableCell align="center" sx={textStyle}>
										Now / That day %
									</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{dataHistory.map((dh) => (
									<TableRow key={dh.time}>
										<TableCell align="center" sx={textStyle}>
											{dh.date.slice(0, 10)}
										</TableCell>
										<TableCell align="center" sx={textStyle}>
											{data.name}
										</TableCell>
										<TableCell align="center" sx={textStyle}>
											{data.symbol}
										</TableCell>
										{selectedCurrency === "usd" ? (
											<TableCell align="center" sx={textStyle}>
												${" "}
												{Number(dh.priceUsd).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</TableCell>
										) : (
											<TableCell align="center" sx={textStyle}>
												€{" "}
												{(
													Number(dh.priceUsd) / Number(currentRate)
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</TableCell>
										)}
										{/* <TableCell align="center" sx={textStyle}>
											{data.priceUsd >= dh.priceUsd
												? data.priceUsd / dh.priceUsd
												: -data.priceUsd / dh.priceUsd}
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
