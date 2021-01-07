import React, { useState } from 'react';
import _ from 'lodash';
import Chart from '../../../../../../components/Chart/Chart';
import { graphColors } from '../../../../../../utils/colors';

interface PieChartProps {
  pieData: any;
  chartOptions: any;
}

const BuyBoxStatsPieChart: React.FC<PieChartProps> = props => {
  const { pieData, chartOptions } = props;

  const [activeMerchantName, setActiveMerchantName] = useState<string>(pieData[0].merchant_name);
  const [activeMerchantWinPercent, setActiveMerchantWinPercent] = useState<number>(
    pieData[0].percentage
  );

  // Transform the data to display to piechart
  const pieChartOptions = _.merge(_.cloneDeep(chartOptions), {
    title: {
      text: `<b>${activeMerchantName}<b> <br>${Math.floor(activeMerchantWinPercent)}%`,
    },
    series: {
      data: pieData.map((data: any, index: number) => ({
        name: data.merchant_name,
        y: data.percentage,
        color: graphColors[index],
      })),
      point: {
        events: {
          click: function(e: any) {
            if (e.point.options.name && e.point.options.y) {
              setActiveMerchantName(e.point.options.name);
              setActiveMerchantWinPercent(e.point.options.y);
            }
          },
        },
      },
    },
  });

  return <Chart chartOptions={pieChartOptions} />;
};

export default BuyBoxStatsPieChart;
