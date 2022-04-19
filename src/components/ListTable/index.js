import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LinkIcon from "@mui/icons-material/Link";
import theme from "../../theme";
import PaginationRow from "../PaginationRow";

export default function ListTable() {
	const data = useSelector((state) => state.market.data);
	const selectedCurrency = useSelector((state) => state.currency.selected);
	const currentRate = useSelector((state) => state.currency.currentRate);
	const navigate = useNavigate();
	const symbolFilter = useSelector((state) => state.filter.symbol);
	const nameFilter = useSelector((state) => state.filter.name);
	const pageNumber = useSelector((state) => state.pagination.page);
	const perPageNumber = useSelector((state) => state.pagination.perPage);
	const selectedTheme = useSelector((state) => state.theme.selected);
	const textStyle = { color: theme[selectedTheme].color1 };

	return (
		<TableContainer
			component={Paper}
			sx={{
				backgroundColor: theme[selectedTheme].bg1,
			}}
		>
			<Table aria-label="simple table" id="ListTableCss">
				<TableHead>
					<TableRow>
						<TableCell sx={textStyle}>ID</TableCell>
						<TableCell align="center" sx={textStyle}>
							Symbol
						</TableCell>
						<TableCell align="center" sx={textStyle}>
							Name
						</TableCell>
						<TableCell align="right" sx={textStyle}>
							Price
						</TableCell>
						<TableCell align="right" sx={textStyle}>
							24h %
						</TableCell>
						<TableCell align="right" sx={textStyle} id="marketcapth">
							Market Cap
						</TableCell>
						<TableCell align="right" sx={textStyle} id="circulatingth">
							Circulating Supply
						</TableCell>
						<TableCell align="right" sx={textStyle} id="maxCirculatingth">
							Max Circulating Supply
						</TableCell>
						<TableCell align="right" sx={textStyle} id="vwapth">
							VW Average Price
						</TableCell>
						<TableCell align="right" sx={textStyle} id="explorerth">
							Explorer
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						.filter((item) => {
							return (
								item.symbol
									.toUpperCase()
									.includes(symbolFilter.toUpperCase()) &&
								item.name.toUpperCase().includes(nameFilter.toUpperCase())
							);
						})
						.filter((item, index) => {
							const startingIndex = (pageNumber - 1) * perPageNumber;
							const endingIndex = pageNumber * perPageNumber - 1;
							return startingIndex <= index && index <= endingIndex;
						})
						.map((data) => (
							<TableRow
								key={data.id}
								onClick={() => navigate(`/detail/${data.id}`)}
								sx={{ cursor: "pointer" }}
							>
								<TableCell component="th" scope="row" sx={textStyle}>
									{data.rank}
								</TableCell>
								<TableCell align="center" sx={textStyle}>
									{data.symbol}
								</TableCell>
								<TableCell align="center" sx={textStyle}>
									{data.name}
								</TableCell>
								{selectedCurrency === "usd" ? (
									<TableCell align="right" sx={textStyle}>
										${" "}
										{Number(data.priceUsd).toLocaleString(undefined, {
											maximumFractionDigits: 3,
										})}
									</TableCell>
								) : (
									<TableCell align="right" sx={textStyle}>
										€{" "}
										{(
											Number(data.priceUsd) / Number(currentRate)
										).toLocaleString(undefined, { maximumFractionDigits: 3 })}
									</TableCell>
								)}
								{data.changePercent24Hr > 0 ? (
									<TableCell align="right" sx={{ color: "#16c784" }}>
										<ArrowDropUpIcon />
										{Number(data.changePercent24Hr).toFixed(3)} %
									</TableCell>
								) : (
									<TableCell align="right" sx={{ color: "#ea3943" }}>
										<ArrowDropDownIcon />
										{-Number(data.changePercent24Hr).toFixed(3)} %
									</TableCell>
								)}
								{selectedCurrency === "usd" ? (
									<TableCell align="right" sx={textStyle} id="marketcaptd1">
										${" "}
										{Number(data.marketCapUsd).toLocaleString(undefined, {
											maximumFractionDigits: 0,
										})}
									</TableCell>
								) : (
									<TableCell align="right" sx={textStyle} id="marketcaptd2">
										€{" "}
										{(
											Number(data.marketCapUsd) / Number(currentRate)
										).toLocaleString(undefined, { maximumFractionDigits: 0 })}
									</TableCell>
								)}
								<TableCell align="right" sx={textStyle} id="circulatingtd">
									{Number(data.supply).toLocaleString(undefined, {
										maximumFractionDigits: 0,
									})}{" "}
									{data.symbol}
								</TableCell>
								<TableCell align="right" sx={textStyle} id="maxCirculatingtd">
									{Number(data.maxSupply).toLocaleString(undefined, {
										maximumFractionDigits: 0,
									})}{" "}
									{data.symbol}
								</TableCell>
								<TableCell align="right" sx={textStyle} id="vwaptd">
									{Number(data.vwap24Hr).toLocaleString(undefined, {
										maximumFractionDigits: 3,
									})}
								</TableCell>
								<TableCell align="right" sx={textStyle} id="explorertd">
									<LinkIcon
										style={{ cursor: "pointer" }}
										onClick={(e) => (
											window.open(data.explorer), e.stopPropagation()
										)}
									/>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<PaginationRow />
		</TableContainer>
	);
}
