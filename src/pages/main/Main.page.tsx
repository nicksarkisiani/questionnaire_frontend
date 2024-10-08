import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import RegistrationForm from "../../features/auth/components/registration/RegistrationForm.tsx";

const MainPage = () => {

    const {isAuthenticated} = useTypedSelector(state => state.user)

    return (
        <>
            {!isAuthenticated && <RegistrationForm />}
        </>
    );
};

export default MainPage;