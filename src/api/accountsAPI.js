import {$authHost} from "./index";

export const getCurrentAccounts = async () => {
    try {
        const response = await $authHost.get('/acc');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching accounts', error);
    }
}

export const recordCurrentAccount = async (accountNumber) => {
    try {
        const response = await $authHost.post('/acc', {accountNumber});
        return response.data.data;
    } catch (error) {
        console.error('Error fetching accounts', error);
    }
}