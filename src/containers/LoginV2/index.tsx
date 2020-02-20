import * as React from 'react';
import { 
  Button, 
  Form, 
  Checkbox } from "semantic-ui-react";
import LoginBase from '../../components/LoginBase';
import './index.scss';

export default class LoginV2 extends React.Component<any> {
  render() {
    return (
      <LoginBase>
        <Form className="login-form">
          <Form.Input
            label="Username"
            type="mail"
            placeholder="name@domain.com"
          />
          <Form.Input label="Password" type="password" />
          <Form.Group inline>
            <Form.Field control={Checkbox} label="Remember me" />
            <a href="#"> Forgot password </a>
          </Form.Group>
          <Form.Field control={Button} fluid primary>
            Log in
          </Form.Field>
          <a className="sign-up" href="/register"> Sign up for an account </a>
        </Form>
      </LoginBase>
    );
  }
}
