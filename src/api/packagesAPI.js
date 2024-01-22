import {$authHost} from "./index";

async function getPackages() {
    try {
        const response = await $authHost.get('/packages');

        return response.data;
    } catch (error) {
        console.error('Error fetching package info', error);
    }
}
