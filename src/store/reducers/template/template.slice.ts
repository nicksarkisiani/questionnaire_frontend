import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ITemplate} from "../../../types/templates.ts";
import TemplateService from "../../../features/template/service/TemplateService.ts";

export const getTemplates = createAsyncThunk(
    'template/get-all',
    async () => {
        const response = await TemplateService.getAll()
        return response.data
    },
)

interface ThemeState {
    templates: ITemplate[];
}

const initialState: ThemeState = {
    templates: []
}

export const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
    builder.addCase(getTemplates.fulfilled, (state, action) => {
        state.templates = action.payload
    })
    builder.addCase(getTemplates.rejected, (state) => {
        state.templates = []
    })
}
})

export default templateSlice.reducer