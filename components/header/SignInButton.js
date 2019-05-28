import Button from '@material-ui/core/Button';
import React from 'react';

import SignInDialog from './SignInDialog';

class SignInButton extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClick = () => {
    this.setState({ dialogOpen: true });
  };

  handleCancel = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { dialogOpen } = this.state;

    return (
      <React.Fragment>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Sign in
        </Button>
        <SignInDialog open={dialogOpen} onCancel={this.handleCancel} />
      </React.Fragment>
    );
  }
}

export default SignInButton;
