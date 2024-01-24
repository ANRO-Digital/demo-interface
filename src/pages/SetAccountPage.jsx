import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Paper, Text, Group, Select, List, Stack, Loader} from "@mantine/core";
import data from '../data/activeLinkPageData.json'
import {useNavigate} from "react-router-dom";
import {getCurrentAccounts, recordCurrentAccount} from "../api/accountsAPI";
import {Context} from "../index";

const SetAccountPage = () => {
    const {account} = useContext(Context)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [accounts, setAccounts] = useState([])
    const packages = data.map(plan => ({value: plan.price.toString(), label: plan.name}))
    const [selectedNumber, setSelectedNumber] = useState('');

    const [packageName, setPackageName] = useState({
        packageType: account.package.packagePrice.toString(),
        label: account.package.packageName
    })

    useEffect(() => {
        getCurrentAccounts().then(accs => {
            setAccounts(accs)
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        if(account.package.packagePrice.length > 0 && account.package.packageName.length > 0){
            setPackageName({
                packageType: packageName.packageType,
                label: packages.filter(p => p.value.toString() === packageName.packageType)[0].label
            })
        }
    }, [packageName]);

    if(loading && !Object.values(account.package).every(value => value !== '')) {
        return (
            <Loader color="violet"/>
        )
    }


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
                                value={packageName.packageType}
                                defaultValue={account.package.packagePrice.toString()}
                                onChange={setPackageName}
                        />
                    </Group>
                    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                        <List>
                            {accounts && accounts.map((item, index) => (
                                <Paper key={index} padding="md"
                                       bg={selectedNumber === item.accountNumber ? 'var(--mantine-color-violet-light)' : ''}
                                       style={{
                                           marginBottom: '10px',
                                           display: "flex",
                                           alignItems: "center",
                                           justifyContent: "center"
                                       }}>
                                    <Button w="100%" color="violet" variant="transparent"
                                            onClick={() => setSelectedNumber(item.accountNumber)}>
                                        {item.accountNumber}
                                    </Button>
                                </Paper>
                            ))}
                        </List>
                    </div>
                    <Button variant="outline" color="violet" disabled={!selectedNumber}
                            onClick={() => {
                                recordCurrentAccount(selectedNumber).then(r => console.log(r))
                            }}>
                        Подтвердить выбор счета
                    </Button>

                    <Button color="red" w="15%" onClick={() => navigate('/dashboard')}>Выход</Button>
                </Stack>

            </Card>

        </Container>
    );
};

export default SetAccountPage;
