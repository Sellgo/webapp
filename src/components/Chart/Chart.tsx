import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
import { Segment, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import { PercentAlign } from '../../utils/highchartExtensions';

// activate extensions
Boost(Highcharts);
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
    style: {
      fontFamily: 'Work Sans',
    },
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
