import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, GridRow, Segment, Message } from 'semantic-ui-react';
import { Logo } from '../../components/AdminLayout/AdminHeader';
import IntroSlider from '../../components/IntroSlider';
import MesssageComponent from '../../components/MessageComponent';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import './recoverPass.css';

import axios from 'axios';
import { URLS } from '../../constant/constant';
import { AUTH_CONFIG } from '../../components/Auth/auth0-variables';

interface State {
  isSuccess: boolean;
  isFailed: boolean;
  email: any;
}
export class RecoverPass extends React.Component<any, State> {
  state = {
    isSuccess: false,
    isFailed: false,
    email: 'dharmeshdev01@gmail.com',
  };

  public email: string = '';
  message = {
    id: 1,
    title: 'Reset Password',
    message: 'Password Reset Successful!',
    description: 'You have successfully reset the password for your Sellgo account.',
    description2: 'Please check your email to continue.',
    to: '/login',
    button_text: 'Ok',
  };

  handleResponse = (response: any) => {
    if (response.status === 200) {
      this.setState({ isSuccess: !this.state.isSuccess });
    }
  };
  setEmail = (event: any) => {
    this.email = event.target.value;
    this.setState({ isFailed: false });
  };

  changePassword = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.email) === false) {
      this.setState({ isFailed: true });
    } else {
      this.setState({ isFailed: false });
      axios
        .post(URLS.CHANGE_PASS_API_URL, {
          client_id: AUTH_CONFIG.clientID,
          email: this.email,
          connection: AUTH_CONFIG.connection,
        })
        .then(response => this.handleResponse(response))
        .catch();
    }
  };

  response = <MesssageComponent message={this.message} />;
  forgetPassForm = (
    <Segment basic={true} clearing={true}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <div className="heading">
              <h1>Reset Password</h1>
              <h5 className="title-description">
                Please enter your email address to make password reset request
              </h5>
            </div>
            <Form>
              <Form.Field>
                <div className="small-light login-fields">
                  <input
                    type="email"
                    onChange={this.setEmail}
                    placeholder="Email Address"
                    className="login-field1"
                  />
                </div>
              </Form.Field>
            </Form>
          </Grid.Column>

          <Grid.Column width={16}>
            <Grid.Row width={16}>
              <Grid.Column className="small-regular textAlignCenter padding20">
                <Link to="/login" style={{ fontSize: 'smaller', color: 'gray' }}>
                  Already have an account?
                </Link>
              </Grid.Column>
            </Grid.Row>
            <GridRow>
              <div className="textAlignCenter">
                <Button
                  style={buttonStyle}
                  onClick={this.changePassword}
                  className="primary-button"
                  content="Reset Password"
                />
              </div>
            </GridRow>
            <GridRow>
              <div className="textAlignCenter padding20">
                <Link to="/sign-up" className="small-bold">
                  Create My Sellgo Account!
                </Link>
              </div>
            </GridRow>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  render() {
    return (
      <Grid verticalAlign="middle" style={{ minHeight: '100vh' }}>
        <Grid.Row>
          <Grid.Column width={10}>
            <IntroSlider />
          </Grid.Column>
          <Grid.Column className="right-pane" width={6}>
            <div className="logo-img">
              <Logo centered={true} size="small" />
            </div>
            {this.state.isFailed && (
              <Message color="red">Please enter valid email address.</Message>
            )}
            {this.state.isSuccess ? this.response : this.forgetPassForm}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
