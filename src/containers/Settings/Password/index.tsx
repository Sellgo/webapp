import React, { Component } from 'react';
import { Grid, Form, Header, Icon } from 'semantic-ui-react';

class Password extends Component {
  state = { passErr: false, showHidden: false };

  handleSubmitPass = () => {
    this.setState({ ...this.state, passErr: true });
  };

  handleShowHidden = () => {
    this.setState({ ...this.state, showHidden: !this.state.showHidden });
  };

  render() {
    return (
      <>
        <Grid.Column width={16}>
          <Form>
            <Header.Subheader>
              Make sure your new password is alphanumeric, at least 8 characters long, and does not
              contain any personal information.
            </Header.Subheader>
            <Form.Group>
              <Form.Input
                placeholder="Current Password"
                name="currentPass"
                type="password"
                icon={<Icon link name={'eye slash'} />}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                placeholder="New Password"
                name="newPass"
                type="password"
                icon={<Icon link name={'eye slash'} />}
              />
            </Form.Group>
            <Form.Group className="verify-pass">
              <Form.Input
                placeholder="Verify New Password"
                name="verifyPass"
                type="password"
                icon={<Icon link name={'eye slash'} />}
              />
              <Form.Button className="primary-btn" content="Change Password" />
            </Form.Group>
            <Header.Subheader className={this.state.passErr ? 'pass-err' : ''}>
              Password does not match.
            </Header.Subheader>
          </Form>
        </Grid.Column>
      </>
    );
  }
}

export default Password;
