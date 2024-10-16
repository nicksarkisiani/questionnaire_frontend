import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {themeSlice} from "../store/reducers/theme/theme.slice.ts"
import {localeSlice} from "../store/reducers/locale/locale.slice.ts";
import {verify} from "../store/reducers/user/user.slice.ts"
import {getTemplates} from "../store/reducers/template/template.slice.ts";
import {useMemo} from "react";

const rootActions = {
    ...themeSlice.actions,
    ...localeSlice.actions,
    verify,
    getTemplates
};

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};