import * as React from 'react';
import { Button, Progress } from 'semantic-ui-react';
import './index.css';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className="profit-sys-call-to-action">
      <Progress percent={10} size="tiny">
        xx tracked out of xxx
      </Progress>
      <Link to="/settings/pricing">
        <Button primary={true}>Upgrade Now</Button>
      </Link>
    </div>
  );
}
