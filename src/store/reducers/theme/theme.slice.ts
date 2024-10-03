import {createSlice} from "@reduxjs/toolkit";


interface ThemeState {
    theme: "light" | "dark";
}

const initialState: ThemeState = {
    theme: "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state) => {
            const theme = localStorage.getItem("theme") as "light" | "dark" | null
            if(theme) {
                state.theme = theme
            }
        },
        changeTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem("theme", state.theme)
        }
    }
})

export default themeSlice.reducer