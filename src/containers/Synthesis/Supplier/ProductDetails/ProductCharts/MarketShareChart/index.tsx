import React, { useState, useEffect, useRef } from 'react';
import Chart from '../../../../../../components/Chart/Chart';
import './index.scss';
import _ from 'lodash';

// types for the time series
export enum SHOW_TYPE {
  ProductLevelInventory,
  SumOfSellerLevelInventory,
  SellerLevelInventory,
}

export default ({
  productRanks,
  productInventories,
  sellerInventories,
  currentShowType = SHOW_TYPE.SumOfSellerLevelInventory,
}: any) => {
  const showRanks = true;
  const data: any = [];
  let totalSeries: any = [];
  const pieRef: any = useRef(null);
  const colors = [
    '#7cb5ec',
    '#434348',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#2b908f',
    '#f45b5b',
    '#91e8e1',
  ];

  // format series data
  for (const key in sellerInventories) {
    sellerInventories[key].color = colors[data.length % colors.length];

    data.push({
      yAxis: showRanks ? 1 : 0,
      type: 'column',
      name: sellerInventories[key].name,
      data: sellerInventories[key].data,
      totalValue: sellerInventories[key].data
        .map((dataPoint: any) => dataPoint[1])
        .reduce((total: number, value: number) => total + value),
      color: sellerInventories[key].color,
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

  // format `total` series data
  totalSeries = Object.keys(totalSeries).map((key: any) => {
    return totalSeries[key];
  });
  if (currentShowType === SHOW_TYPE.ProductLevelInventory) {
    data.push({
      yAxis: showRanks ? 1 : 0,
      type: 'column',
      name: 'Inventory',
      color: '#4AD991',
      data: productInventories,
    });
  } else {
    data.push({
      yAxis: showRanks ? 1 : 0,
      type: 'column',
      name: 'Inventory',
      color: '#4AD991',
      data: totalSeries,
    });
  }

  // sort series by total value
  data.sort((a: any, b: any) => {
    if (a.totalValue > b.totalValue) return 1;
    if (a.totalValue < b.totalValue) return -1;
    return 0;
  });

  // initialize pie chart data state
  const [pieData, setPieData] = useState(
    data
      .filter((item: any) => item.name !== 'Inventory')
      .map((item: any) => {
        return {
          name: item.name,
          y: item.totalValue,
          color: item.color,
          visible: true,
        };
      })
  );

  // initialize yAxisOptions of time series chart
  const inventoryDataPoints = totalSeries.map((item: any) => item[1]);
  const inventoryYMin = Math.min(...inventoryDataPoints);
  const inventoryYMax = Math.max(...inventoryDataPoints, 0);
  const timeSeriesYAxisOptions: any = [
    {
      min: inventoryYMin !== Infinity && inventoryYMin > 0 ? inventoryYMin : 0,
      max: inventoryYMax !== -Infinity ? inventoryYMax : null,
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
  ];

  // update data and options if showing rank
  if (showRanks) {
    data.unshift({
      yAxis: 0,
      type: 'line',
      step: true,
      name: 'Rank',
      color: '#FD8373',
      data: productRanks,
      zIndex: 2,
    });

    const rankDataPoints = productRanks.map((item: any) => item[1]);
    const rankYMin = Math.min(...rankDataPoints);
    const rankYMax = Math.max(...rankDataPoints);

    timeSeriesYAxisOptions[0] = { ...timeSeriesYAxisOptions[0], opposite: true, yAxis: 1 };

    timeSeriesYAxisOptions.unshift({
      min: rankYMin !== Infinity && rankYMin > 0 ? rankYMin : 0,
      max: rankYMax !== -Infinity ? rankYMax : null,
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      lineWidth: 2,
      title: {
        text: 'Rank',
        align: 'high',
        style: {
          color: 'black',
        },
      },
    });
  }

  // options for time series chart
  const timeSeriesChartOptions = {
    chart: {
      zoomType: 'x',
      type: 'column',
    },
    title: {
      text: showRanks ? 'Rank vs Inventory' : 'Inventory',
      margin: 50,
      align: 'left',
    },
    xAxis: [
      {
        type: 'datetime',
        crosshair: true,
      },
    ],
    yAxis: timeSeriesYAxisOptions,
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'center',
    },
    series:
      currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
      currentShowType === SHOW_TYPE.ProductLevelInventory
        ? data.filter(
            (item: any) =>
              item.name === 'Inventory' || (showRanks ? item.name === 'Rank' : undefined)
          )
        : data.filter((item: any) => item.name !== 'Inventory'),
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
          legendItemClick:
            currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
            currentShowType === SHOW_TYPE.ProductLevelInventory
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

              if (
                currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
                currentShowType === SHOW_TYPE.ProductLevelInventory
              ) {
                for (const key in sellerInventories) {
                  const sellerDataPoint = sellerInventories[key].data.find(
                    (dataPoint: any) => dataPoint[0] === x
                  );

                  if (sellerDataPoint) {
                    newPieData.push({
                      name: sellerInventories[key].name,
                      y: sellerDataPoint[1],
                      visible: true,
                      color: sellerInventories[key].color,
                    });
                  }
                }
              } else {
                e.target.series.chart.series.forEach((series: any) => {
                  const item = series.data.find((item: any) => item.category === x);
                  if (series.visible && item) {
                    newPieData.push({
                      name: series.name,
                      y: item.y,
                      visible: true,
                      color: item.color,
                    });
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

  // options for pie chart
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

  // fix for pie chart not rendering sometimes
  useEffect(() => {
    if (pieRef && pieRef.current && pieRef.current.chart) {
      pieRef.current.chart.update(marketSharePieChartOptions, true, true, false);
    }
  });

  return (
    <div className="seller-inventory-charts">
      <div className="seller-inventory-charts__time-series">
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={timeSeriesChartOptions} />
        </div>
      </div>
      <div className="seller-inventory-charts__pie-chart">
        <div style={{ position: 'relative', width: '100%' }}>
          <Chart chartOptions={marketSharePieChartOptions} componentRef={pieRef} />
        </div>
      </div>
    </div>
  );
};
