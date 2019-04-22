import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
});

function WhyItem(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={props.imgPath}
        title={props.title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle2" component="h3">
          {props.title}
        </Typography>
        <Typography>
          {props.body}
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

export default withStyles(styles)(WhyItem);
