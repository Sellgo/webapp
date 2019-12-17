import * as React from 'react';
import { Divider, Card, Radio } from 'semantic-ui-react';
import './index.scss';

export interface AdviceCardProps {}

const AdviceCard = (props: AdviceCardProps) => {
  return (
    <div className="adviceCard">
      <Card>
        <Card.Content>
          <Card.Header>OUR ADVICE</Card.Header>
          <p>We're still gathering data for this supplier</p>

          <span className="track-row">
            <span> Track liked product</span>
            <span className="wrap-radio">
              <Radio toggle checked={true} /> On{' '}
            </span>
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdviceCard;
