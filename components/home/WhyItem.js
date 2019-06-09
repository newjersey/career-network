import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: '80%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function WhyItem(props) {
  const { body, imgPath, title } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={imgPath}
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle2" component="h3">
          {title}
        </Typography>
        <Typography>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

WhyItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
};

export default WhyItem;
