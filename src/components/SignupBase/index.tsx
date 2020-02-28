import React, { ReactNode } from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import { MessageTypes } from '../../interfaces/MessageDisplay';
import './index.scss';

interface Props {
  messageInfo: MessageTypes;
  children: ReactNode;
}

const SignupBase = (props: Props) => {
  const { messageInfo } = props;
  return (
    <Grid className="signup-cont" columns={2}>
      <MessageDisplay propsMessage={messageInfo} />
      <Grid.Row>
        <Grid.Column>
          <Image src="/images/sellgo_white_logo.png" wrapped={true} />
        </Grid.Column>
        <Grid.Column>{props.children}</Grid.Column>
      </Grid.Row>
      <Divider vertical={true} />
    </Grid>
  );
};

export default SignupBase;
