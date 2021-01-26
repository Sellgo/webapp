import React from 'react';
import Chart from './Chart';

export default ({ supplier, profitFinderChartOptions, chartComponentRef }: any) => {
  const profitable_rate = parseFloat(supplier.rate);
  const miss_rate =
    (100 * (supplier.item_total_count - supplier.item_active_count)) / supplier.inventory;
  const unprofitable_rate = 100 - profitable_rate - miss_rate;
  const data = [
    {
      name: 'Profitable ASINs',
      y: profitable_rate,
      color: '#CAE1F3',
    },
    {
      name: 'Non-Profitable ASINs',
      y: unprofitable_rate,
      color: '#FBC4C4',
    },
    {
      name: 'Missed ASINs',
      y: miss_rate,
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

  const chartOptions = { ...supplierHitChartOptions, profitFinderChartOptions };

  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartOptions} componentRef={chartComponentRef} />
    </div>
  );
};
