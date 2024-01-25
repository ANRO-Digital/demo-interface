import React, {useState} from 'react';
import {Accordion, Button, Group, Input, Stack, Text} from "@mantine/core";

const CanbanTask = ({data, onSave}) => {
    const formattedDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit'};
        return date.toLocaleString('ru-RU', {...options, ...timeOptions});
    }

    const [editMode, setEditMode] = useState(false);
    const [editValues, setEditValues] = useState(data);


    return (
        <Accordion.Item value={data.id.toString()}>
            {/*нужен ключ для норм рендера массива*/}

            <Accordion.Control>
                {data.payeeName}
            </Accordion.Control>
            <Accordion.Panel>
                <Stack>
                    {editMode ? (
                        Object.entries(editValues).map(([key, value]) => (
                            <>
                                <Text size="sm" c="dimmed">{key}</Text>
                                <Input type="text" value={value} onChange={(e) => {
                                    setEditValues({
                                        ...editValues,
                                        [key]: e.target.value
                                    });
                                }}/>
                            </>
                        ))
                    ) : (
                        <>
                            {Object.entries(data).map(([key, value]) => (
                                <>
                                    <Text size="sm" c="dimmed">{key}</Text>
                                    {typeof value === 'object' && !Array.isArray(value) ? (
                                        Object.entries(value).map(([subKey, subValue]) => (
                                            <>
                                                <Text size="sm" c="dimmed">{subKey}</Text>
                                                <Text size="md">{subValue}</Text>
                                            </>
                                        ))
                                    ) : (
                                        <Text size="md">{value}</Text>
                                    )}
                                </>
                            ))}
                        </>
                    )}
                    <Group>
                        <Button onClick={() => {
                            setEditMode(!editMode);
                            setEditValues({...data});
                        }}>Изменить</Button>
                        {editMode && (
                            <Button onClick={() => {
                                onSave(editValues)
                                setEditMode(false);
                            }}>Сохранить</Button>
                        )}
                    </Group>



                    {/*<Text size="sm" c="dimmed">Сумма</Text>*/}
                    {/*<Text size="md">{data.price}</Text>*/}

                    {/*<Text size="sm" c="dimmed">Ссылка на платежное поручение</Text>*/}
                    {/*<Text size="md">{data.link}</Text>*/}


                    {/*<Text size="sm" c="dimmed">Дата создания</Text>*/}
                    {/*<Text size="md">{formattedDate(data.createdAt)}</Text>*/}

                    {/*<Text size="sm" c="dimmed">Дата изменения</Text>*/}
                    {/*<Text size="md">{formattedDate(data.updatedAt)}</Text>*/}

                    {}
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    );
};

export default CanbanTask;