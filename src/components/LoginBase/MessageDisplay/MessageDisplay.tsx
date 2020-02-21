import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';

const MessageDisplay = (props: any) => (
  <Rail internal={true} position="left">
    <Segment>
      <Message
        className={props.propsMessage ? '' : 'hide-message'}
        success={true}
        header="Account Created"
        content="A link to verify your email has been sent to bluebackground@gmail.com"
      />
    </Segment>
  </Rail>
);

export default MessageDisplay;
