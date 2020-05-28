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
    padding: theme.spacing(0.8),
    fontSize: '30px',
  },
  card: {
    padding: theme.spacing(4, 2),
    height: theme.spacing(37),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  button: {
    border: `1px solid ${theme.palette.primary.light}`,
    position: 'absolute',
    bottom: theme.spacing(3),
    width: '85%',
  },
}));

function ResourceCard({ value, name, title, description, link }) {
  const classes = useStyles();

  const handleClick = () => {
    window.Intercom('trackEvent', `covid-${title}-button-clicked'`);
  };

  const getIcon = () => {
    if (value === 'information-hub') {
      return <FlagIcon fontSize="inherit" />;
    }
    if (value === 'work-nj') {
      return <HighlightIcon fontSize="inherit" />;
    }
    return <WorkIcon fontSize="inherit" />;
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
            visit {name}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

ResourceCard.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

ResourceCard.defaultProps = {
  value: '',
  name: '',
  title: '',
  description: '',
  link: '',
};

export default ResourceCard;
