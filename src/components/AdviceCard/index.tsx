import * as React from 'react';
import { Divider, Card, Radio } from 'semantic-ui-react';

export interface AdviceCardProps {}

const AdviceCard = (props: AdviceCardProps) => {
  return (
    <Card className={''}>
      <Card.Content>
        <Card.Header>OUR ADVICE</Card.Header>
        <p>We're still gathering data for this supplier</p>

        <span className="track_row">
          <span> Track liked product</span>
          <span className="wrap_radio">
            {' '}
            <Radio toggle checked={true} /> On{' '}
          </span>
        </span>
      </Card.Content>
    </Card>
  );
};

export default AdviceCard;
