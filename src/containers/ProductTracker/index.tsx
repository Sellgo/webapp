import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import get from 'lodash/get';
import PageHeader from '../../components/PageHeader';
import ProductFilters from './ProductFilter/index';
import ProductTrackerTable from './ProductTrackerTable';
import './index.scss';
import QuotaMeter from '../../components/QuotaMeter';
import { connect } from 'react-redux';
import { fetchSupplierProductTrackerDetails, setMenuItem } from '../../actions/ProductTracker';

interface ProductTrackerProps {
  productTracker: (periodValue: any, groupID: any, perPage: any, pageNo: any) => void;
  singlePageItemsCount: any;
  productTrackerPageNo: any;
  setMenuItem: (item: any) => void;
  filterRanges: any;
  setMenu: any;
}
class ProductTracker extends React.Component<ProductTrackerProps> {
  state = {
    periodValue: 20,
    productTrackID: 1,
  };

  componentDidMount() {
    const { productTracker, singlePageItemsCount, productTrackerPageNo } = this.props;
    const { periodValue, productTrackID } = this.state;
    this.props.setMenuItem(this.state.productTrackID);
    productTracker(periodValue, productTrackID, singlePageItemsCount, productTrackerPageNo);
  }

  shouldComponentUpdate(nextProps: any) {
    if (
      this.props !== nextProps &&
      this.props.singlePageItemsCount !== nextProps.singlePageItemsCount
    ) {
      this.props.productTracker(
        this.state.periodValue,
        this.state.productTrackID,
        nextProps.singlePageItemsCount,
        this.props.productTrackerPageNo
      );
      return true;
    }
    if (this.props.productTrackerPageNo !== nextProps.productTrackerPageNo) {
      this.props.productTracker(
        this.state.periodValue,
        this.state.productTrackID,
        nextProps.singlePageItemsCount,
        nextProps.productTrackerPageNo
      );
      return true;
    }
    // if(this.props.filterRanges !==undefined && (JSON.stringify(this.props.filterRanges) !== JSON.stringify(nextProps.filterRanges))){
    //   this.props.productTracker(
    //     this.state.periodValue,
    //     this.state.productTrackID,
    //     nextProps.singlePageItemsCount,
    //     nextProps.productTrackerPageNo,
    //     nextProps.filterRanges.avg_daily_sales,
    //     nextProps.filterRanges.avg_profit,
    //     nextProps.filterRanges.avg_margin,
    //     nextProps.filterRanges.avg_roi
    //   );
    // }
    return false;
  }

  handlePeriodDrop = (data: any) => {
    this.setState(
      {
        periodValue: data.value,
      },
      () =>
        this.props.productTracker(
          this.state.periodValue,
          this.state.productTrackID,
          this.props.singlePageItemsCount,
          this.props.productTrackerPageNo
        )
    );
  };
  handleMenu = (id: any) => {
    this.setState(
      {
        productTrackID: id,
      },
      () => {
        this.props.setMenuItem(this.state.productTrackID);
        this.props.productTracker(
          this.state.periodValue,
          this.state.productTrackID,
          this.props.singlePageItemsCount,
          this.props.productTrackerPageNo
        );
      }
    );
  };

  render() {
    return (
      <>
        <PageHeader
          title=""
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Product Tracker', to: '/product-tracker' },
            { content: 'All Groups' },
          ]}
          callToAction={<QuotaMeter />}
        />
        <Segment basic={true} className="tracker-setting">
          <Grid className="product-tracker">
            <Grid.Row>
              <Grid.Column className="left-column" floated="left">
                <ProductFilters handlePeriodDrop={(data: any) => this.handlePeriodDrop(data)} />
              </Grid.Column>

              <Grid.Column className="right-column" floated="right">
                <div className="search-product">
                  {/* <label>Search Your Product:</label>
                  <Search placeholder="Search UPC/ASIN" /> */}
                </div>
                <ProductTrackerTable
                  handleMenu={(id: any) => this.handleMenu(id)}
                  productTrackID={this.state.productTrackID}
                  periodValue={this.state.periodValue}
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
    productTrackerPageNo: get(state, 'productTracker.productTrackerPageNo'),
    filterRanges: get(state, 'productTracker.filterRanges'),
    setMenu: get(state, 'productTracker.menuItem'),
  };
};

const mapDispatchToProps = {
  productTracker: (periodValue: any, groupID: any, perPage: any, pageNo: any) =>
    fetchSupplierProductTrackerDetails(periodValue, groupID, perPage, pageNo),
  setMenuItem: (item: any) => setMenuItem(item),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTracker);
