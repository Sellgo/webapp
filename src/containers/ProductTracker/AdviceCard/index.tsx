import * as React from 'react';
import { Divider, Card, Dropdown } from 'semantic-ui-react';
import './index.scss';

export interface AdviceCardProps {}

const AdviceCard = (props: AdviceCardProps) => {
  const options = [
    {
      key: 1,
      text: '10days',
    },
  ];
  return (
    <div className="advice-card">
      <Card>
        <Card.Content>
          <Card.Header>Our Advice</Card.Header>
          <p>We're still gathering data for this supplier</p>

          <span className="track-row">
            <span>
              <b>Period:</b>
            </span>
            <span className="wrap-radio">
              <Dropdown placeholder="30 days" fluid selection options={options} />
            </span>
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdviceCard;
