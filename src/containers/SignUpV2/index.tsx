import * as React from 'react';
import { 
  Button, 
  Form, 
  Checkbox,
  Header,
  Input,
  Icon, 
  Popup, 
  Grid,
  Step 
} from "semantic-ui-react";
import LoginBase from '../../components/LoginBase';
import './index.scss';
export default class SignUpV2 extends React.Component<any> {
  render() {
    return (
      <LoginBase>
        <Form className="signup-form">
            <Header size="huge"> Register Here </Header>
            <Form.Input type="mail" placeholder="Email" />
            <Form.Input type="text" placeholder="First Name" />
            <Form.Input type="text" placeholder="Last Name" />
            
            <Popup
              trigger={<Form.Input type="password" placeholder="Password" />}
              on="focus"
              size="huge"
              position="left center"
              wide='very'
            >
              <Step.Group size='mini' vertical>
                <Step>
                  <Icon name="check" className="title-success" />
                  <Step.Content>
                    <Step.Title className="title-success">Password Strength</Step.Title>
                    <Step.Description className="description-success">
                     Strong
                    </Step.Description>
                  </Step.Content>
                </Step>

                <Step active>
                  <Icon name="check" className="title-success" />
                  <Step.Content>
                    <Step.Title className="title-success">No Personal Information</Step.Title>
                    <Step.Description className="description-success">Can't contain your name or email address</Step.Description>
                  </Step.Content>
                </Step>

                <Step>
                  <Icon name="check" className="title-success" />
                  <Step.Content>
                    <Step.Title className="title-success">Alphanumeric</Step.Title>
                    <Step.Description className="description-success">Contains number or symbol</Step.Description>
                  </Step.Content>
                </Step>

                <Step>
                  <Icon name="times" className="title-error" />
                  <Step.Content>
                    <Step.Title className="title-error">Length</Step.Title>
                    <Step.Description className="description-error">At least 8 characters</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Popup>
            <Form.Field
                control={Checkbox}
                label="I agree to receive emails from Sellgo"
                />
            <Form.Field
                control={Checkbox}
                label={<label>By signing up, you're agreeing to our 
                    &nbsp;<a href="#">terms of service</a> and you have read our 
                    &nbsp;<a href="#">data use policy</a> as well as the use of 
                    &nbsp;<a href="#">cookies</a>.</label>}
                />
            <Form.Field control={Button} fluid primary>
                Register
            </Form.Field>
            <label className="log-in">
                Already have a Sellgo account?
                &nbsp;<a href="/login">Log In </a>
            </label>
        </Form>
      </LoginBase>
    );
  }
}
