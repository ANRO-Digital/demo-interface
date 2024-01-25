import React, {useEffect, useState} from 'react';
import {Accordion, Grid, Title, useMantineTheme, useMantineColorScheme, Button, FileButton, Stack} from "@mantine/core";
import statuses from "../data/statuses.json";
import data from "../data/dropdownPageData.json";
import CanbanTask from "../components/CanbanTask";
import {v4 as uuidv4} from 'uuid';
import {recognizeAccountFile} from "../api/accountsAPI";
import {saveAs} from 'file-saver';
import SetAccountPage from "./SetAccountPage";

const DropdownPage = () => {
    const {colorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();
    const [backgroundColors, setBackgroundColors] = useState({
        darker: theme.colors.gray[1],
        item: theme.colors.gray[0],
    });
    const [file, setFile] = useState(null);


    useEffect(() => {
        const darkerBackground = colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1];
        const itemBackground = colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];
        setBackgroundColors({darker: darkerBackground, item: itemBackground});
    }, [colorScheme, theme.colors.dark, theme.colors.gray]);

    const loadFile = async () => {
        const config = {
            headers: {
                'Content-Type': `multipart/form-data;`,
                'elementId': `${uuidv4()}`,
            },
        };
        const formData = new FormData();
        try {
            formData.append('file', file)
            console.log(formData)

            const rec = await recognizeAccountFile(formData, config)
            if (rec) {
                const recognition = {
                    id: uuidv4(),
                    category: 1,
                    amount: rec.amount.split('\\')[0],
                    ...rec,
                }

                appendDataToFile(recognition, data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const appendDataToFile = (jsonData, filename) => {
        const newData = JSON.stringify([...filename, jsonData]);
        const blob = new Blob([newData], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "dropdownPageData.json");
    }

    const handleSave = (updatedData) => {
        const updatedIndex = data.findIndex(item => item.id === updatedData.id);
        const newData = [...data];
        newData[updatedIndex] = updatedData;

        const newDataStr = JSON.stringify(newData);
        const blob = new Blob([newDataStr], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "dropdownPageData.json");
    }

    return (
        <>
            <Stack mt={20} gap="xl" w={250}>
                <FileButton onChange={setFile} accept="application/pdf">
                    {(props) => <Button {...props}>Загрузка демо PDF</Button>}
                </FileButton>

                <Button onClick={loadFile}>Отправить на распознавание</Button>
            </Stack>
            <Grid columns={3} mt="50px">
                <Grid.Col span={1}>
                    <SetAccountPage/>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Grid columns={3} justify="center" align="flex-start" gutter="xl">
                        {statuses.map(item => {
                            const taskCount = data.filter(task => task.category === item.id).length;

                            return (
                                <Grid.Col span={1} key={item.id}>
                                    <Grid columns={1} miw="30%">
                                        <Grid.Col span={1} key={item.id} className="canbanColumn"
                                                  style={{backgroundColor: backgroundColors.darker}}>
                                            <Title order={3} mb="20px">
                                                {item.status} ({taskCount})
                                            </Title>
                                            <Accordion variant="separated" multiple styles={{
                                                item: {backgroundColor: backgroundColors.item},
                                                itemOpened: {backgroundColor: backgroundColors.item},
                                                content: {backgroundColor: backgroundColors.item},
                                            }}>
                                                {data.map(task => (
                                                    task.category === item.id &&
                                                    <CanbanTask key={task.id} data={task} onSave={handleSave}/>
                                                ))}
                                            </Accordion>
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default DropdownPage;
