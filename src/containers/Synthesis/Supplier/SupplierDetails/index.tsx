import React from 'react';
import { Feed, Grid, Card } from 'semantic-ui-react';
import SupplierCharts from './SupplierCharts';

const SupplierDetails = (props: any) => {
  const [isStickyChartActive, setStickyChartActive] = React.useState(false);
  return (
    <>
      <Grid.Column floated="left">
        <Grid.Row>
          <Card
            raised={true}
            className={`${!isStickyChartActive ? 'active' : ''}`}
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
                        <SupplierCharts
                          isStickyChartActive={isStickyChartActive}
                          setStickyChartActive={setStickyChartActive}
                          onPageChange={props.onPageChange}
                        />
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </div>
          </Card>
        </Grid.Row>
      </Grid.Column>
    </>
  );
};

export default SupplierDetails;
