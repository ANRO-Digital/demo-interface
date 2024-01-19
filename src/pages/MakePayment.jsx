import React, {useState} from 'react';
import {Button, Card, Container, Paper, Text, Group, Select, List, Stack} from "@mantine/core";
import data from '../data/activeLinkPageData.json'
import {useNavigate} from "react-router-dom";

const elements = [
    {accountNumber: '12345679'},
    {accountNumber: '12345676'},
    {accountNumber: '12345677'},
    {accountNumber: '12345674'},
    {accountNumber: '12345672'},
];
{/*вместо elements обращение на get /acc*/}

const MakePayment = () => {
    const navigate = useNavigate()

    const packages = data.map(plan => ({value: plan.price.toString(), label: plan.name}))
    const [selectedNumber, setSelectedNumber] = useState('');

    return (
        <Container size="sm">
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="20px">
                <Stack>
                    <Text>Наименование компании</Text>
                    <Text>ИНН</Text>
                    <Group>
                        <Text>Остаток пакетов</Text>
                        <Select placeholder="Выбор пакета"
                                data={packages}
                        />
                    </Group>
                    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                        <List>
                            {elements.map((item, index) => (
                                <Paper key={index} padding="md" bg={selectedNumber === item.accountNumber ? 'var(--mantine-color-violet-light)' : ''} style={{marginBottom: '10px', display: "flex", alignItems: "center", justifyContent: "center"}} >
                                    <Button w="100%" color="violet" variant="transparent" onClick={() => setSelectedNumber(item.accountNumber)}>
                                        {item.accountNumber}
                                    </Button>
                                </Paper>
                            ))}
                        </List>
                    </div>
                    <Button variant="outline" color="violet" disabled={!selectedNumber} onClick={() => alert(`Выбран номер счета: ${selectedNumber}`)}>
                        {/*вместо alert обращение на post /acc*/}
                        Подтвердить выбор счета
                    </Button>

                    <Button color="red" w="15%" onClick={() => navigate('/')}>Выход</Button>
                </Stack>

            </Card>

        </Container>
    );
};

export default MakePayment;
