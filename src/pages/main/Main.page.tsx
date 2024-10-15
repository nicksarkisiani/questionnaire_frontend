import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import LoginForm from "../../features/auth/components/login/LoginForm.tsx";
import CreateTemplate from "../../features/template/create-template/CreateTemplate.tsx";

const MainPage = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user)

    return (
        <>
            {!isAuthenticated ? <>
                <LoginForm />
            </> : <CreateTemplate />}
        </>
    );
};

export default MainPage;