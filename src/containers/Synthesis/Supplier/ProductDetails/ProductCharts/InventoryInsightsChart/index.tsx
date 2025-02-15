import React, { Component, createRef } from 'react';
import { defaultButtonTheme } from '../../../../../../components/Chart/Chart';
import './index.scss';
import _ from 'lodash';
import { MINUTES_IN_A_DAY, MILLISECONDS_IN_A_DAY } from '../../../../../../utils/date';
import { filterPeriods } from '../../../../../../constants/Tracker';
import Highcharts from 'highcharts';
import TimeSeriesChart from './TimeSeriesChart';
import PieChart from './PieChart';

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
  data: [number, number | null][];
  totalValue?: number;
  color: string;
  step?: boolean;
  zIndex?: number;
}

export interface PieItem {
  name: string;
  x?: number;
  y: number | null;
  color: string;
  visible: boolean;
}

export interface InventoryInsightsChartProps {
  productCategory?: string;
  productRanks: [number, number | null][];
  productInventories: [number, number | null][];
  sellerInventories: { [key: string]: { name: string; data: [number, number][]; color: string } };
  period: number;
  xMin?: number;
  xMax?: number;
  currentShowType?: SHOW_TYPE;
}

export interface InventoryInsightsChartState {
  allData: Series[];
  showRanks: boolean;
  initialPieData: PieItem[];
  defaultPieData: PieItem[];
  activePieData: PieItem[];
  pinnedPoint?: Highcharts.Point;
  unpinBtnRef?: any;
  timeSeriesChartOptions: any;
  marketSharePieChartOptions: any;
}

