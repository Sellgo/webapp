import React from 'react';
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
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    height: 372, // 400 - seller-inventory-charts__title's height
  },
  title: {
    style: { fontSize: '20px' },
    align: 'center',
    verticalAlign: 'middle',
    text: '',
    percentAlign: 15,
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
      // showInLegend: true,
      dataLabels: {
        enabled: false,
      },
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

  // Transform the data to display to piechart

  const pieChartOptions = _.merge(chartOptions, {
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
