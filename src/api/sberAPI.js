import {$authHost} from "./index";

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
        console.error('An error occurred while fetching the init page', error);
    }
}
