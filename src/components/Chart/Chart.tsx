import React, { useRef, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Segment, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import { useWindowSize } from '../../hooks/useWindowSize';

/* 
Define default Highchart options here.
Please refer to the documentation at https://api.highcharts.com/highcharts/ when developing with Highcharts.
*/

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
  credits: {
    enabled: false,
  },
});
const defaultOptions: Highcharts.Options = {
  chart: {
    height: 252,
  },
  plotOptions: {
    series: {
      // general options for all series
    },
    line: {
      // shared options for all line series
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          plotOptions: {
            pie: {
              dataLabels: {
                alignTo: 'connectors',
              },
            },
          },
        },
      },
    ],
  },
};

export interface ChartProps {
  chartOptions?: any;
}

const Chart = (props: ChartProps) => {
  const chartComponent: any = useRef(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (chartComponent && chartComponent.current && chartComponent.current.chart) {
      const chartHeight =
        windowSize.width && windowSize.width >= 2560
          ? 533
          : windowSize.width && windowSize.width >= 1920
          ? 400
          : windowSize.width && windowSize.width >= 1368
          ? 285
          : null;
      chartComponent.current.chart.setSize(undefined, chartHeight);
    }
  });

  const { chartOptions } = props;
  const options = _.merge(_.cloneDeep(defaultOptions), chartOptions);
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
  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponent} />;
};

export default Chart;
