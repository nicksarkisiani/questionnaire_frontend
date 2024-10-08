import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {themeSlice} from "../store/reducers/theme/theme.slice.ts"
import {localeSlice} from "../store/reducers/locale/locale.slice.ts";
import {verify} from "../store/reducers/user/user.slice.ts"

const rootActions = {
    ...themeSlice.actions,
    ...localeSlice.actions,
    verify
};

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(rootActions, dispatch)
};