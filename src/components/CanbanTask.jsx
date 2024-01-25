import React, {useState} from 'react';
import {Accordion, Button, Group, Input, NumberInput, Stack, Text} from "@mantine/core";
import {makePayment} from "../api/sberAPI";
import {DateInput, DatesProvider} from '@mantine/dates';
import 'dayjs/locale/ru';

const CanbanTask = ({data, onSave}) => {
    const convertStringToDate = (date) => {
        const dateParts = date.split('.');
        let year = Number(dateParts[2]);
        if (year < 100) {
            year += 2000;
        }
        return new Date(year, Number(dateParts[1]) - 1, Number(dateParts[0]));
    }

    const convertDateToString = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;

    }

    const setDate = (date) => {
        setNewDate(date);
        setEditValues({...editValues, date: convertDateToString(date)})
    }

    const setAmount = (amount) => {
        setNewAmount(amount)
        setEditValues({...editValues, amount: amount.toString()});
    }

    const [editMode, setEditMode] = useState(false);
    const [editValues, setEditValues] = useState(data);

    const [newDate, setNewDate] = useState(convertStringToDate(editValues.date))
    const [newAmount, setNewAmount] = useState(+editValues.amount)

    return (
        <Accordion.Item value={data.id.toString()} key={data.id}>
            <Accordion.Control>
                {data.payeeName}
            </Accordion.Control>
            <Accordion.Panel>
                <Stack>
                    {/*{editMode ? (*/}
                    {/*    Object.entries(editValues).map(([key, value]) => (*/}
                    {/*        <>*/}
                    {/*            <Text size="sm" c="dimmed">{key}</Text>*/}
                    {/*            <Input type="text" value={value} onChange={(e) => {*/}
                    {/*                setEditValues({*/}
                    {/*                    ...editValues,*/}
                    {/*                    [key]: e.target.value*/}
                    {/*                });*/}
                    {/*            }}/>*/}
                    {/*        </>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <>*/}
                    {/*        {Object.entries(data).map(([key, value]) => (*/}
                    {/*            <>*/}
                    {/*                <Text size="sm" c="dimmed">{key}</Text>*/}
                    {/*                {typeof value === 'object' && !Array.isArray(value) ? (*/}
                    {/*                    Object.entries(value).map(([subKey, subValue]) => (*/}
                    {/*                        <>*/}
                    {/*                            <Text size="sm" c="dimmed">{subKey}</Text>*/}
                    {/*                            <Text size="md">{subValue}</Text>*/}
                    {/*                        </>*/}
                    {/*                    ))*/}
                    {/*                ) : (*/}
                    {/*                    <Text size="md">{value}</Text>*/}
                    {/*                )}*/}
                    {/*            </>*/}
                    {/*        ))}*/}
                    {/*    </>*/}
                    {/*)}*/}
                    {editMode ? (
                        <>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">ИНН</Text>
                                <Input type="text" value={editValues.payeeInn} onChange={(e) => {
                                    setEditValues({...editValues, payeeInn: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">БИК</Text>
                                <Input type="text" value={editValues.payeeBankBic} onChange={(e) => {
                                    setEditValues({...editValues, payeeBankBic: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">КПП</Text>
                                <Input type="text" value={editValues.payeeKpp} onChange={(e) => {
                                    setEditValues({...editValues, payeeKpp: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Расчетный счет</Text>
                                <Input type="text" value={editValues.payeeAccount} onChange={(e) => {
                                    setEditValues({...editValues, payeeAccount: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Корреспондентский счет</Text>
                                <Input type="text" value={editValues.payeeBankCorrAccount} onChange={(e) => {
                                    setEditValues({...editValues, payeeBankCorrAccount: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Номер счета</Text>
                                <Input type="text" value={editValues.purpose} onChange={(e) => {
                                    setEditValues({...editValues, purpose: e.target.value});
                                }}/>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Дата</Text>
                                <DatesProvider settings={{locale: 'ru'}}>
                                    <DateInput value={newDate} onChange={
                                        setDate
                                    }/>
                                </DatesProvider>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Сумма</Text>
                                <NumberInput allowNegative={false}
                                             decimalScale={2}
                                             fixedDecimalScale
                                             hideControls
                                             value={newAmount} onChange={
                                    setAmount
                                }/>
                            </Group>
                        </>
                    ) : (
                        <>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">ИНН</Text>
                                <Text size="md">{data.payeeInn}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">БИК</Text>
                                <Text size="md">{data.payeeBankBic}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">КПП</Text>
                                <Text size="md">{data.payeeKpp}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Расчетный счет</Text>
                                <Text size="md">{data.payeeAccount}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Корреспондентский счет</Text>
                                <Text size="md">{data.payeeBankCorrAccount}</Text>
                            </Group>

                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Номер счета</Text>
                                <Text size="md">{data.purpose}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Дата</Text>
                                <Text size="md">{data.date}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Сумма</Text>
                                <Text size="md">{data.amount}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">НДС</Text>
                                <Text size="md">{data.vat.amount}</Text>
                            </Group>
                        </>)}

                    {data.category === 1 &&
                        <>

                            {editMode ? (
                                <Group>
                                    <Button onClick={() => {
                                        setEditMode(!editMode);
                                        setEditValues({...data});
                                    }}>Отменить</Button>
                                    <Button onClick={() => {
                                        onSave(editValues)
                                        setEditMode(false);
                                    }}>Сохранить</Button>
                                </Group>
                            ) : (
                                <Group>
                                    <Button onClick={() => {
                                        setEditMode(!editMode);
                                        setEditValues({...data});
                                    }}>Изменить</Button>
                                    <Button onClick={() => {
                                        // makePayment()
                                    }}>Оплатить</Button>
                                </Group>
                            )}
                        </>
                    }

                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    );
};

export default CanbanTask;