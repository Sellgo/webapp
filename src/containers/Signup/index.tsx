import * as React from 'react';
import { Button, Form, Checkbox, Header } from 'semantic-ui-react';
import './index.scss';
import SignupBase from '../../components/SignupBase';
import StepsInfo from '../../components/StepsInfo/StepsInfo';
import Auth from '../../components/Auth/Auth';
import { useInput } from '../../hooks/useInput';

interface Props {
  auth: Auth;
}
interface State {
  stepsInfo: Object;
  messageInfo: Object;
}
export default function Signup(props: Props, state: State) {
  const { auth } = props;
  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstname, bind: bindFirstName } = useInput('');
  const { value: lastname, bind: bindLastName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const alphanumericRegex = /(?=.*(\d|\W))/;
  const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  state = {
    stepsInfo: [
      {
        id: 1,
        stepShow: strongRegex.test(password) ? true : false,
        stepClass: 'title-success',
        stepTitle: 'Password Strength',
        stepDescription: 'Strong',
        stepIcon: 'check',
      },
      {
        id: 2,
        stepShow: true,
        stepClass: alphanumericRegex.test(password) ? 'title-success' : 'title-error',
        stepTitle: 'Alphanumeric',
        stepDescription: 'Contains number or symbol',
        stepIcon: alphanumericRegex.test(password) ? 'check' : 'times',
      },
      {
        id: 3,
        stepShow: true,
        stepClass: password && password.length > 7 ? 'title-success' : 'title-error',
        stepTitle: 'Length',
        stepDescription: 'At least 8 characters',
        stepIcon: password && password.length > 7 ? 'check' : 'times',
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

  const handleSubmit = () => {
    auth.webAuth.signup(
      {
        connection: 'Username-Password-Authentication',
        email: email,
        password: password,
        user_metadata: { first_name: password, last_name: password },
      },
      (err: any) => {
        if (err) return alert('Something went wrong: ' + err.message);
        return alert('success signup without login!');
      }
    );
  };
  return (
    <SignupBase messageInfo={state.messageInfo}>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Header size="huge"> Register Here </Header>
        <Form.Input required type="email" placeholder="Email" {...bindEmail} />
        <Form.Input required type="text" placeholder="First Name" {...bindFirstName} />
        <Form.Input required type="text" placeholder="Last Name" {...bindLastName} />
        <StepsInfo stepsData={state.stepsInfo} {...bindPassword} />
        <Form.Field control={Checkbox} label="I agree to receive emails from Sellgo" />
        <Form.Field
          required
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
