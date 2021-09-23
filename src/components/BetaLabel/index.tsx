import * as React from 'react';
import { Label } from 'semantic-ui-react';
import './index.scss';

export default (props: any) => (
  <Label className={props.isNav ? 'beta-label-nav' : 'beta-label'}>BETA</Label>
);
