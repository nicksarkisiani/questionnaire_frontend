import {combineReducers} from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice.ts";
import localeReducer from "./locale/locale.slice.ts";
import userReducer from "./user/user.slice.ts"

export const rootReducer = combineReducers({
    theme: themeReducer,
    locale: localeReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>