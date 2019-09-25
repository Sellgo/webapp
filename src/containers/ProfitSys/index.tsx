import * as React from 'react';
import { Button, Progress, Divider, Segment, Grid } from 'semantic-ui-react';
import ProfitSysLeftPanel from './ProfitSysLeftPanel';
import AdminLayout from '../../components/AdminLayout';
import './profitSys.css';

class ProfitSys extends React.Component<any, {}> {
  public render() {
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'Profit Synthesis of <Supplier Name>'}
        showBreadCrumb={true}
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
      >
        <>
          <Divider fitted />
          <Grid>
            <ProfitSysLeftPanel />
            <Grid.Column width={12}>
              <Segment></Segment>
            </Grid.Column>
          </Grid>
        </>
      </AdminLayout>
    );
  }
}

export default ProfitSys;
