import React, { useState, useEffect, useRef } from 'react';
import Chart from '../../../../../../components/Chart/Chart';
import './index.scss';
import _ from 'lodash';
import { MINUTES_IN_A_DAY } from '../../../../../../utils/date';
import { filterPeriods } from '../../../../../../constants/Tracker';

// types for the time series
export enum SHOW_TYPE {
  ProductLevelInventory,
  SumOfSellerLevelInventory,
  SellerLevelInventory,
}

interface Series {
  yAxis: number;
  type: string;
  name: string;
  data: [number, number][];
  totalValue?: number;
  color: string;
  step?: boolean;
  zIndex?: number;
}

export default ({
  productRanks,
  productInventories,
  sellerInventories,
  period,
  xMin,
  xMax,
  currentShowType = SHOW_TYPE.ProductLevelInventory,
}: {
  productRanks: [number, number][];
  productInventories: [number, number][];
  sellerInventories: { [key: string]: { name: string; data: [number, number][]; color: string } };
  period: number;
  xMin?: number;
  xMax?: number;
  currentShowType?: SHOW_TYPE;
}) => {
  const showRanks = true;
  const showOthers = true;
  const data: Series[] = [];
  let sellerSumSeries: any = [];
  const pieRef: any = useRef(null);
  const colors = [
    '#A3A0FB',
    '#607EFA',
    '#55D8FD',
    '#A0F1FB',
    '#FD73E8',
    '#FD8373',
    '#FDA373',
    '#FEDA83',
    '#F9FE83',
    '#5EE2A0',
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
        .map(dataPoint => dataPoint[1])
        .reduce((total: number, value: number) => total + value),
      color: sellerInventories[key].color,
    });

    sellerInventories[key].data.forEach(dataPoint => {
      const pointDate = dataPoint[0];
      const pointInventory = dataPoint[1];
      if (pointDate in sellerSumSeries) {
        sellerSumSeries[pointDate][1] += pointInventory;
      } else {
        sellerSumSeries[pointDate] = _.cloneDeep(dataPoint);
      }
    });
  }
  sellerSumSeries = Object.keys(sellerSumSeries).map((key: any) => {
    return sellerSumSeries[key];
  });

  // use an 'Others' series to reconcile discrepancies between product-level & sum of seller-level inventories
  let otherSeries: Series | null | undefined = null;
  if (showOthers) {
    const otherSeriesData: [number, number][] = [];
    let totalValue = 0;
    const sellerSumSeriesDateValueMap: { [key: number]: number } = {};
    sellerSumSeries.forEach((item: [number, number]) => {
      sellerSumSeriesDateValueMap[item[0]] = item[1];
    });

    productInventories.forEach((item: [number, number]) => {
      const pointDate = item[0];
      const sellerSumInventory = sellerSumSeriesDateValueMap[pointDate]
        ? sellerSumSeriesDateValueMap[pointDate]
        : 0;
      const productInventory = item[1];
      const inventoryDiff = productInventory - sellerSumInventory;
      if (inventoryDiff > 0) {
        otherSeriesData.push([pointDate, inventoryDiff]);
        totalValue += inventoryDiff;
      }
    });
    otherSeriesData.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });

    otherSeries = {
      yAxis: 1,
      type: 'column',
      name: 'Other',
      data: otherSeriesData,
      totalValue: totalValue,
      color: '#000000',
    };

    data.push(otherSeries);
  }

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
      data: sellerSumSeries,
    });
  }

  // sort series by total value
  data.sort((a, b) => {
    if (a.totalValue && b.totalValue) {
      if (a.totalValue > b.totalValue) return 1;
      if (a.totalValue < b.totalValue) return -1;
    }
    return 0;
  });

  // initialize pie chart data state
  const [pieData, setPieData] = useState(
    data
      .filter(item => item.name !== 'Inventory')
      .map(item => {
        return {
          name: item.name,
          y: item.totalValue,
          color: item.color,
          visible: true,
        };
      })
  );

  // initialize yAxisOptions of time series chart
  const inventoryDataPoints = sellerSumSeries.map((item: any) => item[1]);
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
      color: '#FD4F1E',
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
    title: null,
    xAxis: [
      {
        type: 'datetime',
        min: xMin,
        max: xMax,
        minTickInterval: MINUTES_IN_A_DAY,
        crosshair: {
          snap: false,
        },
      },
    ],
    yAxis: timeSeriesYAxisOptions,
    tooltip: {
      shared: true,
      followPointer: true,
      followTouchMove: true,
      stickOnContact: true,
      xDateFormat:
        period === filterPeriods.data[filterPeriods.data.length - 1].value
          ? '%a, %b %e'
          : '%a, %b %e, %k:%M',
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
        : data.filter((item: any) => item.name !== 'Inventory' || item.name !== 'Other'),
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
        marker: {
          enabled: false,
        },
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

              if (showOthers && otherSeries) {
                const otherDataPoint = otherSeries.data.find(dataPoint => dataPoint[0] === x);
                if (otherDataPoint) {
                  newPieData.push({
                    name: otherSeries.name,
                    y: otherDataPoint[1],
                    visible: true,
                    color: otherSeries.color,
                  });
                }
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
    title: null,
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
