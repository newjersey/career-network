import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import ResourceList from './ResourceList';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2, 0),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    maxWidth: 40,
  },
  elaborationDivider: {
    margin: theme.spacing(4, 0, 3),
  },
}));

export default function Action(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { action, resources, elaborationResources } = props;

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={handleExpandClick}
        aria-expanded={expanded}
      >
        <CardHeader
          avatar={(
            <img
              alt=""
              className={classes.avatar}
              src={`https://static.thenounproject.com/png/${action.fields['Icon ID']}-84.png`}
            />
          )}
          title={(
            <Typography variant="h5" component="h3">
              {action.fields.Name}
            </Typography>
          )}
        // subheader="100 points"
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {action.fields.Why}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ResourceList resources={resources} title={action.fields.How} />

          {elaborationResources && (
            <React.Fragment>
              <Divider variant="fullWidth" className={classes.elaborationDivider} />
              <ResourceList resources={elaborationResources} title={action.fields.Elaboration} />
            </React.Fragment>
          )}
        </CardContent>
      </Collapse>

      <Divider />

      <CardActions disableSpacing>
        <Button size="small" color="primary">
          Done
        </Button>
        <Button size="small" color="primary">
          Snooze
        </Button>
        <Button size="small" color="primary">
          Skip
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

Action.propTypes = {
  action: AirtablePropTypes.action.isRequired,
  resources: AirtablePropTypes.resources.isRequired,
  elaborationResources: AirtablePropTypes.resources,
};

Action.defaultProps = {
  elaborationResources: null,
};
