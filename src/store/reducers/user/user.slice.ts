import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../../features/auth/service/AuthService.ts";

export const verify = createAsyncThunk(
    'user/verify',
    async () => {
        const response = await AuthService.verify()
        return response.data
    },
)

const initialState = {
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(verify.fulfilled, (state) => {
            state.isAuthenticated = true
        })
        builder.addCase(verify.rejected, (state) => {
            state.isAuthenticated = false
        })
    }
})

export default userSlice.reducer