import React from 'react';
import {
    createStyles,
    Box,
    TextInput,
    Title,
    Paper,
    Button,
} from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { useNavigate, useLocation } from 'react-router-dom';
import Joi from 'joi';

import { useUser } from '../contexts/user';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '384px',
        marginTop: '256px',
    },
}));

const Login = () => {
    const { login } = useUser();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { classes } = useStyles();

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: ['com', 'net', 'org', 'io'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        schema: joiResolver(schema),
    });

    const handleLogin = async (values) => {
        const error = await login(values);

        if (error) {
            form.setErrors({ email: 'Invalid email or password' });
        } else {
            form.reset();
            navigate(state?.path || '/dashboard');
        }
    };

    return (
        <Box className={classes.container} mx="auto">
            <Paper shadow="md" p="md">
                <Title order={2} mb="lg" align="center">
                    Login
                </Title>
                <form onSubmit={form.onSubmit(handleLogin)}>
                    <TextInput
                        mb="md"
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label="Password"
                        type="password"
                        placeholder="********"
                        {...form.getInputProps('password')}
                    />
                    <Button fullWidth mt="md" ml="auto" type="submit">
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
