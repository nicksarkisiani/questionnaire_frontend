import {createSlice} from "@reduxjs/toolkit";


interface ThemeState {
    theme: "light" | "dark";
}

const initialState: ThemeState = {
    theme: "light"
}

export const themeReducer = createSlice({
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
        }
    }
})

export default themeReducer.reducer