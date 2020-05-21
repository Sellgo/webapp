import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import SignupBase from '../../components/SignupBase';
import StepsInfo from '../../components/StepsInfo/StepsInfo';
import { Steps } from '../../interfaces/StepsInfo';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';
import { v4 as uuid } from 'uuid';
import history from '../../history';
import PasswordValidator from 'password-validator';
import '../Signup/index.scss';

interface Props {
  auth: Auth;
}

interface State {
  stepsInfo: Steps[];
}

export default function Signup(props: Props, state: State) {
  const { auth } = props;
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstname, bind: bindFirstName } = useInput('');
  const { value: lastname, bind: bindLastName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const [isFocusPW, setFocusPassword] = useState(false);

  const passwordPolicy = new PasswordValidator()
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  const strong = new PasswordValidator()
    .is()
    .min(10)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  const lowerUpper = new PasswordValidator()
    .has()
    .uppercase()
    .has()
    .lowercase();

  const alphanumeric = new PasswordValidator()
    .has()
    .letters()
    .has()
    .digits();

  const specialCharacters = new PasswordValidator().has().symbols();

  const Length = new PasswordValidator().is().min(8);

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

  const [messageDetails, setMessageDetails] = React.useState({
    key: '',
    header: '',
    content: ``,
    isSuccess: true,
    isError: false,
    time: 0,
  });

  function error(err: any) {
    console.log('error: ', err);
    setMessageDetails({
      key: uuid(),
      header: 'Signup Failed',
      content: `${err.description}`,
      isSuccess: false,
      isError: true,
      time: 5000,
    });
  }

  function onBlur() {
    setFocusPassword(false);
  }

  function onFocus() {
    setFocusPassword(true);
  }

  function handleSubmit() {
    const accountType = window.location.hash === '#trial' ? 'trial' : 'free';
    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
    } else {
      localStorage.setItem('accountType', accountType);
      auth.webAuth.signup(
        {
          connection: 'Username-Password-Authentication',
          email: email,
          password: password,
          userMetadata: { first_name: firstname, last_name: lastname },
        },
        (err: any) => {
          if (err) {
            error(err);
          } else {
            history.push({
              pathname: '/',
              state: { email },
            });
          }
        }
      );
    }
  }

  return (
    <SignupBase messageDetails={messageDetails}>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Header size="huge"> Register Here </Header>
        <Form.Input required type="email" placeholder="Email" {...bindEmail} />
        <Form.Input required type="text" placeholder="First Name" {...bindFirstName} />
        <Form.Input required type="text" placeholder="Last Name" {...bindLastName} />
        <StepsInfo
          isFocusPW={isFocusPW}
          focusInput={onFocus}
          blurInput={onBlur}
          stepsData={state.stepsInfo}
          {...bindPassword}
        />
        <Form.Field control={Button} fluid={true} primary={true}>
          Register
        </Form.Field>
        <label className="log-in">
          <b>
            Already have a Sellgo account?&nbsp;<a href="/">Log In </a>
          </b>
        </label>
      </Form>
    </SignupBase>
  );
}
