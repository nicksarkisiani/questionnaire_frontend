import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router";
import {router} from "./routes";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import "./locale/i18n.ts"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
