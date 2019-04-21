import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = theme => ({
  padding: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
});

function ScaffoldContainer(props) {
  const { classes } = props;

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} lg={10} className={props.padding ? classes.padding : null}>
        {props.children}
      </Grid>
    </Grid>
  );
}

ScaffoldContainer.propTypes = {
  children: PropTypes.element.isRequired,
  padding: PropTypes.bool,
};

ScaffoldContainer.defaultProps = {
  padding: true,
};

export default withStyles(styles)(ScaffoldContainer);
