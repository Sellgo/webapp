import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid, GridRow, Segment } from 'semantic-ui-react';
import Logo from '../../components/Logo';
import IntroSlider from '../../components/IntroSlider';
import './recoverPass.css';
import Axios from 'axios';
import { AppConfig } from '../../config';
import GenericButton from '../../components/Button';
import { success, error } from '../../utils/notifications';
import history from '../../history';

interface State {
  email: string;
}

export default class RecoverPass extends React.Component<any, State> {
  state = {
    email: '',
  };

  setEmail = (event: any) => {
    const email = event.target.value;
    this.setState({ email });
  };

  changePassword = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(this.state.email) === false) {
      if (this.state.email === '') {
        error('Please enter a valid email');
      }
    } else {
      Axios.get(AppConfig.BASE_URL_API + `sellers/exists?email=${this.state.email}`)
        .then(response => {
          if (response.data) {
            this.sendRestRequest();
          } else {
            error('Email address does not exists. Please try again!');
          }
        })
        .catch(() => error('Reset failed. Please try again!'));
    }
  };

  sendRestRequest = () => {
    Axios.post(AppConfig.CHANGE_PASS_API_URL, {
      client_id: AppConfig.clientID,
      email: this.state.email,
      connection: AppConfig.connection,
    })
      .then(() => {
        success('Reset password successfully', {
          onClose: () => history.push('/'),
        });
      })
      .catch(() => error('Reset failed. Please try again!'));
  };

  forgetPassForm = (
    <Segment basic={true} clearing={true}>
      <Grid>
        {!this.props.onlyEmail ? (
          <Grid.Row>
            <Grid.Column width={16}>
              <div className="heading">
                <h1>{'Reset Password'}</h1>
                <h5 className="title-description">
                  {'Please enter your email address to make password reset request'}
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
                <Grid.Column className="small-regular text-align-center padding20">
                  <Link to="/login" style={{ fontSize: 'smaller', color: 'gray' }}>
                    Already have an account?
                  </Link>
                </Grid.Column>
              </Grid.Row>
              <GridRow>
                <div className="text-align-center">
                  <GenericButton
                    isClickable={true}
                    onClick={this.sendRestRequest}
                    content="Reset Password"
                  />
                </div>
              </GridRow>
              <GridRow>
                <div className="text-align-center padding20">
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
                  {'Please enter your email address to make password reset request'}
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
              <GenericButton
                isClickable={true}
                onClick={this.changePassword}
                content="Reset Password"
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
              {this.forgetPassForm}
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Column width={this.props.onlyEmail ? 16 : 14}>{this.forgetPassForm}</Grid.Column>
        )}
      </Grid>
    );
  }
}
