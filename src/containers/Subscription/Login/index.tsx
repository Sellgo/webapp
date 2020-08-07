import React, { useState } from 'react';
import './index.scss';
import { Container, Header, Form, Button, Divider } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';
import { useInput } from '../../../hooks/useInput';
import StepsContent from '../StepsContent';

interface Props {
  auth: Auth;
  setSignup: () => void;
}
export default function Login(props: Props) {
  const { auth, setSignup } = props;
  const [isError, setError] = useState(false);
  const [isSignupSuccess, setSignupSuccess] = useState(
    window.location.search === '?signup=success'
  );
  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const setErrorMessage = () => {
    setError(true);
    setSignupSuccess(false);
  };
  const handleSubmit = () => {
    localStorage.setItem('subscriptionLogin', 'true');
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
          setErrorMessage();
        }
      }
    );
  };
  return (
    <Container text className="login-container">
      <StepsContent contentType={'register'} />
      <Header as="h3">Login</Header>
      <Form className="login-container__form" onSubmit={handleSubmit}>
        <Form.Input
          size="huge"
          label="Username"
          type="mail"
          placeholder="Email"
          {...bindUserName}
        />
        <Form.Input size="huge" label="Password" type="password" {...bindPassword} />

        {isError && (
          <div className="login-container__form__error">
            <span>Incorrect Username or Password!</span>
          </div>
        )}
        {!isError && isSignupSuccess && (
          <div className="login-container__form__success">
            <span>A link to verify your email has been sent to your email</span>
          </div>
        )}
        <Form.Field
          size="huge"
          className="login-container__form__login"
          control={Button}
          primary={true}
          value="Submit"
        >
          Log in
        </Form.Field>
        <Divider section />
        <p className="login-container__form__sign-up">
          Need an account?
          <span
            onClick={() => {
              setSignup();
            }}
          >
            Register Here
          </span>
        </p>
      </Form>
    </Container>
  );
}
