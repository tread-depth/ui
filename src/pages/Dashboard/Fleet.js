import React, { useEffect } from 'react';
import { createStyles, Title, Box, Button, Breadcrumbs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTruck } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../../components/Breadcrumb';
import { useFleet } from '../../contexts/fleet';

const useStyles = createStyles((theme) => ({
    container: {},
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    truck: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${theme.colors.gray[6]}`,
        borderRadius: 4,
    },
    icon: {
        color: theme.colors.gray[6],
        marginLeft: theme.spacing.sm,
    },
}));

const Fleet = () => {
    const { classes } = useStyles();
    const { fleet, getFleet } = useFleet();
    const { fleetId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getFleet(fleetId);
    }, []);

    const handleCreateClick = () => {
        navigate(`/dashboard/fleet/${fleetId}/truck/create`);
    };

    return (
        <Box className={classes.container} m="lg">
            <Breadcrumbs>
                <Breadcrumb to={-1} label="Back" />
            </Breadcrumbs>

            <Box my="md" className={classes.header}>
                <Title>{fleet.name}</Title>
                <Button ml="auto" onClick={handleCreateClick}>
                    Create Truck
                </Button>
            </Box>

            {fleet?.trucks?.length > 0 &&
                fleet?.trucks.map((truck, idx) => (
                    <Box key={idx} className={classes.truck} mb="sm" p="sm">
                        {truck.name}
                    </Box>
                ))}
        </Box>
    );
};

export default Fleet;
