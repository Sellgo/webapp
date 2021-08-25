import * as React from 'react';
import { Progress } from 'semantic-ui-react';
import './index.scss';

interface Props {
  type:
    | 'profitFinder'
    | 'productTracker'
    | 'sellerResearch'
    | 'productResearch'
    | 'keywordResearch';
  quota: { used: number; available: number };
}

const NewQuotaMeter = (props: Props) => {
  const { quota, type } = props;
  const percent = (quota.used / quota.available) * 100;

  return (
    <div className="quota-meter-new">
      <div className="quota-description">
        <p className="quota-title">{type}</p>
        <p className="quota-usage">{`${quota.used} / ${quota.available}`}</p>
      </div>
      <Progress percent={percent} size="tiny" color="blue" />
    </div>
  );
};

export default NewQuotaMeter;
