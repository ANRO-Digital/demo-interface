import {$host} from "./index";
import {notifications} from "@mantine/notifications";

export const authenticateUser = async (username, password) => {
    try {
        const config = {
            headers: {
                'Content-Type': `x-www-form-urlencoded`,
            },
        };

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await $host.post('/auth/jwt/login', formData, config);

        const token = response.data.access_token;
        localStorage.setItem('token', token);
        return true;
    } catch (err) {
        console.log(err.response.data.details)
        notifications.show({
            title: 'Error',
            message: `Failed to login: invalid credentials`,
            color: 'red',
        });
    }
}
