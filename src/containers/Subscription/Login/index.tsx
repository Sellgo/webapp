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
  const { value: username, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const handleSubmit = () => {
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
          setError(true);
        } else {
          console.log('Success!');
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

        <div className="login-container__form__error">
          {isError ? <span>Incorrect Username or Password!</span> : <span />}
        </div>
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
