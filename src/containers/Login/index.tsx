import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import LoginBase from '../../components/LoginBase';
import './index.scss';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';
import { v4 as uuid } from 'uuid';

interface Props {
  auth: Auth;
  location: any;
}
export default function Login(props: Props) {
  const [isAccess, setAccess] = useState(false);
  const { auth, location } = props;
  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const [messageDetails, setMessageDetails] = React.useState({
    key: '',
    header: '',
    content: ``,
    isSuccess: true,
    isError: false,
    time: 0,
  });
  const handleSubmit = () => {
    setMessageDetails({
      key: '',
      header: '',
      content: ``,
      isSuccess: true,
      isError: false,
      time: 0,
    });
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      },
      err => {
        if (err) {
          console.log('Error: ', err);
          resetPassword();
          setAccess(true);
        } else {
          console.log('Success!');
        }
      }
    );
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        success();
      } else if (
        location.state.options &&
        location.state.options.flashMessage.text === 'Please verify your email before logging in.'
      ) {
        verifyEmail();
      }
    }
  }, []);

  function success() {
    setMessageDetails({
      key: uuid(),
      header: 'Account Created',
      content: `A link to verify your email has been sent to ${location.state.email}`,
      isSuccess: true,
      isError: false,
      time: 0,
    });
  }

  function verifyEmail() {
    setMessageDetails({
      key: uuid(),
      header: 'Email Not Verified',
      content: `Please verify email before loggin in`,
      isSuccess: false,
      isError: true,
      time: 0,
    });
  }
  return (
    <LoginBase messageDetails={messageDetails}>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Input label="Username" type="mail" placeholder="name@domain.com" {...bindUserName} />
        <Form.Input label="Password" type="password" {...bindPassword} />
        <a href="#"> Forgot password </a>
        {isAccess ? <span>Incorrect Username or Password!</span> : <span />}
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
