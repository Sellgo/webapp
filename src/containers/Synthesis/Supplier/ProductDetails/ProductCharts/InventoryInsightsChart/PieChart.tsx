import React, { Component } from 'react';
import _ from 'lodash';
import Chart from '../../../../../../components/Chart/Chart';
import { PieItem } from '.';

interface PieChartProps {
  chartOptions: any;
  pieData: PieItem[];
}

class PieChart extends Component<PieChartProps> {
  shouldComponentUpdate(nextProps: PieChartProps) {
    if (this.props.pieData === nextProps.pieData) return false;
    return true;
  }

  render() {
    const { chartOptions, pieData } = this.props;

    const pieSum = pieData
      .filter((item: any) => item.visible)
      .map((i: any) => i.y)
      .reduce((a: any, b: any) => {
        const c = a ? a : 0;
        const d = b ? b : 0;
        return c + d;
      }, 0);

    const pieChartOptions = _.merge(_.cloneDeep(chartOptions), {
      title: {
        text: pieSum !== 0 ? `<b>${pieSum}<b> <br>Inventory` : '',
      },
      series: {
        data: pieData.filter((item: any) => item.visible),
      },
    });

    return (
      <div className="seller-inventory-charts__pie-chart">
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={pieChartOptions} containerProps={{ id: 'seller-inventory-pie' }} />
        </div>
      </div>
    );
  }
}

export default PieChart;
