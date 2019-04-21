import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import NetworkItem from './NetworkItem';
import SectionContent from './SectionContent';

const items = [
  {
    title: 'Jersey City',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Mix and Mingle',
      'Technology',
    ]
  },
  {
    title: 'Trenton',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Convention',
      'Retail',
    ]
  },
  {
    title: 'Hoboken',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Meetup',
      'Accounting Life Sciences',
    ]
  },
  {
    title: 'New Brunswick',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Portfolio Review',
      'Consulting',
    ]
  },
  {
    title: 'Newark',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Meetup',
      'Health Care',
    ]
  },
  {
    title: 'Princeton',
    imgPath: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    listItems: [
      'Webcast',
      'Design',
    ]
  },
];

const styles = theme => ({
  gridItem: {
    '&$withSpecificity': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing.unit * 1.25,
        paddingBottom: theme.spacing.unit * 1.25,
      },
    }
  },
  withSpecificity: { /* NOOP */ },
});

function Network(props) {
  const { classes } = props;
  const gridItemClassName = `${classes.gridItem} ${classes.withSpecificity}`;

  return (
    <React.Fragment>
      <SectionContent title="Build your network">
        Develop a strong and active professional network to keep your skill set
        fresh, stay up-to-date on the latest trends in your occupation/industry,
        and learn about tools and resources that will foster your professional
        development. Networking is a critical component on today’s job search and
        can open doors to new career opportunities. Learn how to build professional
        relationships online and in-person.
      </SectionContent>

      <Grid container spacing={40} >
        {items.map((item, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} className={gridItemClassName}>
            <NetworkItem {...item} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Network);
