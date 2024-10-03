import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {themeSlice} from "../store/reducers/theme/theme.slice.ts"

const rootActions = {
    ...themeSlice.actions
};

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(rootActions, dispatch)
};