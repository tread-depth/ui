import React from 'react';
import {
    createStyles,
    Box,
    TextInput,
    NumberInput,
    Title,
    Button,
    Breadcrumbs,
} from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';

import Breadcrumb from '../../components/Breadcrumb';
import { useTruck } from '../../contexts/truck';

const useStyles = createStyles((theme) => ({
    container: {},
}));

const TruckCreate = () => {
    const { classes } = useStyles();
    const { createTruck } = useTruck();
    const { fleetId } = useParams();
    const navigate = useNavigate();

    const schema = Joi.object({
        name: Joi.string().required(),
        mileage: Joi.number().required(),
        axle: Joi.string().allow(''),
        application: Joi.string().allow(''),
    });

    const form = useForm({
        initialValues: {
            name: '',
            mileage: '',
            axle: '',
            application: '',
        },

        schema: joiResolver(schema),
    });

    const handleCreate = async (values) => {
        const error = await createTruck({ fleetId, ...values });

        if (error) {
            form.setErrors({ email: 'Invalid truck name' });
        } else {
            form.reset();
            navigate(-1);
        }
    };

    return (
        <Box className={classes.container} m="lg">
            <Breadcrumbs>
                <Breadcrumb to={-1} label="Back" />
            </Breadcrumbs>

            <Title order={2} mb="md" mt="md">
                Create Truck
            </Title>

            <form onSubmit={form.onSubmit(handleCreate)}>
                <TextInput
                    mb="md"
                    label="Name"
                    placeholder="STTC Truck A"
                    {...form.getInputProps('name')}
                />
                <NumberInput
                    mb="md"
                    label="mileage"
                    placeholder="12350"
                    {...form.getInputProps('mileage')}
                />
                <TextInput
                    mb="md"
                    label="Axle"
                    placeholder="S4.D4"
                    {...form.getInputProps('axle')}
                />
                <TextInput
                    mb="md"
                    label="Application"
                    placeholder="Long Haul"
                    {...form.getInputProps('application')}
                />
                <Button fullWidth mt="md" ml="auto" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default TruckCreate;
