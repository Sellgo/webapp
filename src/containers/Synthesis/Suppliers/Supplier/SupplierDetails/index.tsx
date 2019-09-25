import React from 'react';
import { connect } from 'react-redux';
import { Feed, Divider, Grid, Card } from 'semantic-ui-react';
import SupplierCharts from './SupplierCharts';
import SupplierData from './SupplierData';

const SupplierDetails = (props: any) => {
  const { supplierID } = props;
  return (
    <div>
      <Grid.Column width={4} floated="left">
        <Grid.Row>
          <Card
            raised={true}
            style={{
              width: '100%',
              transition: 'width 0.4s',
            }}
          >
            <Card.Content>
              <SupplierData supplierID={supplierID} />
              <Divider />
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Summary>
                      <SupplierCharts supplierID={supplierID} />
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid.Column>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDetails);
