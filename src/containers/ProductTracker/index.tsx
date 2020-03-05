import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import get from 'lodash/get';
import PageHeader from '../../components/PageHeader';
import ProductFilters from './ProductFilter/index';
import ProductTrackerTable from './ProductTrackerTable';
import './index.scss';
import QuotaMeter from '../../components/QuotaMeter';
import { connect } from 'react-redux';
import { setMenuItem, fetchAllSupplierProductTrackerDetails } from '../../actions/ProductTracker';
import { updateProductTrackingStatus } from '../../actions/Suppliers';
import { getSellerQuota } from '../../actions/Settings';

interface ProductTrackerProps {
  fetchAllTrackedProductDetails: (periodValue: any) => void;
  getSellerQuota: any;
  singlePageItemsCount: any;
  productTrackerPageNo: any;
  setMenuItem: (item: any) => void;
  filterRanges: any;
  activeGroupId: any;
  trackGroups: any;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any,
    currentState?: any,
    type?: string
  ) => void;
}
class ProductTracker extends React.Component<ProductTrackerProps> {
  state = {
    periodValue: 14,
    productTrackID: null,
  };

  componentDidMount() {
    const { fetchAllTrackedProductDetails } = this.props;
    const { periodValue } = this.state;
    this.props.setMenuItem(this.state.productTrackID);
    fetchAllTrackedProductDetails(periodValue);
  }

  handlePeriodDrop = (data: any) => {
    this.setState({ periodValue: data.value }, () => {
      this.props.getSellerQuota();
      this.props.fetchAllTrackedProductDetails(this.state.periodValue);
    });
  };

  handleMenu = (id: any) => {
    if (id !== null) {
      this.setState({ productTrackID: id }, () => {
        this.props.setMenuItem(this.state.productTrackID);
      });
    } else {
      this.setState({ productTrackID: null }, () => {
        this.props.setMenuItem(null);
      });
    }
  };

  handleUntrack = (id: any, trackId: any) => {
    const { updateProductTrackingStatus } = this.props;
    const currentState = {
      periodValue: this.state.periodValue,
      productTrackID: this.state.productTrackID,
      singlePageItemsCount: this.props.singlePageItemsCount,
      productTrackerPageNo: this.props.productTrackerPageNo,
    };
    updateProductTrackingStatus(
      'inactive',
      undefined,
      trackId,
      id,
      'tracker',
      undefined,
      currentState,
      'untrack'
    );
    this.setState({
      confirm: false,
    });
  };

  handleMoveGroup = (groupId: any, productTrackId: any) => {
    const { updateProductTrackingStatus } = this.props;
    const currentState = {
      periodValue: this.state.periodValue,
      productTrackID: this.state.productTrackID,
      singlePageItemsCount: this.props.singlePageItemsCount,
      productTrackerPageNo: this.props.productTrackerPageNo,
    };
    updateProductTrackingStatus(
      'active',
      undefined,
      productTrackId,
      groupId,
      'tracker',
      undefined,
      currentState,
      'move-group'
    );
  };

  render() {
    const { productTrackerPageNo, trackGroups, activeGroupId } = this.props;
    const currentGroupName = activeGroupId
      ? activeGroupId !== -1
        ? trackGroups
          ? trackGroups.find((group: any) => group.id === activeGroupId).name
          : ''
        : 'Ungrouped'
      : 'All Groups';

    return (
      <>
        <PageHeader
          title={`Product Tracker - ${currentGroupName}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Product Tracker', to: '/product-tracker' },
            { content: `${currentGroupName}` },
          ]}
          callToAction={<QuotaMeter />}
        />
        <Segment basic={true} className="tracker-setting">
          <Grid className="product-tracker">
            <Grid.Row>
              <Grid.Column className="left-column" floated="left">
                <ProductFilters
                  handlePeriodDrop={(data: any) => this.handlePeriodDrop(data)}
                  periodValue={this.state.periodValue}
                />
              </Grid.Column>

              <Grid.Column className="right-column" floated="right">
                <div className="search-product" />
                <ProductTrackerTable
                  handleMenu={(id: any) => this.handleMenu(id)}
                  periodValue={this.state.periodValue}
                  handleUntrack={(id: any, trackId: any) => this.handleUntrack(id, trackId)}
                  handleMoveGroup={(id: any, trackId: any) => this.handleMoveGroup(id, trackId)}
                  productTrackerPageNo={productTrackerPageNo}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    singlePageItemsCount: get(state, 'productTracker.singlePageItemsCount'),
    productTrackerPageNo: get(state, 'productTracker.productTrackerCurrentPageNo'),
    filterRanges: get(state, 'productTracker.filterRanges'),
    activeGroupId: get(state, 'productTracker.menuItem'),
    trackGroups: get(state, 'productTracker.trackerGroup'),
  };
};

const mapDispatchToProps = {
  fetchAllTrackedProductDetails: (periodValue: any) =>
    fetchAllSupplierProductTrackerDetails(periodValue),
  setMenuItem: (item: any) => setMenuItem(item),
  getSellerQuota: () => getSellerQuota(),
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any,
    currentState?: any,
    type?: string
  ) =>
    updateProductTrackingStatus(
      status,
      productID,
      productTrackerID,
      productTrackerGroupID,
      name,
      supplierID,
      currentState,
      type
    ),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTracker);
