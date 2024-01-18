import React from 'react';
import { Accordion, Grid, Title } from "@mantine/core";
import statuses from "../data/statuses.json";
import data from "../data/dropdownPageData.json";
import CanbanTask from "../components/CanbanTask";

const DropdownPage = () => {
    return (
        <>
            <Grid columns={3} mt="50px" mx="300px" justify="center">
                {statuses.map(item => {
                    const taskCount = data.filter(task => task.category === item.id).length;

                    return (
                        <Grid.Col span={1} key={item.id} className="canbanColumn">
                            <Title order={3} mb="20px">
                                {item.status} ({taskCount})
                            </Title>
                            <Accordion variant="separated" multiple>
                                {data.map(task => (
                                    <>
                                        {task.category === item.id && <CanbanTask data={task} />}
                                    </>
                                ))}
                            </Accordion>
                        </Grid.Col>
                    );
                })}
            </Grid>
        </>
    );
};

export default DropdownPage;
