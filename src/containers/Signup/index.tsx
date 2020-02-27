import React, { ReactNode } from 'react';
import { Button, Form, Checkbox, Header } from 'semantic-ui-react';
import './index.scss';
import SignupBase from '../../components/SignupBase';
import StepsInfo from '../../components/StepsInfo/StepsInfo';
import { MessageTypes } from '../../interfaces/MessageDisplay';

interface StepsInfo {
  id: number;
  stepShow: boolean;
  stepClass: string;
  stepTitle: string;
  stepDescription: string;
  stepIcon: string;
}

interface State {
  stepsInfo: StepsInfo[];
  messageInfo: MessageTypes;
}

export default function Signup(state: State) {
  state = {
    stepsInfo: [
      {
        id: 1,
        stepShow: true,
        stepClass: 'title-success',
        stepTitle: 'Password Strength',
        stepDescription: 'Strong',
        stepIcon: 'check',
      },
      {
        id: 2,
        stepShow: true,
        stepClass: 'title-success',
        stepTitle: 'No Personal Information',
        stepDescription: `Can't contain your name or email address`,
        stepIcon: 'check',
      },
      {
        id: 3,
        stepShow: true,
        stepClass: 'title-success',
        stepTitle: 'Alphanumeric',
        stepDescription: 'Contains number or symbol',
        stepIcon: 'check',
      },
      {
        id: 4,
        stepShow: true,
        stepClass: 'title-error',
        stepTitle: 'Length',
        stepDescription: 'At least 8 characters',
        stepIcon: 'times',
      },
    ],
    messageInfo: {
      messSucc: true,
      messPassErr: false,
      messageDetails: [
        {
          id: 1,
          header: 'Account Created',
          content: 'A link to verify your email has been sent to bluebackground@gmail.com',
        },
        {
          id: 2,
          header: 'Please re-enter your password',
          content:
            'The password you entered is incorrect. Please try again (make sure your caps lock is off)',
        },
      ],
    },
  };
  return (
    <SignupBase messageInfo={state.messageInfo}>
      <Form className="signup-form">
        <Header size="huge"> Register Here </Header>
        <Form.Input type="mail" placeholder="Email" />
        <Form.Input type="text" placeholder="First Name" />
        <Form.Input type="text" placeholder="Last Name" />
        <StepsInfo stepsData={state.stepsInfo} />
        <Form.Field control={Checkbox} label="I agree to receive emails from Sellgo" />
        <Form.Field
          control={Checkbox}
          label={
            <label>
              By signing up, you're agreeing to our &nbsp;
              <a href="#">terms of service</a> and you have read our &nbsp;
              <a href="#">data use policy</a> as well as the use of &nbsp;<a href="#">cookies</a>.
            </label>
          }
        />
        <Form.Field control={Button} fluid={true} primary={true}>
          Register
        </Form.Field>
        <label className="log-in">
          <b>
            Already have a Sellgo account?&nbsp;<a href="#">Log In </a>
          </b>
        </label>
      </Form>
    </SignupBase>
  );
}
