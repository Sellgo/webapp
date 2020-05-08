import * as React from 'react';
import './index.scss';
import { Segment, Header } from 'semantic-ui-react';

class Onboarding extends React.Component<any> {
  render() {
    return (
      <div className="onboarding-page">
        <div className="onboarding-page__header">
          <Header as="h1">
            <Header.Content>Tutorial Videos</Header.Content>
          </Header>
        </div>
        <Segment basic={true} className="onboarding-page__content" />
      </div>
    );
  }
}

export default Onboarding;
