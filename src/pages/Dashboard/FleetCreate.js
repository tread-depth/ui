import React from 'react';
import {
    createStyles,
    Box,
    TextInput,
    Title,
    Button,
    Breadcrumbs,
} from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

import Breadcrumb from '../../components/Breadcrumb';
import { useFleet } from '../../contexts/fleet';

const useStyles = createStyles((theme) => ({
    container: {},
}));

const FleetCreate = () => {
    const { classes } = useStyles();
    const { createFleet } = useFleet();
    const navigate = useNavigate();

    const schema = Joi.object({
        name: Joi.string().required(),
    });

    const form = useForm({
        initialValues: {
            name: '',
        },

        schema: joiResolver(schema),
    });

    const handleCreate = async (values) => {
        const error = await createFleet(values);

        if (error) {
            form.setErrors({ email: 'Invalid fleet name' });
        } else {
            form.reset();
            navigate('/dashboard');
        }
    };

    return (
        <Box className={classes.container} m="lg">
            <Breadcrumbs>
                <Breadcrumb to="/dashboard" label="Back" />
            </Breadcrumbs>

            <Title order={2} mb="md" mt="md">
                Create Fleet
            </Title>

            <form onSubmit={form.onSubmit(handleCreate)}>
                <TextInput
                    mb="md"
                    label="Name"
                    placeholder="STTC Fleet A"
                    {...form.getInputProps('name')}
                />
                <Button fullWidth mt="md" ml="auto" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default FleetCreate;
