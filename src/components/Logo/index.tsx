import * as React from 'react';
import { Image, SemanticSIZES } from 'semantic-ui-react';

const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({ size, centered }) => (
  <Image
    ui={true}
    style={{ width: 80 }}
    centered={centered || false}
    src="/images/sellgo_logo.png"
  />
);

export default Logo;
