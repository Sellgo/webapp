import * as React from 'react';
import { Button, Progress } from 'semantic-ui-react';
import './index.scss';

export default function CallToAction() {
  return (
    <div className="profitSysCallToAction">
      <Progress percent={10} size="tiny">
        80 tracked out of 100
      </Progress>
      <Button primary={true} className="add-new-supplier">
        Upgrade
      </Button>
    </div>
  );
}
