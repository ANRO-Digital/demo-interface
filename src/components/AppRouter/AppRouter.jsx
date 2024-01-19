import React from 'react';
import LoginPage from "../../pages/LoginPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../pages/Dashboard";
import {Navigate, Route, Routes} from "react-router-dom";

const AppRouter = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
                path="/dashboard"
                element={
                //надо передавать isAuthenticated() чтобы вызов был а не сама функция
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Dashboard/>
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/login" replace/>}/>

        </Routes>
    );
};

export default AppRouter;