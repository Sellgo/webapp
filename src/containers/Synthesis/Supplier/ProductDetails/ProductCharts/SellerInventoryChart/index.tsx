import React, { useState } from 'react';
import Chart from '../../../../../../components/Chart/Chart';
import './index.scss';
import _ from 'lodash';

export default ({ sellerInventories }: any) => {
  // true if you wanna sum up the seller inventories for the time series,
  // false if you want a stacked bar breakdown of each seller's inventory.
  const SHOW_SUM = true;
  const data: any = [];
  const totalSeries: any = [];

  for (const key in sellerInventories) {
    data.push({
      type: 'column',
      name: sellerInventories[key].name,
      data: sellerInventories[key].data,
      totalValue: sellerInventories[key].data
        .map((dataPoint: any) => dataPoint[1])
        .reduce((total: number, value: number) => total + value),
    });

    sellerInventories[key].data.forEach((dataPoint: any) => {
      const pointDate = dataPoint[0];
      const pointInventory = dataPoint[1];
      if (pointDate in totalSeries) {
        totalSeries[pointDate][1] += pointInventory;
      } else {
        totalSeries[pointDate] = _.cloneDeep(dataPoint);
      }
    });
  }

  data.push({
    type: 'column',
    name: 'Total',
    color: '#4AD991',
    data: Object.keys(totalSeries).map((key: any) => {
      return totalSeries[key];
    }),
  });

  data.sort((a: any, b: any) => {
    if (a.totalValue > b.totalValue) return 1;
    if (a.totalValue < b.totalValue) return -1;
    return 0;
  });

  const [pieData, setPieData] = useState(
    data
      .filter((item: any) => item.name !== 'Total')
      .map((item: any) => {
        return {
          name: item.name,
          y: item.totalValue,
          visible: true,
        };
      })
  );

  const sellerInventoryChartOptions = {
    chart: {
      zoomType: 'x',
      type: 'column',
    },
    title: {
      text: 'Inventory',
      margin: 50,
      align: 'left',
    },
    xAxis: [
      {
        type: 'datetime',
        crosshair: true,
      },
    ],
    yAxis: [
      {
        allowDecimals: false,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineWidth: 2,
        title: {
          text: 'Inventory',
          align: 'high',
          style: {
            color: 'black',
          },
        },
        labels: {
          format: '{value}',
          style: {
            color: 'black',
          },
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'center',
    },
    series: SHOW_SUM
      ? data.filter((item: any) => item.name === 'Total')
      : data.filter((item: any) => item.name !== 'Total'),
    plotOptions: {
      column: {
        stacking: 'normal',
        groupPadding: 0.05,
        pointPadding: 0.01,
        cropThreshold: 5,
        borderWidth: 0.1,
        borderRadius: 3,
        cursor: 'pointer',
        minPointLength: 10,
      },
      series: {
        animation: false,
        events: {
          legendItemClick: SHOW_SUM
            ? undefined
            : (e: any) => {
                const newPieData = _.cloneDeep(pieData);
                const item = newPieData.find((item: any) => item.name === e.target.name);
                if (item) {
                  item.visible = !e.target.visible;
                }

                setPieData(newPieData);
              },
        },
        point: {
          events: {
            mouseOver: (e: any) => {
              const x = e.target.x;
              const newPieData: any = [];

              if (SHOW_SUM) {
                for (const key in sellerInventories) {
                  const sellerDataPoint = sellerInventories[key].data.find(
                    (dataPoint: any) => dataPoint[0] === x
                  );

                  if (sellerDataPoint) {
                    newPieData.push({
                      name: sellerInventories[key].name,
                      y: sellerDataPoint[1],
                      visible: true,
                    });
                  }
                }
              } else {
                e.target.series.chart.series.forEach((series: any) => {
                  const item = series.data.find((item: any) => item.category === x);
                  if (series.visible && item) {
                    newPieData.push({ name: series.name, y: item.y, visible: true });
                  }
                });
              }

              setPieData(newPieData);
            },
          },
        },
      },
    },
  };

  const marketSharePieChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Market Share',
      margin: 50,
      align: 'left',
    },
    series: {
      name: 'Market Share',
      colorByPoint: true,
      data: pieData.filter((item: any) => item.visible),
    },
    tooltip: {
      pointFormat: '{point.y} ({point.percentage:.1f}%)',
    },
    plotOptions: {
      series: {
        animation: false,
      },
    },
  };

  return (
    <div className="seller-inventory-charts">
      <div className="seller-inventory-charts__time-series">
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={sellerInventoryChartOptions} />
        </div>
      </div>
      <div className="seller-inventory-charts__pie-chart">
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={marketSharePieChartOptions} />
        </div>
      </div>
    </div>
  );
};
