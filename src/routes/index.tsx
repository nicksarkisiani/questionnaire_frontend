import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx";
import MainPage from "../pages/main/Main.page.tsx";
import RegistrationForm from "../features/auth/components/Registration/RegistrationForm.tsx";
import TemplatePage from "../pages/templates/Template.page.tsx";
import ErrorElement from "./ErrorElement.tsx";
import {templateLoader} from "../features/template/loader/template.ts";

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
                path: "/Registration",
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