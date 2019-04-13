import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function ScaffoldContainer(props) {
    const { classes } = props;

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12} lg={10}>
                {props.children}
            </Grid>
        </Grid>
    );
}

ScaffoldContainer.propTypes = {
    children: PropTypes.element.isRequired
};

export default ScaffoldContainer;