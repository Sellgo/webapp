/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import React from 'react';

import './index.scss';

interface BuyBoxStatisticsProps {
  period?: any;
  product: any;
}

const response: any = [
  {
    merchant_id: 'ATVPDKIKX0DER',
    merchant_name: 'Amazon.com',
    percentage: 99.73438137505516,
  },
  {
    merchant_id: 'A2IXQ1BFDAX23W',
    merchant_name: 'STL PRO, Inc.',
    percentage: 0.10907849488330267,
  },
  {
    merchant_id: 'A36XPB0BO3IUWG',
    merchant_name: 'Roney Innovations',
    percentage: 0.054122917308508954,
  },
];

const BuyBoxStatisticsChart: React.FC<BuyBoxStatisticsProps> = props => {
  const { period, product } = props;

  return (
    <div className="buy-box-statistics">
      <div className="buy-box-statistics__pie-chart">
        <p>This will be pie chart</p>
      </div>

      <div className="buy-box-statistics__table">
        <table id="buy-box-table">
          <tr>
            <th>Name</th>
            <th>% won</th>
            <th>Est. Share of Rev/mo</th>
            <th>Est. Share of Sales/mo</th>
          </tr>

          {response.map((row: any) => {
            return (
              <tr key={row.merchant_id}>
                <td>{row.merchant_name}</td>
                <td>{row.percentage * 100}</td>
                <td>{'$92.90'}</td>
                <td>99</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default BuyBoxStatisticsChart;
