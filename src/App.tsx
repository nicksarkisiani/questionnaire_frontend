import Header from "./components/Header/Header.tsx";
import {useEffect} from "react";
import {useActions} from "./hooks/useActions.ts";
import {Outlet} from "react-router";
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import {useTypedSelector} from "./hooks/useTypedSelector.ts";

function App() {

    const {theme} = useTypedSelector(state => state.theme);
    const {setTheme, setLocale, verify} = useActions()

    useEffect(() => {
        setTheme()
    }, [setTheme]);

    useEffect(() => {
        setLocale()
    }, [setLocale])

    useEffect(() => {
        verify()
    }, [verify]);

  return (
      <div>
          <link
              rel="stylesheet"
              href={`https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/${theme === "dark" ? 'darkly' : 'cosmo'}/bootstrap.min.css`}
              id="themeStylesheet"
          />
          <Header/>
          <Outlet/>

      </div>
  )
}

export default App
