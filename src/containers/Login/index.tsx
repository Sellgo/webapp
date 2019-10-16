import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid, GridRow, Segment } from 'semantic-ui-react';
import { Logo } from '../Dashboard/index';
import IntroSlider from '../../components/IntroSlider';
import PasswordShowHide from '../../components/Password/PasswordShowHide';
import './login.css';
import GenericButton from '../../components/Button';

export default class Login extends React.Component<any, {}> {
  render() {
    const { login } = this.props.auth;
    return (
      <Grid verticalAlign="middle" style={{ minHeight: '100vh' }}>
        <Grid.Row>
          <Grid.Column className="left-pane" width={10}>
            <IntroSlider />
          </Grid.Column>
          <Grid.Column className="right-pane" width={6}>
            <div className="logo-img">
              <Logo centered={true} size="small" />
            </div>
            <Segment basic={true} clearing={true}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Form className="p-t-40">
                      <Form.Field>
                        <div className="small-light login-fields">
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="login-field1"
                          />
                          <div className="hr_line" />
                          <PasswordShowHide />
                        </div>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Grid.Row width={16}>
                      <Grid.Column className="small-regular textAlignCenter padding20">
                        <Link to="/forgot-password" style={{ fontSize: 'smaller', color: 'gray' }}>
                          Forgot your password?
                        </Link>
                      </Grid.Column>
                    </Grid.Row>
                    <GridRow>
                      <div className="textAlignCenter">
                        <GenericButton isClickable={true} onClick={login} content="Sign In" />
                      </div>
                    </GridRow>
                    <GridRow>
                      <div className="textAlignCenter padding20 p-t-40">
                        <Link to="/sign-up" className="small-bold">
                          Create My Sellgo Account!
                        </Link>
                      </div>
                    </GridRow>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
