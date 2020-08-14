import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import BrokenAxis from 'highcharts/modules/broken-axis';
import { Segment, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import { PercentAlign } from '../../utils/highchartExtensions';

export const defaultButtonTheme: any = {
  theme: {
    fill: 'white',
    stroke: 'silver',
    r: 0,
    states: {
      hover: {
        fill: '#41739D',
        style: {
          color: 'white',
        },
      },
    },
  },
};

// activate modules
Boost(Highcharts);
NoDataToDisplay(Highcharts);
BrokenAxis(Highcharts);
PercentAlign(Highcharts);

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
    spacing: [5, 5, 5, 5],
    style: {
      fontFamily: 'Work Sans',
    },
    resetZoomButton: defaultButtonTheme,
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
  componentRef?: any;
}

const Chart = (props: ChartProps) => {
  const { chartOptions, componentRef } = props;
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
  return <HighchartsReact highcharts={Highcharts} options={options} ref={componentRef} />;
};

export default Chart;
