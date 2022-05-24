import * as React from 'react';
import { Button, Progress } from 'semantic-ui-react';
import './index.css';
import { Link } from 'react-router-dom';

const CallToAction = (props: any) => {
  const { progress } = props;
  const trackedPercent = progress && ((progress.used / progress.available) * 100).toFixed(1);
  return (
    <div className="header-right-wrap">
      <Progress percent={trackedPercent} size="tiny" className="progress-bar">
        {trackedPercent === undefined
          ? '0 tracked out of 0'
          : `${progress.used} tracked out of ${progress.available}`}
      </Progress>
      <Link to="/settings/pricing">
        <Button primary={true}>Upgrade Now</Button>
      </Link>
    </div>
  );
};
export default CallToAction;
