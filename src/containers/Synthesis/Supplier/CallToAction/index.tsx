import * as React from 'react';
import { Button, Progress } from 'semantic-ui-react';
import './index.css';

export default function CallToAction() {
  return (
    <div className="profit-sys-call-to-action">
      <Progress percent={10} size="tiny">
        80 tracked out of 100
      </Progress>
      <Button primary={true} className="add-new-supplier">
        Upgrade Now
      </Button>
    </div>
  );
}
