import React from 'react';
import { Feed, Grid, Card, Sticky } from 'semantic-ui-react';
import SupplierCharts from './SupplierCharts';

const SupplierDetails = () => {
  const [isStickyChartActive, setStickyChartActive] = React.useState(false);
  return (
    <>
      <Sticky active={isStickyChartActive} offset={20}>
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
      </Sticky>
    </>
  );
};

export default SupplierDetails;
