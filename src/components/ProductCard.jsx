import React, {useContext} from 'react';
import {Card, Title, Text, Stack, Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ProductCard = observer(({data}) => {
    const {account} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Card.Section>
                    <Title order={3} style={{textAlign: "center"}}>{data.name}</Title>
                </Card.Section>
                <Text style={{textAlign: "center"}}>Кол-во созданных платежных поручений - {data.paymentOrders}</Text>
                <Text style={{textAlign: "center"}}>Стоимость за единицу рублей - {data.priceForOneItem}</Text>
                <Title order={4} style={{textAlign: "center"}}>Цена: {data.price}</Title>
                <Button onClick={()=> {
                    account.setPackage(data.name, data.price.toString())
                    navigate('/account')
                }}>Приобрести</Button>
            </Stack>
        </Card>
    );
});

export default ProductCard;