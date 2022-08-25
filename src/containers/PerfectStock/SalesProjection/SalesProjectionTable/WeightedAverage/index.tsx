import React, { useEffect } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import history from '../../../../../history';
/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Components */
import ToggleRadio from '../../../../../components/ToggleRadio';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
  onChange: (rowData: any) => void;
}

const WeightedAverage = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;
  const defaultWeightActivated =
    rowData.weighted_average_included === true || rowData.weighted_average_included === 'true';
  const defaultWeightL30D = rowData.avg_l30d_weight || 0;
  const defaultWeightL90D = rowData.avg_l90d_weight || 0;
  const defaultWeightL7D = rowData.avg_l7d_weight || 0;
  const defaultWeightL61D90D = rowData.avg_61d_90d_weight || 0;
  const defaultWeightL31D60D = rowData.avg_31d_60d_weight || 0;
  const defaultWeightN30D = rowData.avg_n30d_ly_weight || 0;
  const defaultWeightN90D = rowData.avg_n90d_ly_weight || 0;

  const handleWeightedAverageToggle = (weightedAverageActivated: boolean) => {
    updateSalesProjectionProduct({
      id: rowData.id,
      updatePayload: {
        weighted_average_included: weightedAverageActivated ? 'true' : 'false',
      },
    });
  };

  useEffect(() => {
    const chartMount = document.getElementById(`pie-graph-${rowData.id}`);
    if (chartMount) {
      Highcharts.chart({
        chart: {
          plotShadow: false,
          type: 'pie',
          renderTo: `pie-graph-${rowData.id}`,
          backgroundColor: 'transparent',
        },
        title: {
          text: '',
          floating: true,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            cursor: 'arrow',
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: '',
            colorByPoint: true,
            type: 'pie',
            data: [
              {
                name: 'Last 90 Days',
                y: parseFloat(defaultWeightL90D),
              },
              {
                name: 'Last 61-90 Days',
                y: parseFloat(defaultWeightL61D90D),
              },
              {
                name: 'Last 31-60 Days',
                y: parseFloat(defaultWeightL31D60D),
              },
              {
                name: 'Last 30 Days',
                y: parseFloat(defaultWeightL30D),
              },
              {
                name: 'Last 7 Days',
                y: parseFloat(defaultWeightL7D),
              },
              {
                name: 'Next 30 Days',
                y: parseFloat(defaultWeightN30D),
              },
              {
                name: 'Next 90 Days',
                y: parseFloat(defaultWeightN90D),
              },
            ],
          },
        ],
      });
    }
  }, [rowData]);
  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.inventoryThresholdCell}`}
      >
        <ToggleRadio
          isToggled={defaultWeightActivated}
          handleChange={() => handleWeightedAverageToggle(!defaultWeightActivated)}
          label="Weighted"
          className={styles.settingToggle}
        />
        <div
          id={`pie-graph-${rowData.id}`}
          className={`${styles.pieChart} ${
            defaultWeightActivated ? '' : styles.pieChart__disabled
          }`}
          onClick={() => history.push('/settings/aistock/weighted-average-sales')}
        />
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(WeightedAverage);
