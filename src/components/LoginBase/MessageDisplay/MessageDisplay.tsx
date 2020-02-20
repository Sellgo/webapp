import React from 'react';
import { 
  Rail, 
  Segment,
  Message
} from "semantic-ui-react";

const MessageDisplay = (props: any) => (
    <Rail internal position='left'>
        <Segment>
            <Message
                success
                header='Account Created'
                content='A link to verify your email has been sent to bluebackground@gmail.com'
            />
        </Segment>
    </Rail>
) 

export default MessageDisplay;
