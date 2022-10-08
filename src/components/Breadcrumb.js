import React from 'react';
import { createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    breadcrumb: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.gray[6],

        '&:active': {
            color: theme.colors.blue,
        },
    },
}));

const Breadcrumb = (props) => {
    const { classes } = useStyles();
    console.log(props);

    return (
        <Link className={classes.breadcrumb} to={props.to}>
            {props.label}
        </Link>
    );
};

export default Breadcrumb;
