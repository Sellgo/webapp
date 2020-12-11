import React, { useEffect } from 'react';
import Chart from './Chart';
import _ from 'lodash';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { setActiveProfitabilityChart } from '../../actions/Suppliers';

export const SupplierHitChart = (props: any) => {
  const { supplier, profitFinderChartOptions, chartComponentRef } = props;
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
    plotOptions: {
      series: {
        events: {
          click: (e: any) => handleChartClick(e.point.name),
        },
        // general options for all series
      },
      line: {
        // shared options for all line series
      },
    },
    title: null,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
  };

  const handleChartClick = (data: any) => {
    const { setActiveProfitabilityChart } = props;
    console.log('e: ', data);
    setActiveProfitabilityChart(data);
  };

  const chartOptions = _.merge(_.cloneDeep(supplierHitChartOptions), profitFinderChartOptions);
  const [chartData, setChartData] = React.useState(_.cloneDeep(chartOptions));
  useEffect(() => {
    const { activeProfitabilityChart } = props;
    if (activeProfitabilityChart) {
      const temptData = _.cloneDeep(chartData);
      for (const data of temptData.series[0].data) {
        if (data.name === activeProfitabilityChart) {
          data.selected = !data.selected;
          data.sliced = !data.sliced;
        } else {
          data.selected = false;
          data.sliced = false;
        }
      }
      setChartData(temptData);
    } else {
      const temptData = _.cloneDeep(chartData);
      for (const data of temptData.series[0].data) {
        data.selected = false;
        data.sliced = false;
      }
      setChartData(temptData);
    }
  }, [props.activeProfitabilityChart]);
  return (
    <div className="individual-pie-chart">
      <Chart chartOptions={chartData} componentRef={chartComponentRef} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeProfitabilityChart: get(state, 'supplier.activeProfitabilityChart'),
  };
};
const mapDispatchToProps = {
  setActiveProfitabilityChart: (value: string) => setActiveProfitabilityChart(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierHitChart);
