import React, {useEffect, useState} from 'react';
import {Accordion, Grid, Title, useMantineTheme, useMantineColorScheme} from "@mantine/core";
import statuses from "../data/statuses.json";
import data from "../data/dropdownPageData.json";
import CanbanTask from "../components/CanbanTask";

const DropdownPage = () => {
    const {colorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();
    const [backgroundColors, setBackgroundColors] = useState({
        darker: theme.colors.gray[1],
        item: theme.colors.gray[0],
    });

    useEffect(() => {
        const darkerBackground = colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1];
        const itemBackground = colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];
        setBackgroundColors({darker: darkerBackground, item: itemBackground});
    }, [colorScheme, theme.colors.dark, theme.colors.gray]);

    return (
        <>
            <Grid columns={3} mt="50px" mx="300px" justify="center" align="flex-start" gutter="xl">
                {statuses.map(item => {
                    const taskCount = data.filter(task => task.category === item.id).length;

                    return (
                        <Grid.Col span={1} key={item.id}>
                            <Grid columns={1} miw="30%">
                                <Grid.Col span={1} key={item.id} className="canbanColumn" style={{backgroundColor: backgroundColors.darker}}>
                                    <Title order={3} mb="20px">
                                        {item.status} ({taskCount})
                                    </Title>
                                    <Accordion variant="separated" multiple styles={{
                                        item: {backgroundColor: backgroundColors.item},
                                        itemOpened: {backgroundColor: backgroundColors.item},
                                        content: {backgroundColor: backgroundColors.item},
                                    }}>
                                        {data.map(task => (
                                            task.category === item.id && <CanbanTask key={task.id} data={task}/>
                                        ))}
                                    </Accordion>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    );
                })}
            </Grid>
        </>
    );
};

export default DropdownPage;
