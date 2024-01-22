import React from 'react';
import {Grid, Title} from "@mantine/core";
import data from '../data/activeLinkPageData.json'
import ProductCard from "../components/ProductCard";
const ActiveLinkPage = () => {
    return (
        <>
            <Title mt="20px">Покупка пакета оплат</Title>
            <Grid columns={4} mt="100px" mx="100px" justify="center">
                {data.map(item => (
                    <Grid.Col span={1} key={item.name}>
                        <ProductCard data={item}/>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
};

export default ActiveLinkPage;