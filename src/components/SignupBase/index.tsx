import React, { ReactNode } from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import './index.scss';

interface Props {
  children: ReactNode;
}

const SignupBase = (props: Props) => {
  return (
    <Grid className="signup-cont" columns={2}>
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
