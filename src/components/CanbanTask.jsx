import React from 'react';
import {Accordion, Group, Stack, Text} from "@mantine/core";

const CanbanTask = ({data}) => {
    const formattedDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString('ru-RU', { ...options, ...timeOptions });
    }

    return (
        <Accordion.Item value={data.id.toString()} key={data.id}>
            <Accordion.Control>
                {data.title}
            </Accordion.Control>
            <Accordion.Panel>
                <Stack>
                    <Text size="sm" c="dimmed">Сумма</Text>
                    <Text size="md">{data.price}</Text>

                    <Text size="sm" c="dimmed">Ссылка на платежное поручение</Text>
                    <Text size="md">{data.link}</Text>


                    <Text size="sm" c="dimmed">Дата создания</Text>
                    <Text size="md">{formattedDate(data.createdAt)}</Text>

                    <Text size="sm" c="dimmed">Дата изменения</Text>
                    <Text size="md">{formattedDate(data.updatedAt)}</Text>
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    );
};

export default CanbanTask;