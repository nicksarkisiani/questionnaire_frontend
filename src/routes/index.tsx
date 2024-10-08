import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx";
import MainPage from "../pages/main/Main.page.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainPage />
            }
        ]
    },
]);