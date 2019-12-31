import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from './ScaffoldContainer';

const color = '#fff';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#333',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  social: {
    width: '24px',
    fill: '#FFF',
    '&:hover': {
      fill: '#CCC',
    },
    position: 'relative',
    top: 2,
  },
  socialContainer: {
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(9),
    },
  },
  link: {
    color,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const links = [
    {
      name: 'Terms',
      href: '/terms-of-service',
    },
    {
      name: 'Privacy',
      href: '/privacy-policy',
    },
  ];
  const socialIcons = [
    {
      name: 'GitHub',
      href: 'https://github.com/newjersey/career-network/',
      data:
        'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z',
    },
  ];

  const svg = pathData => (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={classes.social}
    >
      <path d={pathData} />
    </svg>
  );

  const social = (
    <>
      {socialIcons.map(icon => (
        <Grid item key={icon.name}>
          <Link href={icon.href} aria-label={icon.name}>
            {svg(icon.data)}
          </Link>
        </Grid>
      ))}
    </>
  );

  const copyright = (
    <>
      <Grid container spacing={2}>
        {links.map(link => (
          <Grid item key={link.href}>
            <Typography variant="body2">
              <NextLink href={link.href}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={classes.link}>{link.name}</a>
              </NextLink>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <footer className={classes.root}>
      <ScaffoldContainer>
        <Grid container alignItems="center" direction="row" justify="space-between">
          <Grid item xs>
            {copyright}
          </Grid>
          <Grid item xs="auto" className={classes.socialContainer}>
            {social}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </footer>
  );
}

export default Footer;
