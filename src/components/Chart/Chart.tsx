import React, { useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Segment, Loader } from 'semantic-ui-react';

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
});

export interface ChartProps {
  chartOptions?: any;
}

const Chart = (props: ChartProps) => {
  const { chartOptions } = props;
  if (chartOptions === undefined) {
    return (
      <Segment>
        <Loader
          hidden={chartOptions === undefined ? false : true}
          active={true}
          inline="centered"
          size="massive"
        >
          Loading
        </Loader>
      </Segment>
    );
  }
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Chart;
