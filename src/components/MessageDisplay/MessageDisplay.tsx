import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import './index.scss';

const MessageDisplay = (props: any) => {
  const { messSucc, messPassErr, messageDetails } = props.propsMessage;
  const returnMessage = messageDetails.map((stat: any) => {
    let messHeader: string = '';
    let messContent: string = '';
    let messSuccess: boolean = false;
    let messError: boolean = false;
    let counter: boolean = false;

    if (messSucc === true && stat.id === 1) {
      messHeader = stat.header;
      messContent = stat.content;
      messSuccess = messSucc;
      counter = true;
    } else if (messPassErr === true && stat.id === 2) {
      messHeader = stat.header;
      messContent = stat.content;
      messError = messPassErr;
      counter = true;
    }

    if (counter) {
      return (
        <Message
          key={stat.id}
          success={messSuccess}
          error={messError}
          header={messHeader}
          content={messContent}
        />
      );
    }
  });

  return (
    <Rail internal={true} position="left">
      <Segment>{returnMessage}</Segment>
    </Rail>
  );
};

export default MessageDisplay;
