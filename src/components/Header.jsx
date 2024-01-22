import React from 'react';
import {Container} from "@mantine/core";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
    return (
        <Container fluid w="100%">
            <ThemeSwitcher/>
        </Container>
    );
};

export default Header;