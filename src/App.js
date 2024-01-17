import './App.css';
import {Container, MantineProvider, Tabs, Text} from "@mantine/core";
import {useState} from "react";
import ActiveLinkPage from "./pages/ActiveLinkPage";
import '@mantine/core/styles.css';
import DropdownPage from "./pages/DropdownPage";

function App() {
    const [activeTab, setActiveTab] = useState('');

    return (
        <MantineProvider>
            <Container fluid className="container">
                <Tabs value={activeTab} onChange={setActiveTab} color="violet" radius="md">
                    <Tabs.List>
                        <Tabs.Tab value="active">
                            <Text size="20px">
                                Active Link
                            </Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="dropdown">
                            <Text size="20px">
                                Dropdown
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
        </MantineProvider>

    );
}

export default App;
