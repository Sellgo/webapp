import React from 'react';
import './index.scss';
import { Grid, Image } from 'semantic-ui-react';
import Auth from '../../components/Auth/Auth';
import Summary from './Summary';

interface SubscriptionProps {
  auth: Auth;
}

class Subscription extends React.Component<SubscriptionProps> {
  render() {
    return (
      <Grid className="subscription-page" columns={2}>
        <Grid.Row>
          <Grid.Column width={5} className="subscription-page__logo-container">
            <div className="subscription-page__container__content">
              <Image src="/images/sellgo_grey_logo.svg" wrapped={true} />
            </div>
          </Grid.Column>
          <Grid.Column width={11} className="subscription-page__summary">
            <Summary />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Subscription;
