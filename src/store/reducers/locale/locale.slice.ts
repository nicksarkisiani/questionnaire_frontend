import {createSlice} from "@reduxjs/toolkit";

interface State {
    locale: "ru" | "en"
}

const initialState: State = {
    locale: "en"
}

export const localeSlice = createSlice({
    name: "locale",
    initialState,
    reducers: {
        setLocale: (state) => {
            const locale = localStorage.getItem("locale") as "en" | "ru" | null
            if(!locale){
                localStorage.setItem("locale", "en")
                return
            }
            state.locale = locale
        },
        changeLocale: (state, action) => {
            state.locale = action.payload
            localStorage.setItem("locale", state.locale)
        }
    }
})

export default localeSlice.reducer