import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../app/slices/paginationSlice";
import theme from "../../theme";

export default function PaginationRow() {
	const dispatch = useDispatch();
	const paginationPage = useSelector((state) =>
		(state.market.data.length / state.pagination.perPage).toFixed()
	);

	const selectedTheme = useSelector((state) => state.theme.selected);
	return (
		<Stack
			id="paginationDiv"
			spacing={2}
			sx={{
				padding: "2vh",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme[selectedTheme].bg1,
			}}
		>
			<Pagination
				id="pagination"
				count={paginationPage}
				onChange={(e, page) => dispatch(setPage(page))}
				color="primary"
			/>
		</Stack>
	);
}
