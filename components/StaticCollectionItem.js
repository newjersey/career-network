import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
  cardActionArea: {
    flexGrow: 1,
  },
}));

function StaticCollectionItem(props) {
  const { item } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea href={item.fields.URL} target="_blank" className={classes.cardActionArea}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3" color="primary">
            {item.fields.Name}
          </Typography>
          <Typography component="p">
            {item.fields.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={item.fields.URL} component="a" target="_blank" size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

StaticCollectionItem.propTypes = {
  item: PropTypes.shape({
    fields: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      URL: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StaticCollectionItem;
