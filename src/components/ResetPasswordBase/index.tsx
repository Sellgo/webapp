import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import MessageDisplay from '../MessageDisplay/MessageDisplay';

interface Props {
  messageDetails: any;
  children: any;
  isAistock?: boolean;
}
const ResetPasswordBase = (props: Props) => {
  const { messageDetails, children, isAistock } = props;

  return (
    <Grid className="reset-password-content" columns={2} doubling>
      <MessageDisplay messageDetails={messageDetails} />
      <Grid.Row>
        <Grid.Column>
          <Image
            src={!isAistock ? '/images/aistock_white_logo.png' : '/images/sellgo_white_logo.png'}
            wrapped={true}
          />
        </Grid.Column>
        <Grid.Column> {children} </Grid.Column>
      </Grid.Row>
      <Divider vertical={true} />
    </Grid>
  );
};

export default ResetPasswordBase;
