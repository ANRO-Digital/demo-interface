import './App.css';
import '@mantine/core/styles.css';
import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import { observer } from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "./index";


const App = observer(() => {
    const {user} = useContext(Context)
    useEffect(() => {
        user.setIsAuth(!!localStorage.getItem('token'))
    }, []);

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
