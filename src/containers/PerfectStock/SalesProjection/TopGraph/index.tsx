import React, { useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';

/* Types */
import { GraphDataSeries } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Selectors */
import { getSalesProjectionResults } from '../../../../selectors/PerfectStock/SalesProjection';

/* Components */
import {
  GRANULARITIES,
  getGranularityLabel,
  getGranularityValue,
} from '../../../../constants/PerfectStock/Cashflow';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';

import { ProductProjectedSales } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';
import InputTabSelection from '../../../../components/InputTabSelection';

interface Props {
  isLoading?: boolean;
  data: GraphDataSeries[];
  salesProjectionResults: ProductProjectedSales[];
  fetchMainChart: (granularity?: number, merchantListingIds?: number[]) => void;
}
const SalesProjectionGraph = (props: Props) => {
  const { data, isLoading, fetchMainChart, salesProjectionResults } = props;
  const [selectedGranularity, setSelectedGranularity] = React.useState<number>(1);
  const [selectedSkus, setSelectedSkus] = React.useState<any>([]);
  const dataWithAxisInfo = data?.map((item: GraphDataSeries, index) => {
    return {
      ...item,
      yAxis: index,
    };
  });

  useEffect(() => {
    const chartMount = document.getElementById('sales-projection-graph');

    if (chartMount) {
      Highcharts.chart({
        chart: {
          renderTo: 'sales-projection-graph',
          type: 'line',
        },

        title: {
          text: '',
        },

        yAxis: [
          {
            // left y axis
            title: {
              text: null,
            },
            labels: {
              align: 'left',
              x: -5,
              y: 16,
            },
            showFirstLabel: true,
            gridLineDashStyle: 'LongDash',
          },
        ],

        xAxis: {
          type: 'datetime',
          gridLineDashStyle: 'LongDash',
          gridLineColor: '#e6e6e6',
          gridLineWidth: 1,
          minTickInterval: 1,
          tickInterval: 24 * 3600 * 1000 * 30,
          dateTimeLabelFormats: {
            day: '%e %b',
            week: '%e %b',
            month: '%b %y',
            year: '%Y',
          },
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointIntervalUnit: 'day',
          },
          line: {
            animation: {
              duration: 0,
            },
            showInLegend: false,
            color: '#B418F2',
          },
        },

        series: dataWithAxisInfo,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 1000,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      });
    }
  }, [data]);

  const skuOptions = salesProjectionResults.map((result, index) => ({
    key: index,
    text: result?.sku,
    value: result?.sku,
  }));

  let skuMlid: any = {};

  salesProjectionResults.forEach((result) => {
    skuMlid[result.sku] = result.merchant_listing_id;
  });

  const getMlidFromSku = (selectedValues: string[]) => {
    let merchantListingIds: number[] = [];

    for (let j = 0; j < selectedValues.length; j++) {
      if (skuMlid[selectedValues[j]] && !merchantListingIds.includes(skuMlid[selectedValues[j]])) {
        merchantListingIds.push(skuMlid[selectedValues[j]]);
      }
    }

    return merchantListingIds;
  };

  const handleSkuChange = (selectedValues: string[]) => {
    setSelectedSkus(selectedValues);

    fetchMainChart(
      getGranularityValue(getGranularityLabel(selectedGranularity)),
      getMlidFromSku(selectedValues)
    );
  };

  return (
    <div className={styles.graphWrapper}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputTabSelection
          isPurple
          options={GRANULARITIES.map((item) => item.text)}
          selectedOption={getGranularityLabel(selectedGranularity)}
          setSelectedOption={(label: string) => {
            setSelectedGranularity(getGranularityValue(label));
            fetchMainChart(getGranularityValue(label), getMlidFromSku(selectedSkus));
          }}
          className={styles.inputTabSelection}
        />

        <CheckboxDropdownFilter
          filterOptions={skuOptions}
          label="Choose SKU"
          labelText={false}
          selectedValues={selectedSkus}
          handleChange={handleSkuChange}
        />
      </div>

      <Dimmer active={isLoading} inverted>
        <Loader active />
      </Dimmer>
      <div id="sales-projection-graph" className={styles.graph} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  salesProjectionResults: getSalesProjectionResults(state),
});

export default connect(mapStateToProps)(SalesProjectionGraph);
