import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, GridRow, Segment } from 'semantic-ui-react';
import { Logo } from '../../components/AdminLayout/AdminHeader';
import IntroSlider from '../../components/IntroSlider';
import MesssageComponent from '../../components/MessageComponent';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import './recoverPass.css';

interface State {
  isSuccess: boolean;
}
export class RecoverPass extends React.Component<{}, State> {
  state = {
    isSuccess: false,
  };
  message = {
    id: 1,
    title: 'Reset Password',
    message: 'Password Reset Successful!',
    description: 'You have successfully reset the password for your Sellgo account.',
    description2: 'Please check your email to continue.',
    to: '/login',
    button_text: 'Ok',
  };
  toggleShow = () => {
    this.setState({ isSuccess: !this.state.isSuccess });
  };

  response = <MesssageComponent message={this.message} />;
  forgetPassForm = (
    <Segment basic clearing>
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
                  <input type="email" placeholder="Email Address" className="login-field1" />
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
                  onClick={this.toggleShow}
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
              <Logo centered size="small" />
            </div>
            {this.state.isSuccess ? this.response : this.forgetPassForm}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
