import React, {useState} from 'react';
import {Container, Tabs, Text} from "@mantine/core";
import ActiveLinkPage from "./ActiveLinkPage";
import DropdownPage from "./DropdownPage";

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
                            Счета
                        </Text>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="active">
                    <ActiveLinkPage/>
                </Tabs.Panel>

                <Tabs.Panel value="dropdown">
                    <DropdownPage/>
                </Tabs.Panel>

            </Tabs>
        </Container>
    );
};

export default Dashboard;