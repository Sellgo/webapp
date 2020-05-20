import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import './index.scss';

class SubscriptionMessage extends React.Component<any> {
  constructor(props: any, type?: string) {
    super(props);
    this.state = { type };
  }

  content() {
    return (
      <>
        <p>
          Your free trial runs out in 14 days. Do you like our product?
          <span>Click here to pick a plan</span>
        </p>
      </>
    );
  }
  render() {
    return (
      <Rail className="free-trial-period" internal={true} position="left">
        <Segment>
          <Message success content={this.content()} />
        </Segment>
      </Rail>
    );
  }
}

export default SubscriptionMessage;
