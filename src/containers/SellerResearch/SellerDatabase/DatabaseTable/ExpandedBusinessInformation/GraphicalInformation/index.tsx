import React, { useEffect } from 'react';

// Styles
import styles from './index.module.scss';
import Highcharts from 'highcharts';

// Components

interface Props {
  rowData?: any;
  className?: string;
}
const GraphicalInformation = (props: Props) => {
  const { rowData, className } = props;
  console.log('14', rowData);

  const colors = ['#FF7723', '#0374FF'];

  const buildPieChart = (renderId: string, data: any) => {
    Highcharts.chart({
      chart: {
        plotShadow: false,
        type: 'pie',
        renderTo: `${renderId}`,
        backgroundColor: 'transparent',

        margin: [0, 0, 0, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
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
          size: '100%',
          dataLabels: {
            enabled: false,
          },
          colors: colors,
        },
      },
      series: [
        {
          name: '',
          colorByPoint: true,
          type: 'pie',
          data: data,
        },
      ],
    });
  };

  useEffect(() => {
    const chartMountBrands = document.getElementById(`pie-graph-brands-${rowData.merchant_id}`);
    if (chartMountBrands) {
      buildPieChart(`pie-graph-brands-${rowData.merchant_id}`, [
        {
          name: 'Top Brands',
          y: parseFloat('16.5'),
        },
        {
          name: '',
          y: parseFloat('52.2'),
        },
      ]);
    }
    const chartMountProducts = document.getElementById(`pie-graph-products-${rowData.merchant_id}`);
    if (chartMountProducts) {
      buildPieChart(`pie-graph-products-${rowData.merchant_id}`, [
        {
          name: 'Top Products',
          y: parseFloat('16.5'),
        },
        {
          name: '',
          y: parseFloat('52.2'),
        },
      ]);
    }
  }, [rowData]);

  return (
    <section className={className}>
      {/* Businnes informatiob */}
      <div className={styles.graphBlock}>
        <div>
          <p>Total brands {rowData?.whls_total_brand ?? 0}</p>
          <div
            id={`pie-graph-brands-${rowData.merchant_id}`}
            className={`${styles.pieChart} ${styles.pieChart__brands}`}
          />
        </div>

        <div>
          <p>Total Product {rowData?.whls_total_product ?? 0}</p>
          <div
            id={`pie-graph-products-${rowData.merchant_id}`}
            className={`${styles.pieChart} ${styles.pieChart__products}`}
          />
        </div>
      </div>
      {/* <div className={styles.graphBlock}>
        <div>
          <div>
            <p>Brand ownership</p>

            <div
              id={`pie-graph-brand-ownership-${rowData.merchant_id}`}
              className={`${styles.pieChart} ${styles.pieChart__brandsOwnership}`}
            />
          </div>
        </div>

        <div>
          <p>FBA percentage</p>
          <div
            id={`pie-graph-fba-percentage-${rowData.merchant_id}`}
            className={`${styles.pieChart} ${styles.pieChart__fba}`}
          />
        </div>
      </div> */}
    </section>
  );
};

export default GraphicalInformation;
