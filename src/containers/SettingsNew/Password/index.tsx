import React, { Component } from 'react';
import { Grid, Form, Header } from 'semantic-ui-react';

class Password extends Component {
  state = { passErr: true };

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
              <Form.Input placeholder="Current Password" name="currentPass" type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Input placeholder="New Password" name="newPass" type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Input placeholder="Verify New Password" name="verifyPass" type="password" />
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
