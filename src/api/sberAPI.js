import {$authHost, amountInterceptor} from "./index";
import {notifications} from "@mantine/notifications";

export const fetchInit = async () => {
    try {
        const response = await $authHost.get('/init');
        if (response.data) {
            window.location.href = response.data.auth_link;
        }
    } catch (error) {
        console.error('An error occurred while fetching the init page', error);
    }
}

export const makePayment = async (payload, config) => {
    try {
        const response = await $authHost.post('/make_payment', payload, config);
        return response.data.transactionId
    } catch (error) {
        console.error('An error occurred while making payment', error);
    }
}

export const packagePayment = async (amount) => {
    try {
        $authHost.interceptors.request.use(config => amountInterceptor(config, amount));
        const response = await $authHost.get('/rbp_balance')
        return response.data;
    } catch (err) {
        notifications.show({
            title: 'Error',
            message: `Failed to rbp balance: invalid credentials`,
            color: 'red',
        });
    }
}

