import {combineReducers} from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice.ts";


export const rootReducer = combineReducers({
    theme: themeReducer,
})

export type RootState = ReturnType<typeof rootReducer>