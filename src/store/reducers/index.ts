import {combineReducers} from "@reduxjs/toolkit";
import themeReducer from "./theme/theme.slice.ts";
import localeReducer from "./locale/locale.slice.ts";
import userReducer from "./user/user.slice.ts"
import templateReducer from "./template/template.slice.ts"

export const rootReducer = combineReducers({
    theme: themeReducer,
    locale: localeReducer,
    user: userReducer,
    templates: templateReducer
})

export type RootState = ReturnType<typeof rootReducer>