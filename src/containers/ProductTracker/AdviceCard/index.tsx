import * as React from 'react';
import { Card, Dropdown } from 'semantic-ui-react';
import './index.scss';

export interface AdviceCardProps {}

const AdviceCard = (props: AdviceCardProps) => {
  const options = [
    {
      key: 1,
      text: '7 days',
      value: 7,
    },
    {
      key: 2,
      text: '14 days',
      value: 14,
    },
    {
      key: 3,
      text: '20 days',
      value: 20,
    },
    {
      key: 4,
      text: '60 days',
      value: 60,
    },
  ];
  return (
    <div className="advice-card">
      <Card>
        <Card.Content>
          {/* <Card.Header>Our Advice</Card.Header>
          <p>We're still gathering data for this supplier</p> */}

          <span className="track-row">
            <span>
              <b>Period:</b>
            </span>
            <span className="wrap-radio">
              <Dropdown placeholder="Select" fluid selection options={options} />
            </span>
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdviceCard;
