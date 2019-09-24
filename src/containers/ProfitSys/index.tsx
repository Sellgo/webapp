import * as React from 'react';
import {
  Button,
  Progress,
  Divider,
  Segment,
  Grid,
  Card,
  Radio,
  Dropdown,
  Popup,
  Icon,
} from 'semantic-ui-react';
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
            <Grid.Column width={4} className={'profitSysLeft'}>
              <Card className={''}>
                <Card.Content>
                  <Card.Header>OUR ADVICE</Card.Header>
                  <p>We're still gathering data for this supplier</p>
                  <Divider fitted />
                  <span>
                    Track liked product
                    <Radio toggle checked={true} /> ON
                  </span>
                </Card.Content>
              </Card>
              <p className={'products'}>xxx of xxx products</p>
              <Divider fitted />
              <div className="searchDropdown">
                <Dropdown placeholder="Select" fluid search selection />
              </div>
              <div className={'basicKpi'}>
                <p>
                  Basic KPI
                  <Popup
                    className={'addSupplierPopup'}
                    trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
                    position="top left"
                    size="tiny"
                  />
                </p>
                <Icon name="angle up" size={'small'} color={'grey'} />
              </div>
            </Grid.Column>
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
