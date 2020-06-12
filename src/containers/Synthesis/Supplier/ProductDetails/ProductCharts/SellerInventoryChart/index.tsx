import React, { useState } from 'react';
import Chart from '../../../../../../components/Chart/Chart';
import './index.scss';

export default ({ sellerInventories }: any) => {
  const [hoveredData, setHoveredData] = useState(null);

  const data: any = [];
  for (const [key, value] of Object.entries(sellerInventories)) {
    data.push({
      type: 'spline',
      name: key,
      data: value,
    });
  }

  const sellerInventoryChartOptions = {
    chart: {
      zoomType: 'x',
      type: 'spline',
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
      series: {
        point: {
          events: {
            mouseOver: (e: any) => {
              console.log(e);
              const i = e.target.index;
              const hoveredData: any = [];
              e.target.series.chart.series.forEach((series: any) => {
                hoveredData.push({ name: series.name, y: series.data[i].y });
              });

              console.log(hoveredData);
              setHoveredData(hoveredData);
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
      data: hoveredData,
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
