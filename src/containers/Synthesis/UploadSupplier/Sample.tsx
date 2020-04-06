import React from 'react';
// Import Highcharts
import Highcharts from 'highcharts/highstock';
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from 'highcharts-react-official';

// const options = {
//   chart: {
//     type: "pie"
//   },
//   series: [
//     {
//       data: [
//         {
//           y: 100
//         },
//         {
//           y: 50
//         }
//       ]
//     }
//   ]
// };

// interface PieChartData {
//     name: string;
//     y: number;
//     sliced: boolean;
//     selected: boolean;
//     color: string;
//   }

// interface PieChartOptions {
//     title: string;
//     name: string;
//     data: PieChartData[];
//   }

// interface Props {
//     options: any;
// }

class Sample extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // chart: {
      //     type: "pie"
      //   },
      //   title: {
      //     text: 'Earth\'s Atmospheric Composition',
      //     style: {
      //         fontSize: '10px',
      //     }
      //   },
      //   series: [
      //     {
      //         name: 'Product',
      //       data: [
      //         {
      //             name: 'Argon',
      //             y: 100,
      //             color: '#4ad991'
      //         },
      //         {
      //             name: 'Marlon',
      //             y: 50,
      //             color: '#fd8373'
      //         }
      //       ]
      //     }
      //   ],
      //   plotOptions: {
      //     pie: {
      //       showInLegend: {
      //         layout: 'vertical',
      //         backgroundColor: '#FFFFFF',
      //         floating: true,
      //         align: 'left',
      //         verticalAlign: 'top',
      //         x: 90,
      //         y: 45
      //     },
      //       dataLabels: {
      //         format: '{point.name}: {point.percentage:.1f} %'
      //         },
      //     }
      //   },
      //   xAxis: {
      //     title: { text: '<b>Total</b>' },

      // },

      chart: {
        type: 'pie',
      },
      title: {
        text: '',
        margin: 0,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          size: '145px',
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 145,
            },
            chartOptions: {
              plotOptions: {
                pie: {
                  size: '145px',
                  dataLabels: {
                    alignTo: 'connectors',
                  },
                },
              },
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          name: 'name',
          colorByPoint: true,
          data: [
            {
              name: 'Argon',
              y: 100,
              color: '#4ad991',
            },
            {
              name: 'Marlon',
              y: 50,
              color: '#fd8373',
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <h2>Highcharts</h2>
        <PieChart highcharts={Highcharts} options={this.state} />
      </div>
    );
  }
}

export default Sample;
