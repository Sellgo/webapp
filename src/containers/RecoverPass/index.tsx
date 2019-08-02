import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, GridRow, Segment, Message, Select } from 'semantic-ui-react';
import { Logo } from '../../components/AdminLayout/AdminHeader';
import IntroSlider from '../../components/IntroSlider';
import MesssageComponent from '../../components/MessageComponent';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import './recoverPass.css';
import axios from 'axios';
import { AppConfig } from '../../config';

interface State {
  isSuccess: boolean;
  isFailed: boolean;
  email: string;
  errorMsg: string;
}

export default class RecoverPass extends React.Component<any, State> {
  state = {
    isSuccess: false,
    isFailed: false,
    email: '',
    errorMsg: '',
  };

  public email: string = '';
  message = {
    id: 1,
    title: 'Reset Password',
    message: 'Password Reset Successful!',
    description: 'Please Check Your Email For Further Instruction.',
    description2: '',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#0E6FCF',
  };

  handleResponse = (response: any) => {
    if (response.status === 200) {
      this.setState({ isSuccess: !this.state.isSuccess });
      this.props.isSuccessReset({ isFailed: false, errorMsg: '' });
    }
  };
  setEmail = (event: any) => {
    this.email = event.target.value;
    this.setState({ isFailed: false, email: this.email });
  };

  changePassword = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // please enter email or email field is empty

    if (reg.test(this.state.email) === false) {
      this.setState({ isFailed: true, errorMsg: 'Please enter valid email address.' });
      this.props.isSuccessReset({ isFailed: true, errorMsg: 'Please enter valid email address.' });
      if (this.state.email === '') {
        this.props.isSuccessReset({
          isFailed: true,
          errorMsg: 'Please enter email or email field is empty',
        });
      } else {
        this.props.isSuccessReset({
          isFailed: true,
          errorMsg: 'Please enter valid email address.',
        });
      }
    } else {
      axios
        .get(AppConfig.BASE_URL_API + `seller/exists?email=${this.state.email}`)
        .then(response => {
          if (response.data) {
            this.sendRestRequest();
          } else {
            this.setState({ isFailed: true, errorMsg: 'Email address is not exists.' });
            this.props.isSuccessReset({ isFailed: true, errorMsg: 'Email address is not exists.' });
          }
        })
        .catch();
    }
  };

  sendRestRequest = () => {
    this.setState({ isFailed: false });
    axios
      .post(AppConfig.CHANGE_PASS_API_URL, {
        client_id: AppConfig.clientID,
        email: this.state.email,
        connection: AppConfig.connection,
      })
      .then(response => this.handleResponse(response))
      .catch(() => {
        this.setState({ isFailed: true, errorMsg: 'Something Wrong' });
      });
  };

  handleMessage = () => {
    this.setState({ isSuccess: !this.state.isSuccess });
  };

  response = <MesssageComponent message={this.message} handleMessage={this.handleMessage} />;

  forgetPassForm = (
    <Segment basic={true} clearing={true}>
      <Grid>
        {!this.props.onlyEmail ? (
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
                      name="email"
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
                    onClick={this.sendRestRequest}
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
        ) : (
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <div className="heading">
                <h5 className="title-description">
                  Please enter your email address to make password reset request
                </h5>
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <Form.Input
                name="email"
                type="email"
                onChange={this.setEmail}
                placeholder="Email Address"
              />
            </Grid.Column>
            <Grid.Column width={6} verticalAlign="bottom">
              <Button
                primary={true}
                onClick={this.changePassword}
                className="primary-button"
                content="Reset Password"
                style={{ borderRadius: '50px' }}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Segment>
  );

  render() {
    const minHeight = !this.props.onlyEmail ? { minHeight: '100vh' } : {};
    return (
      <Grid verticalAlign="middle" style={minHeight}>
        {!this.props.onlyEmail ? (
          <Grid.Row>
            <Grid.Column width={10}>
              <IntroSlider />
            </Grid.Column>
            <Grid.Column className="right-pane" width={6}>
              <div className="logo-img">
                <Logo centered={true} size="small" />
              </div>
              {this.state.isFailed && <Message color="red">{this.state.errorMsg}</Message>}
              {this.state.isSuccess ? this.response : this.forgetPassForm}
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Column width={this.state.isSuccess && this.props.onlyEmail ? 16 : 14}>
            {this.state.isSuccess
              ? !this.props.onlyEmail
                ? this.response
                : this.forgetPassForm
              : this.forgetPassForm}
          </Grid.Column>
        )}
      </Grid>
    );
  }
}
