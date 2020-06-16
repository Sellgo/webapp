import React, { useState } from 'react';
import Chart from '../../../../../../components/Chart/Chart';
import './index.scss';
import _ from 'lodash';

export default ({ sellerInventories }: any) => {
  const data: any = [];
  for (const key in sellerInventories) {
    data.push({
      type: 'column',
      name: sellerInventories[key].name,
      data: sellerInventories[key].data,
      totalValue: sellerInventories[key].data
        .map((dataPoint: any) => dataPoint[1])
        .reduce((total: number, value: number) => total + value),
    });
  }

  data.sort((a: any, b: any) => {
    if (a.totalValue > b.totalValue) return 1;
    if (a.totalValue < b.totalValue) return -1;
    return 0;
  });

  const [pieData, setPieData] = useState(
    data.map((item: any) => {
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
      text: 'Seller Inventories',
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
    series: data,
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
          legendItemClick: (e: any) => {
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
              e.target.series.chart.series.forEach((series: any) => {
                const item = series.data.find((item: any) => item.category === x);
                if (series.visible && item) {
                  newPieData.push({ name: series.name, y: item.y, visible: true });
                }
              });

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
