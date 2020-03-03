import React, { ReactNode } from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import './index.scss';
import MessageDisplay from '../MessageDisplay/MessageDisplay';

class SignupBase extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { messageDetails, children } = this.props;
    return (
      <Grid className="signup-cont" columns={2}>
        <MessageDisplay messageDetails={messageDetails} />
        <Grid.Row>
          <Grid.Column>
            <Image src="/images/sellgo_white_logo.png" wrapped={true} />
          </Grid.Column>
          <Grid.Column>{children}</Grid.Column>
        </Grid.Row>
        <Divider vertical={true} />
      </Grid>
    );
  }
}

export default SignupBase;
