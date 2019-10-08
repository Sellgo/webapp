import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, GridRow, Segment } from 'semantic-ui-react';
import MesssageComponent from '../../components/MessageComponent';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import { Logo } from '../Dashboard';

interface State {
  isSuccess: boolean;
}

export default class SignUp extends React.Component<any, State> {
  state = {
    isSuccess: false,
  };
  message = {
    id: 1,
    title: 'Account Succesfuly Created',
    message: 'Thank you for registering',
    description: 'You have successfully create new account with Sellgo account.',
    description2: 'Please check your email to verify.',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#0E6FCF',
  };

  loginSignUp = () => {
    const { login } = this.props.auth;
    login().then(() => {
      this.setState({ isSuccess: !this.state.isSuccess });
    });
  };

  handleMessage = () => {
    this.setState({ isSuccess: !this.state.isSuccess });
  };

  response = <MesssageComponent message={this.message} handleMessage={this.handleMessage} />;

  signUpForm = (
    <Segment basic={true} clearing={true}>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center" style={{ padding: 10 }} width={16}>
            <div className="heading">
              <h1>{'Sign up to Sellgo for your FREE trial!'}</h1>
            </div>
          </Grid.Column>
          <Grid.Column textAlign="center" width={16}>
            <Form>
              <Form.Field>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="login-fields sign-up-input"
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column
            className="small-regular padding20"
            celled={true}
            textAlign="center"
            width={16}
          >
            I agree to the <Link to="/#">privacy policy</Link> and{' '}
            <Link to="/#"> trams of service</Link>
          </Grid.Column>
          <Grid.Column textAlign="center" width={16}>
            <GridRow>
              <div>
                <Button
                  style={buttonStyle}
                  onClick={this.loginSignUp}
                  className="primary-button"
                  content="Create your FREE account"
                />
              </div>
            </GridRow>
            <Grid.Row width={16}>
              <Grid.Column className="small-regular padding20">
                <Link to="/login">Already have an account?</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
  render() {
    return (
      <Grid verticalAlign="middle" style={{ minHeight: 'calc(100vh)' }}>
        <Grid.Row>
          <Grid.Column className="right-pane signup-block" width={16}>
            <div className="logo-img">
              <Logo centered={true} size="small" />
            </div>
            {this.state.isSuccess ? this.response : this.signUpForm}
            <div className="copy-right">
              <div className="privacy-policy">
                <Link to="/#">Privacy policy</Link>
                <Link to="/#">Terms of service</Link>
              </div>
              <h5 className="title-description">{'@2019 Sellgo All Rights Reserved'}</h5>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
