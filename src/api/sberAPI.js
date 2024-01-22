import {$authHost} from "./index";

export const fetchInit = async () => {
    try {
        const response = await $authHost.get('/init');
        if (response.data) {
            window.location.href = response.data.authorizationUrl;
        }
    } catch (error) {
        console.error('An error occurred while fetching the init page', error);
    }
}

