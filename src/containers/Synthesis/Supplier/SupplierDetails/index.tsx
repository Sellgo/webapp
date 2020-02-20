import React from 'react';
import { connect } from 'react-redux';
import { Feed, Grid, Card } from 'semantic-ui-react';
import SupplierCharts from './SupplierCharts';

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
            <div className="supplier-details-card">
              <Card.Content>
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
            </div>
          </Card>
        </Grid.Row>
      </Grid.Column>
    </div>
  );
};

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(SupplierDetails);
