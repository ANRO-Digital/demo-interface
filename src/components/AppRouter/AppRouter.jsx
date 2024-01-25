import React, {useContext} from 'react';
import LoginPage from "../../pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {authRoutes, publicRoutes} from "../../routes/routes";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<LoginPage />} />

        </Routes>
    );
});

export default AppRouter;