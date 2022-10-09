import React, { useEffect } from 'react';
import { createStyles, Title, Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

import { useFleet } from '../../contexts/fleet';

const useStyles = createStyles((theme) => ({
    container: {},
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    fleet: {
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

const Fleet = (props) => {
    const { classes } = useStyles();
    const { fleet } = props;
    const navigate = useNavigate();

    const handleFleetClick = () => {
        navigate(`/dashboard/fleet/${fleet.id}`);
    };

    return (
        <Box
            key={fleet.id}
            className={classes.fleet}
            mb="sm"
            p="sm"
            onClick={handleFleetClick}
        >
            {fleet.name}
            {/* <Box ml="auto">
                10
                <FontAwesomeIcon className={classes.icon} icon={faTruck} />
            </Box> */}
        </Box>
    );
};

const Fleets = () => {
    const { classes } = useStyles();
    const { getFleets, fleets } = useFleet();
    const navigate = useNavigate();

    useEffect(() => {
        getFleets();
    }, []);

    const handleCreateClick = () => {
        navigate('/dashboard/fleet/create');
    };

    return (
        <Box className={classes.container} m="lg">
            <Box mb="md" className={classes.header}>
                <Title>Fleets</Title>
                <Button ml="auto" onClick={handleCreateClick}>
                    Create Fleet
                </Button>
            </Box>

            {fleets.length > 0 &&
                fleets.map((fleet) => <Fleet fleet={fleet} />)}
        </Box>
    );
};

export default Fleets;
