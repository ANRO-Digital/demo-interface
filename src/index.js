import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {Notifications} from "@mantine/notifications";
import './index.css';
import App from './App';
import {MantineProvider} from "@mantine/core";
import AccountStore from "./store/accountStore";
import UserStore from "./store/userStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            account: new AccountStore()
        }}>
            <MantineProvider>
                <Notifications/>
                <App/>
            </MantineProvider>
        </Context.Provider>
    </React.StrictMode>
);
