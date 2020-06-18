import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../components/ScaffoldContainer';

import Tools from '../components/home/Tools';
import Logos from '../components/home/Logos';
import FeaturedItem from '../components/home/FeaturedItem';
import { featuredItems } from '../components/home/content/FEATURED_CONTENT';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    paddingBottom: 0,
  },
  featureContainer: {
    '& .MuiGrid-container': {
      '&:nth-of-type(2n+3)': {
        flexDirection: 'row-reverse',
      },
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <ScaffoldContainer className={classes.root}>
      <div className={classes.featureContainer}>
        {featuredItems.slice(0, featuredItems.length - 1).map(item => (
          <FeaturedItem
            img={item.img}
            imgType={item.imgType}
            heading={item.heading}
            content={item.content}
            callToAction={item.callToAction}
            link={item.link}
          />
        ))}
      </div>
      <Tools />
      <Logos />
      <div className={classes.featureContainer}>
        {featuredItems.slice(featuredItems.length - 1).map(lastItem => (
          <FeaturedItem
            img={lastItem.img}
            imgType={lastItem.imgType}
            heading={lastItem.heading}
            content={lastItem.content}
            callToAction={lastItem.callToAction}
            link={lastItem.link}
          />
        ))}
      </div>
    </ScaffoldContainer>
  );
}
