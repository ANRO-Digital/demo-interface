import React, {useEffect, useState} from 'react';
import LoginPage from "../../pages/LoginPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../pages/Dashboard";
import {Navigate, Route, Routes} from "react-router-dom";

const AppRouter = () => {

    const [auth, setAuth] = useState(false)
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    useEffect(() => {
        isAuthenticated()
        if(isAuthenticated()) {
            setAuth(true)
        }
        console.log('auuuuuuuuuu ' + auth)

    }, [localStorage.getItem('token')]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute isAuthenticated={auth}>
                        <Dashboard/>
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/login" replace/>}/>

        </Routes>
    );
};

export default AppRouter;