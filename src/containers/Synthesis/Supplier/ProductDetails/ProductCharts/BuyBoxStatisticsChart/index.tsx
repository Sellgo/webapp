import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { fetchBuyBoxStatistics } from '../../../../../../actions/Products';
import { Loader } from 'semantic-ui-react';

import BuyBoxStatsPieChart from './BuyBoxStatsPieChart';
import { graphColors } from '../../../../../../utils/colors';

import './index.scss';
import { isfetchingBuyBoxStatistics } from '../../../../../../selectors/Products';

interface BuyBoxStatisticsProps {
  period: any;
  product: any;
  productBuyBoxStatistics: any;
  fetchBuyBoxStatistics: (productID: any, period?: number) => void;
  isfetchingBuyBoxStatistics: boolean;
}

const chartOptions = {
  lang: {
    noData: 'No Statistics',
  },
  title: {
    style: { fontSize: '15px' },
    align: 'center',
    percentAlign: 0,
    verticalAlign: 'middle',
    text: '',
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    height: 372,
  },
  tooltip: {
    headerFormat:
      '<span style="font-size: 18px;color:{point.color}">●</span>' +
      '<span style="font-size: 12px;font-weight:bold;">{point.key}</span><br/>',
    style: {
      color: 'white',
      opacity: 0.9,
    },
    backgroundColor: '#757575',
    shadow: false,
    borderWidth: 0,
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      center: ['50%', '50%'],
      dataLabels: {
        enabled: false,
      },
      animation: false,
      allowPointSelect: true,
      cursor: 'pointer',
    },
    series: {
      innerSize: '50%',
      animation: false,
      name: 'Won Percent',
      colorByPoint: true,
    },
  },
};

const renderLoader = () => {
  return (
    <Loader active={true} inline="centered" className="popup-loader" size="massive">
      Loading
    </Loader>
  );
};

const BuyBoxStatisticsChart: React.FC<BuyBoxStatisticsProps> = props => {
  const {
    product,
    productBuyBoxStatistics,
    period,
    fetchBuyBoxStatistics,
    isfetchingBuyBoxStatistics,
  } = props;

  useEffect(() => {
    fetchBuyBoxStatistics(product.product_id, period);
  }, []);

  useEffect(() => {
    fetchBuyBoxStatistics(product.product_id, period);
  }, [period]);

  return (
    <div className="buy-box-statistics">
      {isfetchingBuyBoxStatistics ? (
        renderLoader()
      ) : productBuyBoxStatistics.length === 0 ? (
        <h3 className="no-data-message">No data yet! Please come back after a day.</h3>
      ) : (
        <>
          <div className="buy-box-statistics__pie-chart">
            <BuyBoxStatsPieChart pieData={productBuyBoxStatistics} chartOptions={chartOptions} />
          </div>

          <div className="buy-box-statistics__table">
            <table id="buy-box-table">
              <tr>
                <th>Name</th>
                <th>% won</th>
                <th>Est. Share of Rev/mo</th>
                <th>Est. Share of Sales/mo</th>
              </tr>

              {productBuyBoxStatistics.map((stat: any, index: number) => {
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

const mapStateToProps = (state: {}) => ({
  productBuyBoxStatistics: get(state, 'product.detailsBuyBoxStatistics'),
  isfetchingBuyBoxStatistics: isfetchingBuyBoxStatistics(state),
});

const mapDispatchToProps = {
  fetchBuyBoxStatistics: (productId: string, period?: number) =>
    fetchBuyBoxStatistics(productId, period),
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyBoxStatisticsChart);
