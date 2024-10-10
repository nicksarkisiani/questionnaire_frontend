import Header from "./components/Header/Header.tsx";
import {useEffect} from "react";
import {useActions} from "./hooks/useActions.ts";
import {Outlet} from "react-router";

function App() {

    const {setTheme, setLocale, verify} = useActions()

    useEffect(() => {
        setTheme()
        setLocale()
        verify()
    }, [setTheme, setLocale, verify])
  return (
   <div>
       <Header />
       <Outlet />

   </div>
  )
}

export default App
