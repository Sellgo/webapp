// @ts-nocheck
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getSalesProjectionResults } from '../../selectors/PerfectStock/SalesProjection';

interface Props {
  handleClick?: () => void;
  disabled?: boolean;
  id?: number;
}

const GraphDisplayButton = (props: Props) => {
  const { handleClick, disabled, id, salesProjectionResult } = props;

  const salesProjection = salesProjectionResult.find((result) => result.id === id);

  const salesAdjustment = Object.values(salesProjection.sales_adjustments).length
    ? [...Object.values(salesProjection.sales_adjustments)]
    : [];

  useEffect(() => {
    const chartMount = document.getElementById(`graph-display-${id}`);

    if (chartMount && salesAdjustment.length) {
      Highcharts.chart({
        chart: {
          type: 'area',
          renderTo: `graph-display-${id}`,
          backgroundColor: null,
          plotBorderWidth: null,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          plotShadow: false,
          borderWidth: 0,
          plotBorderWidth: 0,
          marginRight: 0,
        },
        tooltip: {
          userHTML: true,
          style: {
            padding: 0,
            width: 0,
            height: 0,
          },
        },
        title: {
          text: '',
        },
        xAxis: {
          enabled: false,
          showEmpty: false,
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
          },
          showEmpty: false,
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          line: {
            lineWidth: 1.5,
          },
          showInLegend: false,
          tooltip: {},
        },
        series: [
          {
            marker: {
              enabled: false,
            },
            animation: false,
            name: '',
            data: salesAdjustment,
          },
        ],
      });
    }
  }, [salesProjectionResult]);

  return (
    <button className={styles.graphDisplayButton} onClick={handleClick} disabled={disabled}>
      <div id={`graph-display-${id}`} className={styles.miniHighchart}></div>
    </button>
  );
};

const mapStateToProps = (state: any) => {
  return {
    salesProjectionResult: getSalesProjectionResults(state),
  };
};

export default memo(connect(mapStateToProps)(GraphDisplayButton));
