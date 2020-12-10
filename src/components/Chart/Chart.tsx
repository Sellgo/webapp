import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import BrokenAxis from 'highcharts/modules/broken-axis';
import { Segment, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import { PercentAlign, LegendTooltip } from '../../utils/highchartExtensions';
import { connect } from 'react-redux';
import { setActiveProfitabilityChart } from '../../actions/Suppliers';
import get from 'lodash/get';

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
LegendTooltip(Highcharts);

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

export interface ChartProps {
  chartOptions?: any;
  componentRef?: any;
  containerProps?: any;
  setActiveProfitabilityChart: (value: string) => void;
  activeProfitabilityChart: string;
}

const Chart = (props: ChartProps) => {
  const {
    chartOptions,
    componentRef,
    containerProps,
    setActiveProfitabilityChart,
    activeProfitabilityChart,
  } = props;

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
        events: {
          click: e => handleChartClick(e.point.name, activeProfitabilityChart),
        },
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

  const handleChartClick = (data: string, activeData: string) => {
    const convertedData =
      data === 'Profitable ASINs'
        ? 'Profitable'
        : data === 'Non-Profitable ASINs'
        ? 'Non-Profitable Products'
        : '';
    const name = activeData !== convertedData ? convertedData : '';
    setActiveProfitabilityChart(name);
  };

  const options = _.merge(_.cloneDeep(defaultOptions), _.cloneDeep(chartOptions));
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
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={componentRef}
      containerProps={containerProps}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
