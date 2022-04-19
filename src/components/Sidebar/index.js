import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../app/slices/uiSlice";
import { setCurrentRate, toggleCurrency } from "../../app/slices/currencySlice";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import EuroIcon from "@mui/icons-material/Euro";
import PaidIcon from "@mui/icons-material/Paid";
import { fetchRates } from "../../services/api";
import { toggleMobileMenu } from "../../app/slices/uiSlice";

export default function Sidebar(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedTheme = useSelector((state) => state.theme.selected);
	const selectedCurrency = useSelector((state) => state.currency.selected);

	const linkStyle = {
		...props.style,
		backgroundColor: "transparent",
		textDecoration: "none",
	};

	async function getCurrencyData() {
		const resCurrency = await fetchRates(selectedCurrency);
		dispatch(setCurrentRate(resCurrency));
	}

	React.useEffect(() => {
		getCurrencyData();
		const interval = setInterval(() => {
			getCurrencyData();
		}, 5000);
		return () => clearInterval(interval);
	}, [selectedCurrency]);

	return (
		<Box
			sx={{
				height: "100%",
				zIndex: "100",
				...props.style,
			}}
		>
			<span
				id="closeSidebarX"
				onClick={() => {
					dispatch(toggleMobileMenu());
				}}
			>
				X
			</span>
			<nav aria-label="main mailbox folders" id="sidebarNav">
				<Typography
					variant="h5"
					component="h5"
					onClick={() => navigate(`/`)}
					sx={{
						display: "flex",
						justifyContent: "center",
						paddingTop: "4vh",
						paddingBottom: "4vh",
						borderBottom: "1.5px solid grey",
						cursor: "pointer",
					}}
				>
					CryptoCurr
				</Typography>

				<div
					id="modeCurencyIcon"
					style={{ dispay: "flex", margin: "2vh 0 7.5vh 1vw" }}
				>
					<Button
						sx={{
							padding: "2vh 1vw",
							...props.style,
						}}
						onClick={() => {
							dispatch(toggleTheme());
						}}
					>
						{selectedTheme === "light" ? (
							<ModeNightIcon id="sidebarNavListIconNight" />
						) : (
							<LightModeIcon id="sidebarNavListIconLight" />
						)}
					</Button>
					<Button
						sx={{
							padding: "2vh 1vw",
							...props.style,
						}}
						onClick={() => {
							dispatch(toggleCurrency());
						}}
					>
						{selectedCurrency === "usd" ? (
							<EuroIcon id="sidebarNavListIconEuro" />
						) : (
							<PaidIcon id="sidebarNavListIconUsd" />
						)}
					</Button>
				</div>
				<List id="sidebarNavList">
					<ListItem>
						<Link to="/" style={linkStyle}>
							<ListItemButton id="sidebarListButton1">
								<ListItemIcon id="sidebarNavListIcon1">
									<HomeIcon style={linkStyle} />
								</ListItemIcon>
								Home
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem>
						<Link to="/asd" style={linkStyle}>
							<ListItemButton id="sidebarListButton2">
								<ListItemIcon id="sidebarNavListIcon2">
									<CurrencyExchangeIcon style={linkStyle} />
								</ListItemIcon>
								Asd
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem>
						<Link to="/fgh" style={linkStyle}>
							<ListItemButton id="sidebarListButton3">
								<ListItemIcon id="sidebarNavListIcon3">
									<CurrencyExchangeIcon style={linkStyle} />
								</ListItemIcon>
								Fgh
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</nav>
		</Box>
	);
}
