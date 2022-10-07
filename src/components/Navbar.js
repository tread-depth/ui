import React, { useState } from 'react';
import { createStyles, Button, Image, Drawer } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/logo.svg';
import { useUser } from '../contexts/user';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.lg,
        background: 'white',
        borderBottom: `2px solid ${theme.colors.gray[9]}`,
    },
    menu: {
        height: 24,
    },
    drawer: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const Navbar = () => {
    const { classes } = useStyles();
    const { user, logout } = useUser();
    const [opened, setOpened] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleToggleMenu = () => setOpened(!opened);

    return (
        <nav className={classes.container}>
            <Image src={logo} />

            <FontAwesomeIcon
                className={classes.menu}
                icon={faBars}
                onClick={handleToggleMenu}
            />

            <Drawer
                className={classes.drawer}
                opened={opened}
                onClose={handleToggleMenu}
                position="right"
                size="sm"
                padding="lg"
            >
                {user?.email}
                <Button onClick={handleLogout}>Logout</Button>
            </Drawer>
        </nav>
    );
};
export default Navbar;
