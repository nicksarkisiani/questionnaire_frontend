import {combineReducers} from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice.ts";
import localeReducer from "./locale/locale.slice.ts";

export const rootReducer = combineReducers({
    theme: themeReducer,
    locale: localeReducer
})

export type RootState = ReturnType<typeof rootReducer>