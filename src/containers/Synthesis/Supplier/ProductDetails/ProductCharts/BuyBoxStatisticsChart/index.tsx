import React from 'react';
import { Icon } from 'semantic-ui-react';
import BuyBoxStatsPieChart from './BuyBoxStatsPieChart';
import { graphColors } from '../../../../../../utils/colors';
import './index.scss';

interface BuyBoxStatisticsProps {
  period?: any;
  product: any;
  buyBoxStats: any;
}

const BuyBoxStatisticsChart: React.FC<BuyBoxStatisticsProps> = props => {
  const { product, buyBoxStats } = props;

  return (
    <div className="buy-box-statistics">
      {buyBoxStats.length === 0 ? (
        <h1 className="no-data-message">No data yet! Please come back after a day.</h1>
      ) : (
        <>
          <div className="buy-box-statistics__pie-chart">
            <BuyBoxStatsPieChart pieData={buyBoxStats} />
          </div>

          <div className="buy-box-statistics__table">
            <table id="buy-box-table">
              <tr>
                <th>
                  Name
                  <Icon name="caret up" classsName="arrow" />
                  <Icon name="caret down" className="arrow" />
                </th>
                <th>
                  % won
                  <Icon name="caret up" classsName="arrow" />
                </th>
                <th>
                  Est. Share of Rev/mo
                  <Icon name="caret up" classsName="arrow" />
                  <Icon name="caret down" className="arrow" />
                </th>
                <th>
                  Est. Share of Sales/mo
                  <Icon name="caret up" classsName="arrow" />
                  <Icon name="caret down" className="arrow" />
                </th>
              </tr>

              {buyBoxStats.map((stat: any, index: number) => {
                const { merchant_id, merchant_name, percentage } = stat;
                return (
                  <tr key={merchant_id}>
                    <td>
                      {' '}
                      <span style={{ color: graphColors[index] }}>●</span>
                      {merchant_name}
                    </td>
                    <td>{Math.floor(percentage)}%</td>
                    <td>${Math.floor(percentage * Number(product.avg_daily_revenue) * 30)}</td>
                    <td>{Math.floor(percentage * Number(product.avg_monthly_sales))}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyBoxStatisticsChart;
