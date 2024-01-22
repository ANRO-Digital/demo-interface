import './App.css';
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
