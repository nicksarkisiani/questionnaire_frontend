import {useEffect} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector.ts";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../service/AuthService.ts";
import {registrationSchema} from "../../schema/auth.schema.ts";
import {FormikHelpers} from "formik";
import {useNavigate} from "react-router";
import {useActions} from "../../../../hooks/useActions.ts";
import {auth} from "../../helpers/auth.ts";
import AuthForm from "../AuthForm/AuthForm.tsx";

interface FormValues {
    username?: string;
    email: string;
    password: string;
    repeatPassword?: string;
}

function RegistrationForm() {
    const {verify} = useActions()

    const {isAuthenticated} = useTypedSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const checkPassword = (password: string, repeatPassword: string, setSubmitting: (isSubmitting: boolean) => void, setError: (f: string, m: string | undefined) => void) => {
        if (password !== repeatPassword) {
            setSubmitting(false);
            setError("repeatPassword", "Passwords do not match");
            return false
        }
        return true
    }

    const register = async (email: string, username: string, password: string) => {
        await auth(() => AuthService.registration(email, username, password))
        verify()
    }

    const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        if(values.repeatPassword && values.username){
            const isEqual = checkPassword(values.password, values.repeatPassword, actions.setSubmitting, actions.setFieldError)
            if (!isEqual) {
                return;
            }
            await register(values.email, values.username, values.password);
        }
    }

    return (
        <AuthForm initialValues={{
            email: "",
            username: "",
            password: "",
            repeatPassword: "",
        }} validationSchema={registrationSchema} onSubmit={onSubmit} title={"registration"} isRegistration={true}/>

    );
}

export default RegistrationForm;