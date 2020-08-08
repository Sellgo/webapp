import React, { useState } from 'react';
import './index.scss';
import { Container, Header, Form, Button, Divider } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';
import { useInput } from '../../../hooks/useInput';
import StepsInfo from '../../../components/StepsInfo/StepsInfo';
import { Steps } from '../../../interfaces/StepsInfo';
import StepsContent from '../StepsContent';
import history from '../../../history';
import {
  passwordPolicy,
  strong,
  lowerUpper,
  alphanumeric,
  specialCharacters,
  Length,
} from '../../../constants/Validators';

interface Props {
  auth: Auth;
  setLogin: () => void;
}
interface State {
  stepsInfo: Steps[];
}
export default function Signup(props: Props, state: State) {
  const { auth, setLogin } = props;
  const [verifyEmailError, setVerifyEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const [isFocusPW, setFocusPassword] = useState(false);

  state = {
    stepsInfo: [
      {
        id: 1,
        stepShow: strong.validate(password) ? true : false,
        stepClass: 'title-success',
        stepTitle: 'Password Strength',
        stepDescription: `strong`,
        stepIcon: 'check',
      },
      {
        id: 2,
        stepShow: true,
        stepClass: lowerUpper.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Lowercase and Uppercase',
        stepDescription: 'Contains a capital letter and a non capital letter',
        stepIcon: lowerUpper.validate(password) ? 'check' : 'times',
      },
      {
        id: 3,
        stepShow: true,
        stepClass: alphanumeric.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Alphanumeric',
        stepDescription: 'Contains a number and letter',
        stepIcon: alphanumeric.validate(password) ? 'check' : 'times',
      },
      {
        id: 4,
        stepShow: true,
        stepClass: specialCharacters.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Special Characters',
        stepDescription: 'Contains at least one special character (e.g. !@#$%^&*,.)',
        stepIcon: specialCharacters.validate(password) ? 'check' : 'times',
      },
      {
        id: 5,
        stepShow: true,
        stepClass: Length.validate(password) ? 'title-success' : 'title-error',
        stepTitle: 'Length',
        stepDescription: 'At least 8 characters',
        stepIcon: Length.validate(password) ? 'check' : 'times',
      },
    ],
  };
  function onBlur() {
    setFocusPassword(false);
  }

  function onFocus() {
    setFocusPassword(true);
  }

  const handleSubmit = () => {
    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
    } else {
      auth.webAuth.signup(
        {
          connection: 'Username-Password-Authentication',
          email: email,
          password: password,
          userMetadata: { first_name: firstName, last_name: lastName },
        },
        (err: any) => {
          if (err) {
            setVerifyEmailError(true);
            setErrorMessage(err.description);
          } else {
            history.push('/subscription?signup=success');
            setLogin();
          }
        }
      );
    }
  };
  return (
    <Container text className="signup-container">
      <StepsContent contentType={'register'} />
      <Header as="h3">Register Here</Header>
      <Form className="signup-container__form" onSubmit={handleSubmit}>
        <Form.Input size="huge" label="Username" type="mail" placeholder="Email" {...bindEmail} />
        <Form.Group className="signup-container__form__fullname-group">
          <Form.Input
            size="huge"
            label="First Name"
            type="text"
            placeholder="First Name"
            {...bindFirstName}
          />
          <Form.Input
            size="huge"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            {...bindLastName}
          />
        </Form.Group>
        <StepsInfo
          subscriptionRegister={true}
          isFocusPW={isFocusPW}
          focusInput={onFocus}
          blurInput={onBlur}
          stepsData={state.stepsInfo}
          {...bindPassword}
        />

        <div className="signup-container__form__error">
          {verifyEmailError ? <span>{errorMessage}</span> : <span />}
        </div>
        <Form.Field
          size="huge"
          className="signup-container__form__signup"
          control={Button}
          primary={true}
          value="Submit"
        >
          Register
        </Form.Field>
        <Divider section />
        <p className="signup-container__form__sign-up">
          Already have a Sellgo account
          <span
            onClick={() => {
              setLogin();
            }}
          >
            Log in
          </span>
        </p>
      </Form>
    </Container>
  );
}
