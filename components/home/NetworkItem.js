import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function NetworkItem(props) {
  const classes = useStyles();
  const { imgPath, listItems, title } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={imgPath}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>
          <Typography component="ul">
            {listItems.map(text => (
              <li key={text}>{text}</li>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

NetworkItem.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  imgPath: PropTypes.string.isRequired,
};

export default NetworkItem;
