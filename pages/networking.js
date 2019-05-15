import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticList from '../components/StaticList';
import { Link } from '@material-ui/core';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
  },
});

class Networking extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h3" component="h1">Relationship-Building Resources</Typography>

          <Typography variant="body1">
            Developing new connections and deepening your existing relationships are KEY to your job search.
          </Typography>
          <Typography variant="body1">
            Not only are you more likely to find out about new opportunities, people, and companies when you broaden your network, many organizations are explicitly looking for you to bring new connections to their business needs.
          </Typography>
          <Typography variant="body1">
            Although it’s something many job seekers hate, relationship building and meeting new people are the two things you need to be spending the most time on in your job search.
          </Typography>

          <StaticList title="Relationship-Building Goals in Job Search">
            <React.Fragment>
              <strong>Relationship-Building Goals in Job Search</strong> –
              People you don’t know well. Research shows that new connections are the ones most likely to bring you new opportunities.
            </React.Fragment>
            <React.Fragment>
              <strong>Deepen your existing connections</strong> –
              Make efforts to do things for people in your existing network that bring value to them. Sharing resources, offering to connect them to someone in your network, and helping them accomplish a goal can help you build positive relationships with the people you know.
            </React.Fragment>
          </StaticList>

          <StaticList title="Resources to Help" />

          <StaticList title="Webinars (from NSCN)" nesting={1}>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
          </StaticList>

          <StaticList title="Webinars (from NSCN)" nesting={1}>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
            <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
          </StaticList>

        </ScaffoldContainer>
      </div>
    );
  }
}

Networking.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Networking);
