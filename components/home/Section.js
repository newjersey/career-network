/* eslint-disable operator-linebreak */
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import ScaffoldContainer from '../ScaffoldContainer';

const backgroundColor = 'white';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  'no-pad-top': {
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
    },
  },
  'no-pad-bottom': {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  alt1: {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="698" height="49" viewBox="0 0 698 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 26C144.764 -19.7248 262.466 5.19049 364 26C465.534 46.8095 546.906 62.0788 698 26V49H0V26Z" fill="${backgroundColor}" /></svg>'),
       linear-gradient(90deg, #f2f6fc 20%, #fefefe 100%)`,
    backgroundPosition: `center bottom, 
       center center`,
  },
  alt2: {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="698" height="50" viewBox="0 0 698 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 28C144.764 -17.7248 262.466 7.19049 364 28C465.534 48.8095 546.906 64.0788 698 28V0.5H0V28Z" fill="${backgroundColor}"/></svg>'),
       url('data:image/svg+xml;utf8,<svg width="698" height="49" viewBox="0 0 698 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 26C144.764 -19.7248 262.466 5.19049 364 26C465.534 46.8095 546.906 62.0788 698 26V49H0V26Z" fill="${backgroundColor}" /></svg>'),
       linear-gradient(90deg, #f8f9fd 20%, #fefefe 100%)`,
    backgroundPosition: `center -1px, 
       center bottom, 
       center center`,
  },
  alt3: {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="1480" height="324" viewBox="0 0 1480 324" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5V323.5C262.686 152.235 415.889 83.8759 725.5 124C999.155 163.808 1163.63 139.819 1480 0.5H0.5Z" fill="white"/></svg>')
       linear-gradient(90deg, #edf0ff 20%, #fefefe 100%)`,
    backgroundPosition: `center -1px,
       center center`,
  },
  alt4: {
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="1480" height="226" viewBox="0 0 1480 226" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 40.5V226H1206.5C743.152 25.8951 481.458 -54.2645 0.5 40.5Z" fill="white"/></svg>'),
       linear-gradient(90deg, #edf0ff 20%, #fefefe 100%)`,
    backgroundPosition: `center bottom,
       center center`,
  },
}));

function Section(props) {
  const { alt, children, hasOwnPadding } = props;
  const classes = useStyles();
  const className = clsx(
    classes.root,
    alt && classes[`alt${alt}`],
    hasOwnPadding && classes[`no-pad-${hasOwnPadding}`]
  );

  return (
    <section className={className}>
      <ScaffoldContainer>{children}</ScaffoldContainer>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  alt: PropTypes.oneOf([1, 2, 3, 4]),
  hasOwnPadding: PropTypes.oneOf(['top', 'bottom']),
};

Section.defaultProps = {
  alt: undefined,
  hasOwnPadding: undefined,
};

export default Section;
