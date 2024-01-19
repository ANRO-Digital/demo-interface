import {$host} from "./index";

export const authenticateUser = async (username, password) => {
    try {
        const response = await $host.post('/auth/jwt/login', {
            username,
            password,
        });

        const token = response.data.access_token;
        localStorage.setItem('token', token);
        return true;
    } catch (error) {
        console.error('Error on Authentication', error);
        return false;
    }
}
