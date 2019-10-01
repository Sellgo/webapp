import * as React from 'react';
import { Button, Progress, Divider, Segment, Grid } from 'semantic-ui-react';
import ProfitSysLeftPanel from './leftFilterPanel';
import PageHeader from '../../components/PageHeader';
import LineChart from '../../components/Chart/LineChart';
import ProfitSysTable from './ProfitSysTable';
import './profitSys.css';

const options = {
  chart: {
    type: 'areaspline',
  },
  title: {
    text: 'Select your favourite chart:',
    align: 'center',
    y: 390,
  },
  yAxis: {
    title: {
      text: 'Statistics',
    },
  },
  tooltip: {
    shared: true,
    valueSuffix: ' units',
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.5,
    },
  },
  series: [
    {
      name: 'data 1',
      data: [3, 4, 3, 5, 4, 10, 12],
    },
    {
      name: 'data 2',
      data: [1, 3, 4, 3, 3, 5, 4],
    },
  ],
};

class ProfitSys extends React.Component<any, {}> {
  public render() {
    return (
      <>
        <PageHeader
          title={'Profit Synthesis of <Supplier Name>'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Profit Syn', to: '/synthesis' },
            { content: 'Supplier Name' },
          ]}
          callToAction={
            <div className={'pageHeadRight'}>
              <Progress percent={10} size="tiny">
                80 tracked out of 100
              </Progress>
              <Button primary={true} className="add-new-supplier">
                Upgrade
              </Button>
            </div>
          }
        />

        <Divider fitted />
        <Grid className={'profitSysWrap'}>
          <Grid.Column mobile={6} tablet={6} computer={4} className={'profitSysLeft'}>
            <ProfitSysLeftPanel />
          </Grid.Column>
          <Grid.Column mobile={10} tablet={10} computer={12}>
            <Segment>
              <LineChart options={options} />
            </Segment>
            <ProfitSysTable />

            <div className="showMore">Show More Results</div>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default ProfitSys;
