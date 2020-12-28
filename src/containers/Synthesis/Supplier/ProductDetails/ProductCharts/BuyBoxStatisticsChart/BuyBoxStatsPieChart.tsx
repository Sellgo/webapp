import React, { useState } from 'react';
import _ from 'lodash';
import Chart from '../../../../../../components/Chart/Chart';
import { graphColors } from '../../../../../../utils/colors';

interface PieChartProps {
  pieData: any;
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
    },
    series: {
      innerSize: '50%',
      animation: false,
      name: 'Won Percent',
      colorByPoint: true,
    },
  },
};
const BuyBoxStatsPieChart: React.FC<PieChartProps> = props => {
  const { pieData } = props;

  const [currentMerchant, setCurrentMerchant] = useState<string>(pieData[0].merchant_name);

  const [activeMerchant] = pieData
    ? pieData.filter((data: any) => data.merchant_name === currentMerchant)
    : undefined;

  // Transform the data to display to piechart
  const pieChartOptions = _.merge(chartOptions, {
    title: {
      text:
        activeMerchant.merchant_name.length === 0
          ? ' '
          : `<b>${activeMerchant.merchant_name}<b> <br>${Math.floor(activeMerchant.percentage)}%`,
    },
    plotOptions: {
      pie: {
        events: {
          click: function(e: any) {
            if (e.point.options.name) {
              setCurrentMerchant(e.point.options.name);
            }
            e.preventDefault();
          },
        },
      },
    },
    series: {
      data:
        pieData &&
        pieData.map((data: any, index: number) => ({
          name: data.merchant_name,
          y: data.percentage,
          color: graphColors[index],
        })),
    },
  });

  return <Chart chartOptions={pieChartOptions} />;
};

export default BuyBoxStatsPieChart;
