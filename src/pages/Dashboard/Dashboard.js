import React from 'react';
import { createStyles } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';

const useStyles = createStyles((theme) => ({
    container: {},
}));

const Dashboard = () => {
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Dashboard;
