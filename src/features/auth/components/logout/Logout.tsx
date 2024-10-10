import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import AuthService from "../../service/AuthService.ts";
import {CustomAxiosError} from "../../../../types/axios.ts";
import {toast} from "react-toastify";
import {useActions} from "../../../../hooks/useActions.ts";

const Logout = () => {

    const {t} = useTranslation()
    const {verify} = useActions()

    const logout = async () => {
        try {
            await AuthService.logout()
        } catch (e: unknown) {
            const error = e as CustomAxiosError;
            if (error) toast.error(error?.response?.data?.message)
        } finally {
            verify()
        }
    }

    return (
        <Button variant="danger" onClick={logout}>
            {t("Logout")}
        </Button>
    );
};

export default Logout;