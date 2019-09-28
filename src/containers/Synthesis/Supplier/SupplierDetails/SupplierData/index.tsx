import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Image, Icon, Card, Feed } from 'semantic-ui-react';
import get from 'lodash/get';
import { fetchSupplierProductsTrackData } from '../../../../../actions/Suppliers';

interface SupplierDataProps {
  supplierID: any;
  productsTrackData: any;
  fetchSupplierProductsTrackData: (supplierID: any) => void;
}
class SupplierData extends Component<SupplierDataProps> {
  componentDidMount() {
    const { supplierID, fetchSupplierProductsTrackData } = this.props;
    fetchSupplierProductsTrackData(supplierID);
  }

  render() {
    const { productsTrackData } = this.props;
    return (
      <Card.Group itemsPerRow={3}>
        <Card raised={true}>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="Avg Daily Units Sold" />
                  <Feed.Summary>
                    {productsTrackData.daily_sales === null
                      ? ''
                      : Number(productsTrackData.daily_sales).toLocaleString()}
                  </Feed.Summary>
                  <Divider />
                  <Feed.Date content="Avg BB Price/ Fees" />
                  <Feed.Summary>
                    {productsTrackData.fees === null
                      ? ''
                      : Number(productsTrackData.fees).toLocaleString()}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
        <Card raised={true}>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="Avg Daily Revenue/ Profit" />
                  <Feed.Summary>
                    {productsTrackData.profit === null
                      ? ''
                      : Number(productsTrackData.profit).toLocaleString()}
                  </Feed.Summary>
                  <Divider />
                  <Feed.Date content="Avg ROI/ ROII" />
                  <Feed.Summary>
                    {productsTrackData.roi === null
                      ? ''
                      : Number(productsTrackData.roi).toLocaleString()}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
        <Card raised={true}>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="Avg Daily Rank" />
                  <Feed.Summary>
                    {productsTrackData.daily_rank === null
                      ? ''
                      : Number(productsTrackData.daily_rank).toLocaleString()}
                  </Feed.Summary>
                  <Divider />
                  <Feed.Date content="Avg LQS" />
                  <Feed.Summary>
                    {productsTrackData.daily_rank === null
                      ? ''
                      : Number(productsTrackData.daily_rank).toLocaleString()}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  productsTrackData: get(state, 'supplier.trackData'),
});

const mapDispatchToProps = {
  fetchSupplierProductsTrackData: (supplierID: any) => fetchSupplierProductsTrackData(supplierID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierData);
