import * as React from 'react';
import { Progress } from 'semantic-ui-react';

/* Styles */
import './index.scss';

interface Props {
  type:
    | 'Profit Finder'
    | 'Product Tracker'
    | 'Remaining lookups'
    | 'Product Research'
    | 'Keyword Research'
    | 'Sales Estimation';
  quota: { used: number; available: number };
  className?: string;
}

const NewQuotaMeter = (props: Props) => {
  const { quota, type, className } = props;
  let color:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'olive'
    | 'green'
    | 'teal'
    | 'blue'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'brown'
    | 'grey'
    | 'black' = 'blue';
  switch (type) {
    case 'Profit Finder':
      color = 'blue';
      break;

    case 'Product Tracker':
      color = 'green';
      break;

    case 'Remaining lookups':
      color = 'violet';
      break;

    case 'Product Research':
      color = 'blue';
      break;

    case 'Keyword Research':
      color = 'yellow';
      break;

    case 'Sales Estimation':
      color = 'yellow';
      break;
  }

  const percent = ((quota.used | 0) / quota.available) * 100;
  return (
    <div className={`quota-meter-new ${className}`}>
      <div className="quota-description">
        <p className="quota-title">{type}</p>
        <p className="quota-usage">{`${quota.used | 0} / ${quota.available | 0}`}</p>
      </div>
      <Progress percent={percent} size="tiny" color={color} />
    </div>
  );
};

export default NewQuotaMeter;
