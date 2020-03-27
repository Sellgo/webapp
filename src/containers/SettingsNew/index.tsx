import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PasswordInfo from './Password';
import AmazonInfo from './Amazon';
import BasicInfo from './BasicInfo';
import EmailInfo from './Email';
import './index.scss';

interface State {
  name: string;
  phone: number;
}

export default class Settings extends React.Component<State> {
  render() {
    return (
      <Grid className="settings-container">
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">Basic Information</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="basic-info">
          <BasicInfo />
        </Grid.Row>
        <Grid.Row className="email-header">
          <Grid.Column width={16}>
            <Header as="h3">Email</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="email-content" id="email-content">
          <EmailInfo />
        </Grid.Row>
        <Grid.Row className="change-pass-header">
          <Grid.Column width={16}>
            <Header as="h3">Change Password</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="password-content">
          <PasswordInfo />
        </Grid.Row>
        <Grid.Row className="amazon-header">
          <Grid.Column width={16}>
            <Header as="h3">Amazon MWS Authorization</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="amazon-content">
          <AmazonInfo />
        </Grid.Row>
      </Grid>
    );
  }
}
