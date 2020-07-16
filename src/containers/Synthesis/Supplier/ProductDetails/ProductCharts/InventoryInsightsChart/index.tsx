import React, { Component } from 'react';
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

export interface Series {
  yAxis: number;
  type: string;
  name: string;
  data: [number, number][];
  totalValue?: number;
  color: string;
  step?: boolean;
  zIndex?: number;
}

export interface PieItem {
  name: string;
  y: number;
  color: string;
  visible: boolean;
}

export interface InventoryInsightsChartProps {
  productRanks: [number, number][];
  productInventories: [number, number][];
  sellerInventories: { [key: string]: { name: string; data: [number, number][]; color: string } };
  period: number;
  xMin?: number;
  xMax?: number;
  currentShowType?: SHOW_TYPE;
}

export interface InventoryInsightsChartState {
  allData: Series[];
  showOthers: boolean;
  showRanks: boolean;
  initialPieData: PieItem[];
  defaultPieData: PieItem[];
  activePieData: PieItem[];
  pinnedPoint?: Highcharts.Point;
  timeSeriesChartOptions: any;
  marketSharePieChartOptions: any;
}

const defaultPieData: PieItem[] = [
  {
    name: '',
    y: 0,
    color: '',
    visible: false,
  },
];

const defaultAllData: Series[] = [
  {
    yAxis: 0,
    type: '',
    name: '',
    data: [],
    color: '',
  },
];

const defaultPinnedPoint: Highcharts.Point | undefined = undefined;

const inventorySumColor = '#4AD991';
const pinnedPointPattern = '#000000';

class InventoryInsightsChart extends Component<
  InventoryInsightsChartProps,
  InventoryInsightsChartState