const defaultPieData: PieItem[] = [
  {
    name: '',
    x: 0,
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
const defaultUnpinBtnRef: any | undefined = undefined;

const rankColor = '#FD4F1E';
const inventorySumColor = '#4AD991';

const sortByYDescending = (a: any, b: any) => {
  if (a.y && b.y && a.y >= b.y) return -1;
  if (a.y && b.y && a.y < b.y) return 1;
  return 0;
};
const sortByTotalValueAscending = (a: any, b: any) => {
  if (a.totalValue && b.totalValue) {
    if (a.totalValue >= b.totalValue) return 1;
    if (a.totalValue < b.totalValue) return -1;
  }
  return 0;
};

class InventoryInsightsChart extends Component<
  InventoryInsightsChartProps,
  InventoryInsightsChartState
> {
  static defaultProps = {
    currentShowType: SHOW_TYPE.ProductLevelInventory,
  };

  timeSeriesRef: any = createRef();

  state = {
    allData: defaultAllData,
    showRanks: true,
    initialPieData: defaultPieData,
    defaultPieData: defaultPieData,
    activePieData: defaultPieData,
    pinnedPoint: defaultPinnedPoint,
    unpinBtnRef: defaultUnpinBtnRef,
    timeSeriesChartOptions: {
      chart: {
        zoomType: 'x',
        height: 372, // 400 - seller-inventory-charts__title's height
        alignTicks: false,
        animation: false,
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
        animation: false,
        hideDelay: 10,
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
        areaspline: {
          gapSize: MILLISECONDS_IN_A_DAY,
          gapUnit: 'value',
        },
        series: {
          animation: false,
          marker: {
            enabled: false,
          },
          states: {
            inactive: {
              enabled: false,
            },
          },
        },
      },
    },
    marketSharePieChartOptions: {
      lang: {
        noData: 'No seller inventory',
      },
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
        percentAlign: -20,
        verticalAlign: 'middle',
      },
      series: {
        name: 'Market Share',
        innerSize: '50%',
      },
      tooltip: {
        headerFormat:
          '<span style="font-size: 18px;color:{point.color}">●</span>' +
          '<span style="font-size: 12px;font-weight:bold;"> {point.key}</span><br/>',
        style: {
          color: 'white',
          opacity: 0.9,
        },
        backgroundColor: '#757575',
        shadow: false,
        borderWidth: 0,
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        padding: 0,
        itemMarginTop: 7,
        itemMarginBottom: 7,
        margin: 8,
        itemStyle: {
          fontWeight: 'normal',
        },
        labelFormat: '{percentage:.1f}% {name}',
        tooltip: true,
        width: '40%',
      },
      plotOptions: {
        pie: {
          center: ['50%', '50%'],
          showInLegend: true,
          dataLabels: {
            enabled: false,
          },
        },
        series: {
          innerSize: '50%',
          animation: false,
          point: {
            events: {
              legendItemClick: function(e: any) {
                e.preventDefault();
              },
            },
          },
        },
      },
    },
  };

  componentDidMount() {
    const {
      productCategory,
      productRanks,
      productInventories,
      sellerInventories,
      period,
      xMin,
      xMax,
      currentShowType,
    } = this.props;
    const { showRanks } = this.state;

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
    const dateFormat =
      period === filterPeriods.data[filterPeriods.data.length - 1].value
        ? '%a, %b %e'
        : '%a, %b %e, %k:%M';

    // format series data
    for (const key in sellerInventories) {
      sellerInventories[key].color = colors[data.length % colors.length];

      data.push({
        yAxis: 0,
        type: 'areaspline',
        name: sellerInventories[key].name,
        data: sellerInventories[key].data,
        totalValue: sellerInventories[key].data
          .map(dataPoint => dataPoint[1])
          .reduce((total: number, value: number) => total + value, 0),
        color: sellerInventories[key].color,
      });

      sellerInventories[key].data.forEach(dataPoint => {
        const pointDate = dataPoint[0];
        const pointInventory = dataPoint[1];
        pointDate in sellerSumSeries
          ? (sellerSumSeries[pointDate][1] += pointInventory)
          : (sellerSumSeries[pointDate] = _.cloneDeep(dataPoint));
      });
    }
    sellerSumSeries = Object.keys(sellerSumSeries).map((key: any) => {
      return sellerSumSeries[key];
    });

    // push sum series to data
    const sumData: Series = {
      yAxis: 0,
      type: 'areaspline',
      name: 'Inventory',
      data:
        currentShowType === SHOW_TYPE.ProductLevelInventory ? productInventories : sellerSumSeries,
      color: inventorySumColor,
    };
    data.push(sumData);

    data.sort(sortByTotalValueAscending);

    // initialize yAxisOptions of time series chart
    const inventoryDataPoints = sellerSumSeries.map((item: any) => item[1]);
    const inventoryYMin = Math.min(...inventoryDataPoints) - 2; //avoid hiding shortest data column
    const inventoryYMax = Math.max(...inventoryDataPoints) + 1;
    const timeSeriesYAxisOptions: any = [
      {
        min: inventoryYMin !== Infinity && inventoryYMin > 0 ? inventoryYMin : 0,
        max: inventoryYMax !== -Infinity ? inventoryYMax : null,
        allowDecimals: false,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        endOnTick: false,
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
        color: rankColor,
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
        labels: {
          formatter: function(label: any) {
            return label.value < 1000000 ? label.value : label.value / 1000000 + 'M';
          },
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        endOnTick: false,
        title: {
          text: 'Rank',
          align: 'high',
          style: {
            color: 'black',
          },
        },
      });
    }

    const latestTimeStamp = data
      .filter(item => item.name !== 'Inventory' && item.name !== 'Rank')
      .flatMap(item => item.data)
      .map(item => item[0])
      .reduce((a, b) => Math.max(a, b), 0);

    // initialize pie chart data state
    const initialPieData: PieItem[] = data
      .filter(item => item.name !== 'Inventory' && item.name !== 'Rank')
      .filter(item => item.data.find(point => point[0] === latestTimeStamp))
      .map(item => {
        const latestPoint = item.data.find(point => point[0] === latestTimeStamp);
        const y = latestPoint ? latestPoint[1] : 0;
        return {
          name: item.name,
          x: latestTimeStamp,
          y: y,
          color: item.color,
          visible: true,
        };
      })
      .sort(sortByYDescending);

    const newTimeSeriesChartOptions = {
      yAxis: timeSeriesYAxisOptions,
      xAxis: {
        min: xMin,
        max: xMax,
      },
      tooltip: {
        formatter: function(tooltip: any) {
          if (
            currentShowType === SHOW_TYPE.ProductLevelInventory ||
            currentShowType === SHOW_TYPE.SumOfSellerLevelInventory
          ) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const tooltipContext: any = this;
            const timeStamp = new Date(tooltipContext.x).getTime();

            let tooltipString = `<span style=font-size:10px>`;
            tooltipString += `${Highcharts.dateFormat(dateFormat, timeStamp)}`;
            tooltipString += `</span><br/>`;

            if (productCategory && productRanks.length > 0) {
              tooltipString += `Category: <b>${productCategory}</b> <br/>`;
            }

            [
              { name: 'Rank', color: rankColor },
              { name: 'Inventory', color: inventorySumColor },
            ].forEach(series => {
              const point = tooltipContext.points.find((p: any) => p.series.name === series.name);
              tooltipString += `<span style="color:${series.color}">●</span> ${series.name}: `;
              tooltipString += `<b>${
                point ? Highcharts.numberFormat(point.y, 0) : 'Unknown'
              }</b><br>`;
            });

            return tooltipString;
          } else {
            return tooltip.defaultFormatter.call(this, tooltip);
          }
        },
        positioner: (boxWidth: number, boxHeight: number, point: any) => {
          const chart = this.timeSeriesRef.current.chart,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            distance = 5,
            pointX = point.plotX,
            pointY = point.plotY;
          let x: number = pointX + plotLeft + (chart.inverted ? distance : -boxWidth - distance),
            y: number = pointY - boxHeight + plotTop + 15, // point is 15 pixels up from tooltip bottom
            alignedRight;

          if (x < 7) x = plotLeft + pointX + distance; // too far left, adjust it

          // Test if tooltip is too far right,
          // if so, move it to be inside and then up to not cover the point.
          if (x + boxWidth > plotLeft + plotWidth) {
            x -= x + boxWidth - (plotLeft + plotWidth);
            y = pointY - boxHeight + plotTop - distance;
            alignedRight = true;
          }
          // If it is now above the plot area, align it to the top of the plot area
          if (y < plotTop + 5) {
            y = plotTop + 5;
            // If tooltip is still covering the point, move it below instead
            if (alignedRight && pointY >= y && pointY <= y + boxHeight) {
              y = pointY + plotTop + distance; // below
            }
          }
          // If tooltip is below chart, move it up. Better to cover the point than to
          // disappear outside the chart.
          if (y + boxHeight > plotTop + plotHeight) {
            y = Math.max(plotTop, plotTop + plotHeight - boxHeight - distance); // below
          }

          return { x: x, y: y };
        },
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
        series: {
          trackByArea: true,
          events: {
            legendItemClick:
              currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
              currentShowType === SHOW_TYPE.ProductLevelInventory
                ? undefined
                : (e: any) => {
                    const newPieData = _.cloneDeep(this.state.activePieData);
                    const item = newPieData.find((item: any) => item.name === e.target.name);
                    if (item) item.visible = !e.target.visible;

                    this.setState({ activePieData: newPieData });
                  },
          },
          point: {
            events: {
              mouseOver: (e: any) => {
                this.setState({
                  activePieData: this._getPieDataOfEventPoint(e.target),
                  defaultPieData:
                    (this.state.pinnedPoint &&
                      this._getPieDataOfEventPoint(this.state.pinnedPoint)) ||
                    this._getPieDataOfEventPoint(e.target),
                });
              },
              mouseOut: () => {
                this.setState({ activePieData: this.state.defaultPieData });
              },
            },
          },
        },
      },
    };

    const newMarketSharePieChartOptions = {
      tooltip: {
        pointFormat:
          '<span style="font-size: 11px">{point.x:' +
          dateFormat +
          '}</span><br>Inventory: <b>{point.y}</b><br>Share: <b>{point.percentage:.1f}%</b>',
      },
    };

    // update state with processed props
    this.setState(prevState => ({
      allData: data,
      initialPieData: initialPieData,
      defaultPieData: initialPieData,
      activePieData: initialPieData,
      timeSeriesChartOptions: _.merge(
        _.cloneDeep(prevState.timeSeriesChartOptions),
        newTimeSeriesChartOptions
      ),
      marketSharePieChartOptions: _.merge(
        _.cloneDeep(prevState.marketSharePieChartOptions),
        newMarketSharePieChartOptions
      ),
    }));
  }

  // get pie data on time series chart
  _getPieDataOfEventPoint = (point: any) => {
    const { currentShowType = SHOW_TYPE.SumOfSellerLevelInventory } = this.props;
    const { allData } = this.state;

    const x = point.x;
    const chartSeries = point.series.chart.series;
    const newPieData: PieItem[] = [];

    if (
      currentShowType === SHOW_TYPE.SumOfSellerLevelInventory ||
      currentShowType === SHOW_TYPE.ProductLevelInventory
    ) {
      allData.forEach(series => {
        if (series.name === 'Inventory' || series.name === 'Rank') return;
        const sellerDataPoint = series.data.find((dataPoint: any) => dataPoint[0] === x);
        if (sellerDataPoint) {
          newPieData.push({
            name: series.name,
            x: x,
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
            x: x,
            y: item.y,
            visible: true,
            color: item.color,
          });
        }
      });
    }

    newPieData.sort(sortByYDescending);

    return newPieData;
  };

  handleTimeSeriesClick(chart: any) {
    const point = chart.hoverPoint;
    if (!point) return;

    const xAxis = chart.xAxis[0];
    const plotLineObject = {
      value: point.x,
      color: '#000000',
      width: 1,
      zIndex: 3,
      id: 'pinnedColumn',
    };
    // function to render unpin button
    const showUnpinButton = () => {
      const unpinBtnRef = chart.renderer
        .button(
          'Unpin',
          chart.plotBox.x + 10,
          chart.plotBox.y + 5,
          null,
          defaultButtonTheme.theme,
          defaultButtonTheme.theme.states.hover
        )
        .attr({ zIndex: 3, id: 'unpinButton' })
        .on('click', () => {
          xAxis.removePlotLine('pinnedColumn');
          if (this.state.unpinBtnRef) this.state.unpinBtnRef.destroy();
          this.setState({
            pinnedPoint: undefined,
            unpinBtnRef: undefined,
            defaultPieData: this.state.initialPieData,
          });
        })
        .add();
      this.setState({ unpinBtnRef: unpinBtnRef });
    };
    // handle point pinning
    if (!this.state.pinnedPoint) {
      xAxis.addPlotLine(plotLineObject);
      if (this.state.unpinBtnRef) this.state.unpinBtnRef.destroy();
      showUnpinButton();
      this.setState({
        pinnedPoint: point,
        defaultPieData: this._getPieDataOfEventPoint(point),
      });
    } else if (this.state.pinnedPoint && this.state.pinnedPoint !== point) {
      xAxis.removePlotLine('pinnedColumn');
      xAxis.addPlotLine(plotLineObject);
      if (this.state.unpinBtnRef) this.state.unpinBtnRef.destroy();
      showUnpinButton();
      this.setState({
        pinnedPoint: point,
        defaultPieData: this._getPieDataOfEventPoint(point),
      });
    }
  }

  render() {
    const { timeSeriesChartOptions, marketSharePieChartOptions, activePieData } = this.state;

    return (
      <div className="seller-inventory-charts">
        <div className="seller-inventory-charts__title">Inventory Insights</div>
        <TimeSeriesChart
          handleClick={() => this.handleTimeSeriesClick(this.timeSeriesRef.current.chart)}
          chartOptions={timeSeriesChartOptions}
          componentRef={this.timeSeriesRef}
        />
        <PieChart chartOptions={marketSharePieChartOptions} pieData={activePieData} />
      </div>
    );
  }
}

export default InventoryInsightsChart;
