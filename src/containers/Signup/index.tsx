import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Modal, TextArea } from 'semantic-ui-react';
import SignupBase from '../../components/SignupBase';
import StepsInfo from '../../components/StepsInfo/StepsInfo';
import { Steps } from '../../interfaces/StepsInfo';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';
import { v4 as uuid } from 'uuid';
import history from '../../history';
import Axios from 'axios';
import '../Signup/index.scss';
import { AppConfig } from '../../config';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { fetchTOS, fetchPP } from '../../actions/UserOnboarding';
import ReactPixel from 'react-facebook-pixel';
import {
  strong,
  lowerUpper,
  alphanumeric,
  specialCharacters,
  Length,
  passwordPolicy,
} from '../../constants/Validators';

interface Props {
  auth: Auth;
}

interface State {
  stepsInfo: Steps[];
}

function Signup(props: any, state: State) {
  const { auth, termsOfService, privacyPolicy, fetchTOS, fetchPP } = props;
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstname, bind: bindFirstName } = useInput('');
  const { value: lastname, bind: bindLastName } = useInput('');
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
  function handleSubmit() {
    const accountType = window.location.search === '?type=trial' ? 'trial' : 'free';
    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
    } else {
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
            const data = {
              email: email,
              name: firstname + ' ' + lastname,
              first_name: firstname,
              last_name: lastname,
            };
            auth.getSellerID(data, null);

            localStorage.setItem('accountType', accountType);
            ReactPixel.init(AppConfig.PIXEL_ID);
            ReactPixel.track('CompleteRegistration');
            Axios.post(`${AppConfig.BASE_URL_API}newsletter/subscribe`, {
              email,
              firstname,
              lastname,
            }).catch(err => console.log(err));

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
        <span className="consent">
          By clicking Register, you agree to our{' '}
          <span onClick={() => setOpenTOS(true)}>Terms of Service</span> and{' '}
          <span onClick={() => setOpenPP(true)}>Privacy Policy</span>
        </span>
        <Form.Field control={Button} fluid={true} primary={true}>
          Register
        </Form.Field>
        <label className="log-in">
          <b>
            Already have a Sellgo account?&nbsp;<a href="/">Log In </a>
          </b>
        </label>
      </Form>
      {newUserExperiencePopup()}
    </SignupBase>
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
