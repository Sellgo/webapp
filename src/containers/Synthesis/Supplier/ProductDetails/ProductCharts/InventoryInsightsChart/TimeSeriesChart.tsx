import React, { Component } from 'react';
import Chart from '../../../../../../components/Chart/Chart';

interface TimeSeriesChartProps {
  chartOptions: any;
  componentRef: any;
  handleClick: any;
}

class TimeSeriesChart extends Component<TimeSeriesChartProps> {
  shouldComponentUpdate(nextProps: TimeSeriesChartProps) {
    if (this.props.chartOptions === nextProps.chartOptions) return false;
    return true;
  }

  render() {
    const { chartOptions, componentRef, handleClick } = this.props;

    return (
      <div className="seller-inventory-charts__time-series" onClick={handleClick}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={chartOptions} componentRef={componentRef} />
        </div>
      </div>
    );
  }
}

export default TimeSeriesChart;
