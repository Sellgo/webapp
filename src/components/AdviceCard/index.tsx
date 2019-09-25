import * as React from 'react';
import { Divider, Card, Radio } from 'semantic-ui-react';

export interface AdviceCardProps {}

const AdviceCard = (props: AdviceCardProps) => {
  return (
    <Card className={''}>
      <Card.Content>
        <Card.Header>OUR ADVICE</Card.Header>
        <p>We're still gathering data for this supplier</p>
        <Divider fitted />
        <span>
          Track liked product
          <Radio toggle checked={true} /> ON
        </span>
      </Card.Content>
    </Card>
  );
};

export default AdviceCard;
