import RegistrationForm from "./features/auth/components/RegistrationForm.tsx";
import Header from "./components/Header/Header.tsx";
import {useEffect} from "react";
import {useActions} from "./hooks/useActions.ts";

function App() {

    const {setTheme} = useActions()

    useEffect(() => {
        setTheme()
    }, [setTheme])

  return (
   <div>
       <Header />
       <RegistrationForm />
   </div>
  )
}

export default App
