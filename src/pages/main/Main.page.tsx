import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import LoginForm from "../../features/auth/components/login/LoginForm.tsx";

const MainPage = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user)

    return (
        <>
            {!isAuthenticated && <>
                <LoginForm />
            </>}
        </>
    );
};

export default MainPage;