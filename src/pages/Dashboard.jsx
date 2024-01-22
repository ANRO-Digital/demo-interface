import React, {useState} from 'react';
import ThemeSwitcher from "../components/ThemeSwitcher";
import {Container, Tabs, Text} from "@mantine/core";
import ActiveLinkPage from "./ActiveLinkPage";
import DropdownPage from "./DropdownPage";
import MakePayment from "./MakePayment";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <Container fluid className="container">
            <Tabs value={activeTab} onChange={setActiveTab} color="violet" radius="md">
                <Tabs.List>
                    <Tabs.Tab value="active">
                        <Text size="20px">
                            Покупка пакета
                        </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="dropdown">
                        <Text size="20px">
                            Канбан
                        </Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="payment">
                        <Text size="20px">
                            Платеж
                        </Text>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="active">
                    <ActiveLinkPage/>
                </Tabs.Panel>

                <Tabs.Panel value="dropdown">
                    <DropdownPage/>
                </Tabs.Panel>

                <Tabs.Panel value="payment">
                    <MakePayment/>
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};

export default Dashboard;