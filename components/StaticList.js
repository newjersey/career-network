import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

function StaticList(props) {
  const { children, title, nesting } = props;
  const classes = useStyles();
  const titleProps = {
    variant: `h${nesting + 4}`,
    component: `h${nesting + 2}`,
  };

  return (
    <div className={classes.root}>
      <Typography {...titleProps}>{title}</Typography>
      {children &&
        <ul>
          {children.map((node, i) =>
            <li key={i}>
              <Typography>
                {node}
              </Typography>
            </li>
          )}
        </ul>
      }
    </div>
  );
}

StaticList.propTypes = {
  chldren: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  nesting: PropTypes.number,
};

StaticList.defaultProps = {
  nesting: 0,
}

export default StaticList;
