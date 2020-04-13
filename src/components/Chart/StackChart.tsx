import React from 'react';
import Chart from './Chart';
/* import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { autofill } from 'redux-form'; */

export interface StackChartOptions {
  title: string;
  data: any;
  productSKUs: any;
}

const renderStackChartOptions = (options: StackChartOptions, onBubbleDetails: Function) => {
  const { title, data, productSKUs } = options;
  return {
    chart: {
      type: 'column',
      zoomType: 'x',
      animation: {
        enabled: true,
        duration: 1000,
      },
    },

    title: {
      text: title,
      margin: 50,
      align: 'center',
    },
    xAxis: {
      categories: productSKUs,
      // max:10,
      visible: false,
    },
    yAxis: {
      // min: 0,
      // gridLineWidth: 0,
      // minorGridLineWidth: 0,
      title: {
        text: 'Sub-revenue($)',
      },
      stackLabels: {
        enabled: true,
        alignValue: 'center',
        formatter: function(this: any): string {
          return `<b>ROI ${data[3].data[this.x]} %</b>`;
        },

        style: {
          fontWeight: 'bold',
          color: 'grey',
        },
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      animation: true,
      borderWidth: 0.1,
      borderRadius: 3,
      distance: 75,
      shadow: true,
      crosshairs: true,
      followPointer: true,
      followTouchMove: true,

      /* outside: true,
      style: {
        padding: 0
      },
      headerFormat: '<large>{point.x} </large><table>',
      pointFormat:  '<tr><td style="">{series.name}</td>' 
                    + '<td style="text-align: right"><b>{point.y} USD</b></td></tr>' 
                    + '<tr><td style="">ROI:</td>' 
                    + '<td style="text-align: right"><b>{data[3].data[this.point.x]} %</td></tr>',
      footerFormat: '</table>',
      valueDecimals: '2',
      //shared: true,
      useHTML: true, */

      /* stickyTracking: true,
      snap: '10/25',
      headerFormat: '<span style="font-size: 16px">{point.x}</span><br/>',
      pointFormat: '<span style="font-size: 16px">{series.name}: {point.y} {point.percentage}%</span><br/>',
      valueDecimals: '2', */

      /* useHTML: true,
      headerFormat: '<large>{point.x} </small><table>',
      pointFormat:  '<tr><td style="color: {series.color}">{series.name}</td>' 
                    + '<td style="text-align: right"><b>{point.y} USD</b></td></tr>',
      footerFormat: '</table>', */

      /* formatter: function(this: any) {
        //return 'The ' + this.series.name + '<\n>' + '</b> is <b>' + this.point.y;
        var tooltip;
            if (this.series.name == 'Profit($)') {
              tooltip =  '<span style="font-size: 16px">' + this.series.name + '</span style="font-size: 16px">: <b>' 
              + '<span style="font-size: 16px">' + this.point.y  +  '</span style="font-size: 16px"> (<b>' 
              + '<span style="font-size: 16px">' + Highcharts.numberFormat(this.point.percentage, 0) 
              + '</span style="font-size: 16px">% from MSRP $</b>' 
              + '<span style="font-size: 16px">' + this.point.total + '</b><br/>';
            }
            else if (this.series.name == 'Amz Fee($)') {
              tooltip =  '<span style="font-size: 16px">' + this.series.name + '</span style="font-size: 16px">: <b>' 
              + '<span style="font-size: 16px">' + this.point.y  +  '</span style="font-size: 16px"> (<b>' 
              + '<span style="font-size: 16px">' + Highcharts.numberFormat(this.point.percentage, 0) 
              + '</span style="font-size: 16px">%)</b>'  + '</b><br/>';
            }
            else if (this.series.name == 'COGS($)') {
              tooltip =  '<span style="font-size: 16px">' + this.series.name + '</span style="font-size: 16px">: <b>' 
              + '<span style="font-size: 16px">' + this.point.y  +  '</span style="font-size: 16px"> (<b>' 
              + '<span style="font-size: 16px">' + Highcharts.numberFormat(this.point.percentage, 0) 
              + '</span style="font-size: 16px">%)</b>'  + '</b><br/>';
            }
            else {
                tooltip =  '<span style="font-size: 16px">' + this.series.name + '</span style="font-size: 16px">: <b>' 
                + '<span style="font-size: 16px">' + this.point.y  +  '</span style="font-size: 16px"> (<b>' 
                + '<span style="font-size: 16px">' + Highcharts.numberFormat(this.point.percentage, 0)  
                + '</span style="font-size: 16px">% of MSRP $</b>' + '<span style="font-size: 16px">' 
                + this.point.total  + '</span style="font-size: 16px">)<b>' + data[3].data[this.point.x] +'</b><br/>';
            
            return tooltip;
      }, */

      //RP: combine use formatter and HTML, need to optimize the data picking - begin
      outside: true,
      formatter: function(this: any): string {
        let tooltip = '';
        tooltip = ` <tr><td style="font-size: 24px"><b>  ${this.x} </b></td></tr><table>
                        <tr><td style="">ASIN:</td> 
                          <td style="text-align: right"> ${data[6].data[this]}</td></tr>
                        <tr><td style="">UPC:</td> 
                          <td style="text-align: right"> ${data[7].data[this.point.x]}</td></tr>
                        
            
            
                        <tr><td style="">Price:</td> 
                          <td style="text-align: right"> ${data[5].data[this.point.x]} USD</td></tr>
                        <tr><td style="text-align: left"> ${this.point.series.name}</td> 
                          <td style="text-align: right"><b> ${this.point.y} USD</b></td></tr>
                        <tr><td style="">ROI:</td>
                          <td style="text-align: right"> ${data[3].data[this.point.x]} %</td></tr>
                        <tr><td style="">Category:</td>
                          <td style="text-align: right"> ${
                            data[4].data[this.point.series.name]
                          }</td></tr>
                       
                      `;

        return tooltip;
      },
      footerFormat: '</table>',
      valueDecimals: '2',
      useHTML: true,
    },
    //RP: combine use formatter and HTML, need to optimize the data picking - end

    legend: {
      align: 'left',
    },
    plotOptions: {
      column: {
        stacking: 'normal',

        groupPadding: 0.05,
        pointPadding: 0.01,
        borderWidth: 0.1,
        borderRadius: 3,
        gapSize: 3,
        edgeWidth: 1,

        shadow: false,

        dataLabels: {
          enabled: true,
          borderRadius: 2,
        },
      },
      series: {
        cursor: 'pointer',
        stacking: 'normal',

        //pointWidth: 20,

        events: {
          click: (e: any) => {
            onBubbleDetails(e.point.index);
          },
        },
      },
    },
    series: data

      //RP: need to optimize begin
      .filter((e: any) => {
        //to filter the data into shown in the stack chart
        return e.name !== 'ROI(%)';
      })
      .filter((e: any) => {
        //to filter the data into shown in the stack chart
        return e.name !== 'Price($)';
      })
      .filter((e: any) => {
        //to filter the data into shown in the stack chart
        return e.name !== 'ASIN';
      })
      .filter((e: any) => {
        //to filter the data into shown in the stack chart
        return e.name !== 'UPC';
      })
      //RP: need to optimize end

      .map((e: any) => {
        return { ...e, ...{ type: 'column' } };
      }),
  };
};

const StackChart = (props: any) => {
  const { options, onBubbleDetails } = props;
  const chartOptions = renderStackChartOptions(options, onBubbleDetails);
  return (
    <div className="individual-stack-chart">
      <Chart chartOptions={chartOptions} />
    </div>
  );
};

export default StackChart;
