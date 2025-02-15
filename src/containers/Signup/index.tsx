import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Modal, TextArea } from 'semantic-ui-react';
import SignupBase from '../../components/SignupBase';
import StepsInfo from '../../components/StepsInfo';
import { Steps } from '../../interfaces/StepsInfo';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';
import { v4 as uuid } from 'uuid';
import history from '../../history';
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
  validateEmail,
  Name,
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
  const [emailError, setEmailError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);

  const [isFocusPW, setFocusPassword] = useState(false);
  const [openTOS, setOpenTOS] = useState(false);
  const [openPP, setOpenPP] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('?res=')) {
      localStorage.setItem('origin', 'chrome-ext');
    } else {
      localStorage.setItem('origin', 'webapp');
    }
  }, []);

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
    const errHeader =
      err.code === 'user_exists' ? `Another account is using ${email}` : 'Signup Failed';
    const errContent = err.code === 'user_exists' ? `Please try to login.` : err.description;
    setMessageDetails({
      key: uuid(),
      header: errHeader,
      content: errContent,
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
    setEmailError(false);
    setFnameError(false);
    setLnameError(false);
    const accountType = window.location.search === '?type=trial' ? 'trial' : 'free';
    const origin = localStorage.getItem('origin');
    if (!passwordPolicy.validate(password)) {
      setFocusPassword(true);
    } else if (!validateEmail(email)) {
      error({ description: `error in email - email format validation failed: ${email}` });
      setEmailError(true);
    } else if (!Name.validate(firstname)) {
      error({ description: 'First Name must all be letters.' });
      setFnameError(true);
    } else if (!Name.validate(lastname)) {
      error({ description: 'Last Name must all be letters.' });
      setLnameError(true);
    } else {
      auth.webAuth.signup(
        {
          connection: 'Username-Password-Authentication',
          email: email,
          password: password,
          userMetadata: { first_name: firstname, last_name: lastname, origin: origin },
        },
        (err: any) => {
          if (err) {
            error(err);
          } else {
            let data = {
              email: email,
              name: firstname + ' ' + lastname,
              first_name: firstname,
              last_name: lastname,
            };
            // @ts-ignore
            const referralID = typeof window !== 'undefined' && window.Rewardful.referral;

            if (referralID) {
              data = {
                // @ts-ignore
                referral: referralID,
                ...data,
              };
            }
            auth.getSellerID(data, null);

            localStorage.setItem('accountType', accountType);
            ReactPixel.init(AppConfig.PIXEL_ID);
            ReactPixel.track('CompleteRegistration');

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
        <Form.Input required type="email" placeholder="Email" {...bindEmail} error={emailError} />
        <Form.Input
          required
          type="text"
          placeholder="First Name"
          {...bindFirstName}
          error={fnameError}
        />
        <Form.Input
          required
          type="text"
          placeholder="Last Name"
          {...bindLastName}
          error={lnameError}
        />
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
