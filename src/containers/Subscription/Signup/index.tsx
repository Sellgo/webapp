import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Header, Form, Button, Divider, Modal, TextArea } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';
import { useInput } from '../../../hooks/useInput';
import StepsInfo from '../../../components/StepsInfo/StepsInfo';
import { Steps } from '../../../interfaces/StepsInfo';
import StepsContent from '../StepsContent';
import {
  passwordPolicy,
  strong,
  lowerUpper,
  alphanumeric,
  specialCharacters,
  Length,
} from '../../../constants/Validators';
import { fetchTOS, fetchPP } from '../../../actions/UserOnboarding';
import get from 'lodash/get';
import { connect } from 'react-redux';

interface Props {
  auth: Auth;
  setLogin: () => void;
  termsOfService: any;
  privacyPolicy: any;
  fetchPP: any;
  fetchTOS: any;
}
interface State {
  stepsInfo: Steps[];
}
function Signup(props: Props, state: State) {
  const { auth, setLogin, termsOfService, privacyPolicy, fetchTOS, fetchPP } = props;
  const [verifyEmailError, setVerifyEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const [isFocusPW, setFocusPassword] = useState(false);
  const [openTOS, setOpenTOS] = useState(false);
  const [openPP, setOpenPP] = useState(false);

  useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);
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

  const onClose = () => {
    setOpenTOS(false);
    setOpenPP(false);
  };

  const TOS = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Terms of Service</Header>
        <Form>
          <TextArea rows="20" value={termsOfService} />
        </Form>
      </div>
    );
  };

  const PP = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Privacy Policy</Header>
        <Form>
          <TextArea rows="20" value={privacyPolicy} />
        </Form>
      </div>
    );
  };
  const newUserExperiencePopup = () => {
    return (
      <Modal onClose={() => onClose()} size={'small'} open={openTOS || openPP}>
        <Modal.Content>
          {openTOS && <TOS />}
          {openPP && <PP />}
        </Modal.Content>
      </Modal>
    );
  };
  const handleSubmit = () => {
    localStorage.removeItem('userId');
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
            const data = {
              email: email,
              name: firstName + ' ' + lastName,
            };
            auth.getSellerID(data);
          }
        }
      );
    }
  };
  return (
    <Container text className="signup-container">
      {newUserExperiencePopup()}
      <StepsContent contentType={'register'} />
      <Header as="h3">Register Here</Header>
      <Form className="signup-container__form" onSubmit={handleSubmit}>
        <Form.Input size="huge" label="Email" type="mail" placeholder="Email" {...bindEmail} />
        <Form.Group className="signup-container__form__fullname-group">
          <Form.Input
            size="huge"
            label="First Name"
            type="text"
            placeholder="First Name"
            required
            {...bindFirstName}
          />
          <Form.Input
            size="huge"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            required
            {...bindLastName}
          />
        </Form.Group>
        <Form.Field className="payment-container__stripe-checkout-form__password-field">
          <label htmlFor="password">Password</label>
          <StepsInfo
            id="password"
            subscriptionRegister={true}
            isFocusPW={isFocusPW}
            focusInput={onFocus}
            blurInput={onBlur}
            stepsData={state.stepsInfo}
            {...bindPassword}
          />
        </Form.Field>

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
        <p className="signup-container__form__consent">
          By signing up, you’re agreeing to our{' '}
          <span
            onClick={() => {
              setOpenTOS(true);
            }}
          >
            terms of service
          </span>{' '}
          and you have read our{' '}
          <span
            onClick={() => {
              setOpenPP(true);
            }}
          >
            data use policy
          </span>{' '}
          as well as the use of cookies.
        </p>
        <Divider section />
        <p className="signup-container__form__sign-up">
          Already have a Sellgo account?
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

const mapStateToProps = (state: any) => ({
  termsOfService: get(state, 'userOnboarding.termsOfService'),
  privacyPolicy: get(state, 'userOnboarding.privacyPolicy'),
});

const mapDispatchToProps = {
  fetchTOS: () => fetchTOS(),
  fetchPP: () => fetchPP(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
