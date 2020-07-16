import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import FormatQuote from '@material-ui/icons/FormatQuote';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(10, 12),
    borderStyle: 'solid',
    borderWidth: `1px 1px 1px 4px`,
    borderRadius: theme.spacing(0, 1, 1, 0),
    borderColor: theme.palette.grey['200'],
    borderLeftColor: theme.palette.navy.primary,
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(2, 3),
    },
  },
  next: {
    borderWidth: '1px',
    borderColor: theme.palette.navy.primary,
    backgroundColor: 'white',
  },
  content: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  icon: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    minWidth: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    backgroundColor: theme.palette.navy['200'],
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  text: {
    fontSize: 20,
    marginBottom: theme.spacing(3),
    whiteSpace: 'pre-wrap',
    display: 'block',
  },
}));

function Callout({ content, variant, description }) {
  const classes = useStyles();

  const calloutIcon = () => {
    switch (variant) {
      case 'pro-tip':
        return <InfoOutlined />;
      case 'quote':
        return <FormatQuote />;
      case 'next':
        return <ForwardIcon />;
      case 'dashboard':
        return <InfoOutlined />;
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(
        classes.root,
        (variant === 'next' || variant === 'dashboard') && classes.next
      )}
    >
      {description && (
        <Typography variant="h5" className={classes.description}>
          {description}
        </Typography>
      )}
      <div className={classes.content}>
        <div className={classes.icon}>{calloutIcon()}</div>
        <div>
          {React.Children.toArray(
            content
              .split('\n')
              .map(text => (
                <Typography
                  className={classes.text}
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

Callout.propTypes = {
  content: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['pro-tip', 'quote', 'next', 'dashboard']).isRequired,
  description: PropTypes.string,
};

Callout.defaultProps = {
  description: null,
};

Callout.displayName = 'Callout';

export default Callout;
