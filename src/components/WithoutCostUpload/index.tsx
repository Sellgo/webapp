import no_cost_icon from '../../assets/images/no-cost.svg';
import React from 'react';
import { Popup } from 'semantic-ui-react';
import './index.scss';

export const WithoutCostUpload = () => {
  return (
    <Popup
      trigger={<img src={no_cost_icon} alt={'icon'} style={{ float: 'right', marginLeft: 2 }} />}
      position="bottom right"
      className="without-cost-upload"
      on="click"
      content={
        <div>
          <p className="title">Estimated Data </p>
          <p className="description">
            We have applied our estimation formula for some products in this file due to missing
            cost of goods sold
          </p>
        </div>
      }
      basic
    />
  );
};
