import React from 'react';
import { createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    breadcrumb: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.gray[6],
        textDecoration: 'underline',

        '&:active': {
            color: theme.colors.blue,
        },
    },
}));

const Breadcrumb = (props) => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.to);
    };

    return (
        <div className={classes.breadcrumb} onClick={handleClick}>
            {props.label}
        </div>
    );
};

export default Breadcrumb;
