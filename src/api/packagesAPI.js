import {$authHost} from "./index";

export const getPackages = async () => {
    try {
        const response = await $authHost.get('/packages');

        return response.data.data;
    } catch (error) {
        console.error('Error fetching package info', error);
    }
}
