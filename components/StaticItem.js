import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    flexGrow: 1,
  },
};

function MediaCard(props) {
  const { classes, item } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea href={item.fields.URL} target="_blank" className={classes.cardActionArea}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
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

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
