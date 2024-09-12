import { configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./slices/brandsSlice";
import contractsReducer from "./slices/contractsSlice";

export const store = configureStore({
  reducer: {
    brands: brandsReducer,
    contracts: contractsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
