import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import './index.scss';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';
import ResetPasswordBase from '../../components/ResetPasswordBase';
import { v4 as uuid } from 'uuid';
import { validateEmail } from '../../constants/Validators';

interface Props {
  auth: Auth;
}

export default function ResetPassword(props: Props) {
  const { auth } = props;
  const [isAccess, setAccess] = useState(false);
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageDetails, setMessageDetails] = React.useState({
    key: '',
    header: '',
    content: ``,
    isSuccess: true,
    isError: false,
    time: 0,
  });

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setAccess(true);
      setErrorMessage('Email is invalid');
    } else {
      auth.webAuth.changePassword(
        {
          connection: 'Username-Password-Authentication',
          email: email,
        },
        err => {
          if (err) {
            error(err);
          } else {
            resetEmail();
            success();
          }
        }
      );
    }
  };

  function error(err: any) {
    setMessageDetails({
      key: uuid(),
      header: 'Error Occured. ',
      content: `${err.description}`,
      isSuccess: false,
      isError: true,
      time: 5000,
    });
  }

  function success() {
    setMessageDetails({
      key: uuid(),
      header: 'Reset Password Link Sent',
      content: `A link to reset your password has been sent to ${email}`,
      isSuccess: true,
      isError: false,
      time: 0,
    });
  }

  return (
    <ResetPasswordBase messageDetails={messageDetails}>
      <Form className="reset-pw-form" onSubmit={handleSubmit}>
        <Header as="h1" textAlign="center">
          Forgot password?
        </Header>
        <Form.Input
          label="Enter the email address associated with your account and we'll email you a password reset link."
          type="email"
          placeholder="Your email"
          {...bindEmail}
          required
        />
        {isAccess ? <span>{errorMessage}</span> : <span />}
        <Form.Field control={Button} fluid={true} primary={true} value="Submit">
          Reset password
        </Form.Field>
        <a className="back-to-login" href="/">
          <b>Log in</b>
        </a>
      </Form>
    </ResetPasswordBase>
  );
}
