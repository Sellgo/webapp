import React from 'react';
import Chart from './Chart';
import _ from 'lodash';

export default ({ supplier, profitFinderChartOptions, chartComponentRef }: any) => {
  const rate = parseFloat(supplier.rate);
  const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
  const miss = 100 - supplier.p2l_ratio;
  const data = [
    {
      name: 'Profitable SKUs',
      y: rate,
      color: '#CAE1F3',
    },
    {
      name: 'Hit Non-Profitable SKUs',
      y: p2l_ratio,
      color: '#FBC4C4',
    },
    {
      name: 'Miss',
      y: miss,
      color: '#ECEBEB',
    },
  ];
  const supplierHitChartOptions = {
    series: [
      {
        type: 'pie',
        name: 'SKUs',
        colorByPoint: true,
        data: data,
        allowPointSelect: true,
        size: '75%',
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    ],
    chart: {
      type: 'pie',
    },
    title: null,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
  };

  const chartOptions = _.merge(_.cloneDeep(supplierHitChartOptions), profitFinderChartOptions);

  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} componentRef={chartComponentRef} />
    </div>
  );
};
