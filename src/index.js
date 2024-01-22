import React from 'react';
import ReactDOM from 'react-dom/client';
import {Notifications} from "@mantine/notifications";
import './index.css';
import App from './App';
import {MantineProvider} from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider>
            <Notifications/>
            <App/>
        </MantineProvider>
    </React.StrictMode>
);
