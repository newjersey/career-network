import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
});

function StaticList(props) {
  const { classes, children, title, nesting } = props;
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
  classes: PropTypes.object.isRequired,
  chldren: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  nesting: PropTypes.number,
};

StaticList.defaultProps = {
  nesting: 0,
}

export default withStyles(styles)(StaticList);
