/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import React from 'react';

import './index.scss';

interface BuyBoxStatisticsProps {
  period?: any;
  product: any;
  buyBoxStats: any;
  renderNoDataMessage: () => void;
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
  const { period, product, buyBoxStats, renderNoDataMessage } = props;

  console.log({
    1: buyBoxStats.percentage,
    2: product.avg_daily_revenue,
    3: product.avg_monthly_sales,
  });

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

          {buyBoxStats.map((stat: any) => {
            const { merchant_id, merchant_name, percentage } = stat;
            return (
              <tr key={merchant_id}>
                <td>{merchant_name}</td>
                <td>{Math.floor(percentage)}%</td>
                <td>${Math.floor(percentage * Number(product.avg_daily_revenue) * 30)}</td>
                <td>{Math.floor(percentage * Number(product.avg_monthly_sales))}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default BuyBoxStatisticsChart;
