import {useForm} from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Group,
    Button,
    Stack, Container,
} from '@mantine/core';
import {authenticateUser} from "../api/loginAPI";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            terms: true,
        },
    });

    const handleLogin = async () => {
        // const isAuthenticated = await authenticateUser(form.values.username, form.values.password);
        // if (isAuthenticated) {
        //     navigate('/dashboard');
        // }

        navigate('/dashboard');
        //тут обращение на /auth/jwt/login
        //пока просто редирект на дашборд потому что нет данных для авторизации
    };

    return (
        <Container radius="md" size="sm" p="xl" {...props}>
            <Text size="lg" fw={500}>
                Авторизация
            </Text>

            <form onSubmit={form.onSubmit(handleLogin)}>
                <Stack>
                    <TextInput
                        label="Имя пользователя"
                        placeholder="Ваше имя"
                        value={form.values.username}
                        onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                        radius="md"
                    />

                    <PasswordInput
                        label="Пароль"
                        placeholder="Ваш пароль"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        radius="md"
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Button type="submit" radius="xl">
                        Войти
                    </Button>
                </Group>
            </form>
        </Container>
    );
}

export default LoginPage;