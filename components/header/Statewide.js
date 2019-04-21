import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import NewJerseySeal from '../NewJerseySeal';
import ScaffoldContainer from '../ScaffoldContainer';

const color = '#fff';
const personWeight = 600;
const styles = theme => ({
  brand: {
    position: 'relative',
    left: '-6px',
  },
  logo: {
    position: 'relative',
    top: '1px',
    width: '40px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    color,
  },
  list: {
    margin: 0,
    listStyle: 'none',
  },
  listItemTypography: {
    display: 'inline'
  },
  personLink: {
    fontWeight: personWeight,
    color
  },
  link: {
    color
  },
  separator: {
    margin: 'auto 0.25em',
    fontWeight: personWeight,
    color
  },
  listItem: {
    display: 'inline',
    paddingRight: '0.5em',
    paddingLeft: '0.5em',
    borderRight: '1px solid ' + color,
    '&:last-of-type': {
      borderRight: 0,
      paddingRight: 0,
    }
  },
});

const links = {
  'NJ.gov': 'https://nj.gov/',
  'Services': 'https://nj.gov/nj/gov/njgov/alphaserv.html',
  'Agencies': 'https://nj.gov/nj/gov/deptserv/',
  'FAQs': 'https://nj.gov/faqs/'
};

function Statewide(props) {
  const { classes } = props;

  return (
    <ScaffoldContainer padding={false}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item className={classes.brand}>
          <Grid container alignItems="center">
            <Grid item>
              <NewJerseySeal className={classes.logo} color={color} />
            </Grid>
            <Grid item>
              <Typography variant="h1" className={classes.title}>Official Site of the State of New Jersey</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown implementation="css">
          <Grid item>
            <Grid container direction="column" justify="space-evenly" alignItems="flex-end">
              <Hidden smDown implementation="css">
                <Grid item>
                  <Typography>
                    <Link underline="hover" className={classes.personLink} href="https://nj.gov/governor/">Governor Phil Murphy</Link>
                    <span className={classes.separator}>•</span>
                    <Link underline="hover" className={classes.personLink} href="https://nj.gov/governor/admin/lt/">Lt. Governor Sheila Oliver</Link>
                  </Typography>
                </Grid>
              </Hidden>
              <Grid item>
                <nav>
                  <ul className={classes.list}>
                    {Object.keys(links).map(key => (
                      <li key={key} className={classes.listItem}>
                        <Typography className={classes.listItemTypography}>
                          <Link underline="hover" href={links[key]} className={classes.link}>
                            {key}
                          </Link>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </ScaffoldContainer>
  );
}

Statewide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statewide);
