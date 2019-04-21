import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

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
