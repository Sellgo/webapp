import React, { useState } from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import LoginBase from '../../components/LoginBase';
import { useInput } from '../../hooks/useInput';
import './index.scss';
import Auth from '../../components/Auth/Auth';

interface Props {
  auth: Auth;
}
export default function Login(props: Props) {
  const { auth } = props;
  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  let [checked, setChecked] = useState(Boolean(localStorage.getItem('rememberMe')));

  const handleRememberClick = () => setChecked(!checked);

  const handleSubmit = () => {
    localStorage.setItem('rememberMe', String(checked));
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      },
      (err: any, res: any) => {
        if (err) {
          console.log('Error: ', err);
        }
      }
    );
  };

  return (
    <LoginBase>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Input label="Username" type="mail" placeholder="name@domain.com" {...bindUserName} />
        <Form.Input label="Password" type="password" {...bindPassword} />
        <Form.Group inline={true}>
          <Form.Field
            onClick={handleRememberClick}
            checked={checked}
            control={Checkbox}
            label="Remember me"
          />
          <a href="#"> Forgot password </a>
        </Form.Group>
        <Form.Field control={Button} fluid={true} primary={true} value="Submit">
          Log in
        </Form.Field>
        <a className="sign-up" href="#">
          <b>Sign up for an account</b>
        </a>
      </Form>
    </LoginBase>
  );
}
