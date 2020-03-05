import * as React from 'react';
// eslint-disable-next-line import/named
import { Image, SemanticSIZES } from 'semantic-ui-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({ size, centered }) => (
  <Image
    ui={true}
    style={{ width: 80 }}
    centered={centered || false}
    src="/images/sellgo_logo.png"
  />
);

export default Logo;
