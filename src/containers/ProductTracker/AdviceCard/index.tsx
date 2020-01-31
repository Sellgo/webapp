import * as React from 'react';
import { Card, Dropdown, Popup, Icon } from 'semantic-ui-react';
import './index.scss';

export interface AdviceCardProps {
  handlePeriodDrop: any;
  periodValue: number;
}

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
      text: '30 days',
      value: 30,
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
              <Popup
                className="add-supplier-popup"
                trigger={<Icon name="question circle" size="small" color="grey" />}
                position="top left"
                size="tiny"
              />
            </span>
            <span className="wrap-radio">
              <Dropdown
                placeholder="Select"
                fluid
                selection
                options={options}
                defaultValue={props.periodValue}
                onChange={(e, data) => props.handlePeriodDrop(data)}
              />
            </span>
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdviceCard;
