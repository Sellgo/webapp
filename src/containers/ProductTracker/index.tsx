import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import get from 'lodash/get';
import PageHeader from '../../components/PageHeader';
import ProductTrackerTable from './ProductTrackerTable';
import './index.scss';
import { connect } from 'react-redux';
import {
  setMenuItem,
  fetchAllSupplierProductTrackerDetails,
  setProductTrackerPageNumber,
  setTrackerSinglePageItemsCount,
  setProductFilterSearch,
  filterTrackedProducts,
} from '../../actions/ProductTracker';
import { updateProductTrackingStatus } from '../../actions/Suppliers';
import { getSellerQuota } from '../../actions/Settings';
import ProductSearch from '../../components/ProductSearch/productSearch';
import AsinSearch from './AsinSearch';
import { DEFAULT_PERIOD } from '../../constants/Tracker';

interface ProductTrackerProps {
  setFilterSearch: (value: string) => void;
  fetchAllTrackedProductDetails: (periodValue: any) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  getSellerQuota: any;
  singlePageItemsCount: any;
  productTrackerPageNo: any;
  setMenuItem: (item: any) => void;
  filterRanges: any;
  activeGroupId: any;
  trackGroups: any;
  match: any;
  filterProducts: (filterData: any, groupId: any) => void;
  setPageNumber: (itemsCount: any) => void;
  filterData: any;
  filterSearch: any;
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
  subscriptionType: string;
}

const filterStorage = JSON.parse(
  typeof localStorage.trackerFilter === 'undefined' ? null : localStorage.trackerFilter
);
class ProductTracker extends React.Component<ProductTrackerProps> {
  state = {
    searchValue: '',
    periodValue: filterStorage ? filterStorage.period : DEFAULT_PERIOD,
    productTrackID: null,
  };

  componentDidMount() {
    const { fetchAllTrackedProductDetails, setFilterSearch } = this.props;
    const { periodValue } = this.state;
    setFilterSearch('');
    this.props.setMenuItem(this.state.productTrackID);
    fetchAllTrackedProductDetails(periodValue);
  }

  componentWillUnmount() {
    localStorage.setItem('openPeriod', JSON.stringify(false));
  }

  handlePeriodDrop = (data: any) => {
    this.setState({ periodValue: data.value }, () => {
      this.props.getSellerQuota();
      this.props.fetchAllTrackedProductDetails(this.state.periodValue);
    });
  };

  handleMenu = (id: any) => {
    const { setPageNumber } = this.props;
    setPageNumber(1);

    //close period filter
    localStorage.setItem('openPeriod', JSON.stringify(false));
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

  searchTrackedProduct = (value: string) => {
    const {
      setSinglePageItemsCount,
      singlePageItemsCount,
      filterData,
      activeGroupId,
      setFilterSearch,
      filterProducts,
    } = this.props;
    this.setState({
      searchValue: value,
    });
    setFilterSearch(value);
    filterProducts(filterData, activeGroupId);
    setSinglePageItemsCount(singlePageItemsCount);
  };

  render() {
    const { productTrackerPageNo, trackGroups, activeGroupId, setPageNumber, match } = this.props;

    const { searchValue } = this.state;
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
          auth={match.params.auth}
        />
        <Segment basic={true} className="tracker-setting">
          <Grid className="product-tracker">
            <Grid.Row>
              <Grid.Column className="right-column">
                <div className={`ProductTracker__search`}>
                  <ProductSearch
                    searchFilteredProduct={this.searchTrackedProduct}
                    searchFilterValue={searchValue}
                    setCurrentPage={setPageNumber}
                  />
                  <AsinSearch />
                </div>
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
    filterData: get(state, 'productTracker.filterData'),
    filterSearch: get(state, 'productTracker.filterSearch'),
    subscriptionType: state.subscription.subscriptionType,
  };
};

const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setTrackerSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setProductTrackerPageNumber(pageNumber),
  filterProducts: (productData: any, groupId: any) => filterTrackedProducts(productData, groupId),
  fetchAllTrackedProductDetails: (periodValue: any) =>
    fetchAllSupplierProductTrackerDetails(periodValue),
  setMenuItem: (item: any) => setMenuItem(item),
  getSellerQuota: () => getSellerQuota(),
  setFilterSearch: (value: string) => setProductFilterSearch(value),
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
