import * as React from 'react';
// eslint-disable-next-line import/named
import { Image, SemanticSIZES } from 'semantic-ui-react';

import smallLogo from '../../assets/images/logo-small.svg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({ centered }) => (
  <Image
    ui={true}
    style={{ width: 80 }}
    centered={centered || false}
    src="/images/sellgo_logo.png"
  />
);

export default Logo;

export const LogoWithoutText = () => {
  return <Image ui centered src={smallLogo} />;
};
