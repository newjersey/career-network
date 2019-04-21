import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ScaffoldContainer from '../ScaffoldContainer';

const styles = theme => ({
  root: {
    backgroundColor: '#FFF',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing.unit * 6,
      paddingBottom: theme.spacing.unit * 6,
    },
  },
  alt: {
    background: 'linear-gradient(93.9deg, #F3F6FB 12.17%, #FEFEFE 97.11%)',
  },
});

function Section(props) {
  const { classes } = props;

  return (
    <section className={`${classes.root} ${props.alt ? classes.alt : classes.root}`}>
      <ScaffoldContainer>
        {props.children}
      </ScaffoldContainer>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  alt: PropTypes.bool,
};

Section.defaultProps = {
  alt: false,
};

export default withStyles(styles)(Section);