> {
  state = {
    allData: defaultAllData,
    showOthers: true,
    showRanks: true,
    initialPieData: defaultPieData,
    defaultPieData: defaultPieData,
    activePieData: defaultPieData,
    pinnedPoint: defaultPinnedPoint,
    timeSeriesChartOptions: {
      chart: {
        zoomType: 'x',
        type: 'column',
        height: 372, // 400 - seller-inventory-charts__title's height
      },
      title: null,
      xAxis: {
        type: 'datetime',
        minTickInterval: MINUTES_IN_A_DAY,
        crosshair: {
          snap: false,
        },
      },
      tooltip: {
        shared: true,
        followPointer: true,
        followTouchMove: true,
        stickOnContact: true,
      },
      legend: {
        align: 'center',
      },
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
        },
      },
    },
    marketSharePieChartOptions: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 372, // 400 - seller-inventory-charts__title's height
      },
      title: {
        style: { fontSize: '20px' },
        align: 'center',
        verticalAlign: 'middle',
      },
      series: {
        name: 'Market Share',
        innerSize: '50%',
      },
      tooltip: {
        pointFormat: '{point.y} ({point.percentage:.1f}%)',
      },
      plotOptions: {
        pie: {
          center: ['50%', '50%'],
        },
        series: {
          innerSize: '50%',
          animation: false,
        },
      },
    },
  };
  static defaultProps = {
    currentShowType: SHOW_TYPE.SumOfSellerLevelInventory,
  };

  componentDidMount() {
    const {
      productRanks,
      productInventories,
      sellerInventories,
      period,
      xMin,
      xMax,
      currentShowType,
    } = this.props;
    const { showRanks, showOthers } = this.state;

    const data: Series[] = [];
    let sellerSumSeries: any = [];
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
      '#4BB480',
    ];

    // format series data
    for (const key in sellerInventories) {
      sellerInventories[key].color = colors[data.length % colors.length];

      data.push({
        yAxis: 0,
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
        if (a[0] >= b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
      });

      otherSeries = {
        yAxis: 0,
        type: 'column',
        name: 'Other',
        data: otherSeriesData,
        totalValue: totalValue,
        color: '#000000',
      };

      data.push(otherSeries);
    }

    // push sum series to data
    const sumData: Series = {
      yAxis: 0,
      type: 'column',
      name: 'Inventory',
      data:
        currentShowType === SHOW_TYPE.ProductLevelInventory ? productInventories : sellerSumSeries,
      color: inventorySumColor,
    };
    data.push(sumData);

    // sort series by total value
    data.sort((a, b) => {
      if (a.totalValue && b.totalValue) {
        if (a.totalValue >= b.totalValue) return 1;
        if (a.totalValue < b.totalValue) return -1;
      }
      return 0;
    });

    // initialize yAxisOptions of time series chart
    const inventoryDataPoints = sellerSumSeries.map((item: any) => item[1]);
    const inventoryYMin = Math.min(...inventoryDataPoints) - 2; //avoid hiding shortest data column
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
      data.push({
        yAxis: 1,
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

      timeSeriesYAxisOptions.push({
        min: rankYMin !== Infinity && rankYMin > 0 ? rankYMin : 0,
        max: rankYMax !== -Infinity ? rankYMax : null,
        opposite: true,
        yAxis: 1,
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

    // initialize pie chart data state
    const latestTimeStamp = data
      .filter(item => item.name !== 'Inventory')
      .filter(item => (showOthers ? true : item.name !== 'Other'))
      .flatMap(item => item.data)
      .map(item => item[0])
      .reduce((a, b) => Math.max(a, b), 0);
    const initialPieData: PieItem[] = data
      .filter(item => item.name !== 'Inventory')
      .filter(item => (showOthers ? true : item.name !== 'Other'))
      .filter(item => item.data.find(point => point[0] === latestTimeStamp))
      .map(item => {
        const latestPoint = item.data.find(point => point[0] === latestTimeStamp);
        const y = latestPoint ? latestPoint[1] : 0;
        return {
          name: item.name,
          y: y,
          color: item.color,
          visible: true,
        };
      });

    this.setState(prevState => ({
      allData: data,
      initialPieData: initialPieData,
      defaultPieData: initialPieData,
      activePieData: initialPieData,
      timeSeriesChartOptions: _.merge(_.cloneDeep(prevState.timeSeriesChartOptions), {
        yAxis: timeSeriesYAxisOptions,
        xAxis: {
          min: xMin,
          max: xMax,
        },
        tooltip: {
          xDateFormat:
            period === filterPeriods.data[filterPeriods.data.length - 1].value
              ? '%a, %b %e'
              : '%a, %b %e, %k:%M',
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
          series: {
            events: {
              legendItemClick:
                currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
                currentShowType === SHOW_TYPE.ProductLevelInventory
                  ? undefined
                  : (e: any) => {
                      const newPieData = _.cloneDeep(this.state.activePieData);
                      const item = newPieData.find((item: any) => item.name === e.target.name);
                      if (item) {
                        item.visible = !e.target.visible;
                      }

                      this.setState({ activePieData: newPieData });
                    },
            },
            point: {
              events: {
                mouseOver: (e: any) => {
                  this.setState({ activePieData: this._getPieDataOfEventPoint(e.target) });
                },
                mouseOut: () => {
                  this.setState({ activePieData: this.state.defaultPieData });
                },
                click: (e: any) => {
                  /**
                   * Clicking an inventory column will pin the pie chart to it.
                   * 1. If no column is pinned, pin it.
                   * 2. If there is a pinned column and another column is clicked,
                   * revert pinned column color and pin new column.
                   * 3. If there is a pinned column and the pinned column is clicked,
                   * revert its color, unpin it and return to initial pie chart.
                   */
                  if (!this.state.pinnedPoint) {
                    e.point.update({ color: pinnedPointPattern });
                    this.setState({
                      pinnedPoint: e.point,
                      defaultPieData: this._getPieDataOfEventPoint(e.point),
                    });
                  } else if (this.state.pinnedPoint && this.state.pinnedPoint !== e.point) {
                    this.state.pinnedPoint.update({ color: inventorySumColor });
                    e.point.update({ color: pinnedPointPattern });
                    this.setState({
                      pinnedPoint: e.point,
                      defaultPieData: this._getPieDataOfEventPoint(e.point),
                    });
                  } else if (this.state.pinnedPoint && this.state.pinnedPoint === e.point) {
                    this.state.pinnedPoint.update({ color: inventorySumColor });
                    this.setState({
                      pinnedPoint: undefined,
                      defaultPieData: this.state.initialPieData,
                    });
                  }
                },
              },
            },
          },
        },
      }),
    }));
  }

  // get pie data on time series chart
  _getPieDataOfEventPoint = (point: any) => {
    const { currentShowType = SHOW_TYPE.SumOfSellerLevelInventory } = this.props;
    const { showOthers, allData } = this.state;

    const x = point.x;
    const chartSeries = point.series.chart.series;
    const newPieData: PieItem[] = [];

    if (
      currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
      currentShowType === SHOW_TYPE.ProductLevelInventory
    ) {
      allData.forEach(series => {
        if (
          (series.name === 'Others' && !showOthers) ||
          series.name === 'Inventory' ||
          series.name === 'Rank'
        )
          return;
        const sellerDataPoint = series.data.find((dataPoint: any) => dataPoint[0] === x);
        if (sellerDataPoint) {
          newPieData.push({
            name: series.name,
            y: sellerDataPoint[1],
            visible: true,
            color: series.color,
          });
        }
      });
    } else {
      chartSeries.forEach((series: any) => {
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

    newPieData.sort((a, b) => {
      if (a.y >= b.y) return 1;
      if (a.y < b.y) return -1;
      return 0;
    });

    return newPieData;
  };

  render() {
    const { timeSeriesChartOptions, marketSharePieChartOptions, activePieData } = this.state;

    const pieSum = activePieData
      .filter((item: any) => item.visible)
      .map(i => i.y)
      .reduce((a, b) => {
        const c = a ? a : 0;
        const d = b ? b : 0;
        return c + d;
      }, 0);

    const pieChartOptions = _.merge(_.cloneDeep(marketSharePieChartOptions), {
      title: {
        text: `<b>${pieSum}<b> <br>Inventory`,
      },
      series: {
        data: activePieData.filter((item: any) => item.visible),
      },
    });

    return (
      <div className="seller-inventory-charts">
        <div className="seller-inventory-charts__title">Inventory Insights</div>
        <div className="seller-inventory-charts__time-series">
          <div style={{ position: 'relative', width: '100%' }}>
            <Chart chartOptions={timeSeriesChartOptions} />
          </div>
        </div>
        <div className="seller-inventory-charts__pie-chart">
          <div style={{ position: 'relative', width: '100%' }}>
            <Chart chartOptions={pieChartOptions} />
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryInsightsChart;
