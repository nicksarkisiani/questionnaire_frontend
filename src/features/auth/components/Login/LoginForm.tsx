import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../service/AuthService.ts";
import {loginSchema} from "../../schema/auth.schema.ts";
import {useActions} from "../../../../hooks/useActions.ts";
import {auth} from "../../helpers/auth.ts";
import AuthForm from "../AuthForm/AuthForm.tsx";

interface FormValues {
    email: string;
    password: string;
}

function LoginForm() {

    const {verify} = useActions()

    const login = async (email: string, password: string) => {
        const isAuth = await auth(() => AuthService.login(email, password))
        if(isAuth) verify()
    }

    const onSubmit = async (values: FormValues) => {
        await login(values.email, values.password);
    }

    return (
        <AuthForm initialValues={{
            email: "",
            password: ""
        }} validationSchema={loginSchema} onSubmit={onSubmit} title={"login"} isLogin={true}/>
    );
}

export default LoginForm;