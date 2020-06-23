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
    display: 'flex',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(10, 12),
    borderStyle: 'solid',
    borderWidth: `1px 1px 1px 4px`,
    borderRadius: theme.spacing(0, 1, 1, 0),
    borderColor: theme.palette.grey['200'],
    borderLeftColor: theme.palette.navy.primary,
    width: '100%',
  },
  next: {
    borderWidth: '1px',
    borderColor: theme.palette.navy.primary,
    backgroundColor: 'white',
  },
  icon: {
    height: 48,
    minWidth: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    backgroundColor: theme.palette.navy['200'],
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
  },
}));

function Callout({ content, variant, ...restProps }) {
  const classes = useStyles();

  const calloutIcon = () => {
    switch (variant) {
      case 'pro-tip':
        return <InfoOutlined />;
      case 'quote':
        return <FormatQuote />;
      case 'next':
        return <ForwardIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx(classes.root, variant === 'next' && classes.next)}>
      <div className={classes.icon}>{calloutIcon()}</div>
      <Typography variant="body1" {...restProps}>
        {content}
      </Typography>
    </div>
  );
}

Callout.propTypes = {
  content: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['pro-tip', 'quote', 'next']).isRequired,
};

Callout.displayName = 'Callout';

export default Callout;
