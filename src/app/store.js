import { configureStore } from "@reduxjs/toolkit";
import marketSlice from "./slices/marketSlice";
import detailSlice from "./slices/detailSlice";
import uiSlice from "./slices/uiSlice";
import currencySlice from "./slices/currencySlice";
import filterSlice from "./slices/filterSlice";
import paginationSlice from "./slices/paginationSlice";
import timeStampSlice from "./slices/timeStampSlice";

export const store = configureStore({
	reducer: {
		market: marketSlice,
		theme: uiSlice,
		filter: filterSlice,
		pagination: paginationSlice,
		detail: detailSlice,
		currency: currencySlice,
		timeStamp: timeStampSlice,
	},
});
