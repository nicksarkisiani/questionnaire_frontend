import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx";
import MainPage from "../pages/main/Main.page.tsx";
import RegistrationForm from "../features/auth/components/registration/RegistrationForm.tsx";
import TemplatePage, {templateLoader} from "../pages/templates/Template.page.tsx";
import ErrorElement from "./ErrorElement.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/registration",
                element: <RegistrationForm />
            },
            {
                path: "/templates/:id",
                element: <TemplatePage />,
                loader: templateLoader,
                errorElement: <ErrorElement />,

            }
        ]
    },
]);