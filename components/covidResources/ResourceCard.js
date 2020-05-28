import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import HighlightIcon from '@material-ui/icons/Highlight';
import WorkIcon from '@material-ui/icons/Work';
import PropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
  },
  iconContainer: {
    position: 'absolute',
    top: theme.spacing(-3),
    left: theme.spacing(3.3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.light,
    border: `3px solid ${theme.palette.primary.light}`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
  },
  card: {
    padding: theme.spacing(4, 2, 2),
    height: theme.spacing(35),
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  button: {
    border: `1px solid ${theme.palette.primary.light}`,
    marginTop: theme.spacing(3),
  },
}));

function ResourceCard({ value, title, description, link }) {
  const classes = useStyles();

  const handleClick = () => {
    window.Intercom('trackEvent', `covid-${title}-button-clicked'`);
  };

  const getIcon = () => {
    if (value === 'information-hub') {
      return <FlagIcon fontSize="large" />;
    }
    if (value === 'work-nj') {
      return <HighlightIcon fontSize="large" />;
    }
    return <WorkIcon fontSize="large" />;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconContainer}>{getIcon()}</div>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <Button
            className={classes.button}
            href={link}
            target="_blank"
            fullWidth
            onClick={handleClick}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

ResourceCard.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

ResourceCard.defaultProps = {
  value: '',
  title: '',
  description: '',
  link: '',
};

export default ResourceCard;
