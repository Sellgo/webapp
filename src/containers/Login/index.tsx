import React, { useState } from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import LoginBase from '../../components/LoginBase';
import './index.scss';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';

interface Props {
  auth: Auth;
}
interface State {
  wrongAccess: boolean;
}
export default function Login(props: Props, state: State) {
  const [isAccess, setAccess] = useState(false);
  const { auth } = props;
  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = () => {
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      },
      (err: any, res: any) => {
        if (err) {
          console.log('Error:  ', err);
          setAccess(true);
        } else {
          console.log('Success!, ', res);
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
          <Form.Field control={Checkbox} label="Remember me" />
          <a href="#"> Forgot password </a>
        </Form.Group>
        {isAccess ? <span>Incorrect Username or Password!</span> : <span></span>}
        <Form.Field control={Button} fluid={true} primary={true} value="Submit">
          Log in
        </Form.Field>
        <a className="sign-up" href="/signup">
          <b>Sign up for an account</b>
        </a>
      </Form>
    </LoginBase>
  );
}
