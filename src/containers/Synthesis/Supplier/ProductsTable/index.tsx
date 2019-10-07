import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Icon, Segment, Loader, Grid, Image, Button } from 'semantic-ui-react';
import GenericTable, { Column } from '../../../../components/Table';
import { Link } from 'react-router-dom';
import { Product } from '../../../../interfaces/Product';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  fetchSupplierProductTrackerGroup,
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
} from '../../../../actions/Suppliers';
import get from 'lodash/get';
import { findFilterProducts } from '../../../../constants/Suppliers';

interface ProductsTableProps {
  supplierID: any;
  products: Product[];
  filterRanges: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  fetchProductTrackerGroup: (supplierID: any) => void;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any
  ) => void;
  openProductDetailModal: (product?: Product) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
}

class ProductsTable extends Component<ProductsTableProps> {
  renderProductInformation = (row: Product) => {
    const { supplierID, openProductDetailModal } = this.props;
    return (
      <Grid>
        <Grid.Column style={{ marginRight: 60 }} className={'middle aligned'}>
          <Image
            style={{ width: 'auto', height: 'auto', maxHeight: 80, maxWidth: 80 }}
            src={row.image_url === null ? '/images/intro.png' : row.image_url}
            // size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={10} className={'middle aligned'}>
          <Grid.Row
            as={Link}
            to={{}}
            onClick={() => {
              openProductDetailModal({ ...row, ...{ supplierID: supplierID } });
            }}
          >
            {row.title}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ display: 'inline-flex' }}>
              <Image
                style={{ width: 26, height: 26, marginRight: 10 }}
                src={'/images/atvpdkikx0der.png'}
              />
              {row.amazon_category_name}
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Button
            basic={true}
            style={{
              borderRadius: 100,
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            color="blue"
            onClick={() => {
              openProductDetailModal({ ...row, ...{ supplierID: supplierID } });
            }}
          >
            <h2 style={{ fontSize: 17 }}>{'View'}</h2>
          </Button>
        </Grid.Column>
      </Grid>
    );
  };

  renderTracker = (row: Product) => {
    const { productTrackerGroup, updateProductTrackingStatus } = this.props;
    return (
      <Button
        basic={true}
        style={{
          borderRadius: 20,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 15,
          paddingRight: 15,
        }}
        color={row.tracking_status === 'active' ? 'teal' : 'blue'}
        onClick={() => {
          let productTrackerGroupID = 2;
          if (productTrackerGroup.length > 0 && productTrackerGroup[0].id > 0) {
            productTrackerGroupID = productTrackerGroup[0].id;
            if (row.tracking_status !== null) {
              updateProductTrackingStatus(
                row.tracking_status === 'active' ? 'inactive' : 'active',
                undefined,
                row.product_track_id,
                undefined
              );
            } else {
              updateProductTrackingStatus(
                'active',
                row.product_id,
                undefined,
                productTrackerGroupID
              );
            }
          }
        }}
      >
        <h2 style={{ fontSize: 17 }}>
          {row.tracking_status === 'active' ? 'Untrack' : 'Track Now'}
        </h2>
      </Button>
    );
  };

  renderCompleted = (row: Product) => {
    return new Date(row.last_syn).toLocaleString();
  };

  handlePieChartModalOpen = (supplier: any) => {
    this.setState({ showPieChartModalOpen: true, supplier });
  };
  handleClose = () => {
    this.setState({ showPieChartModalOpen: false, supplier: undefined });
  };

  renderPLRatio = (row: Product) => {
    return <Icon name="chart pie" onClick={this.handlePieChartModalOpen.bind(this, row)} />;
  };

  renderAmazonProductLink = (row: Product) => {
    return (
      <a href={'//' + row.amazon_url.split('//')[1]} target="_blank">
        <Icon name="amazon" size={'large'} style={{ color: 'black' }} />
      </a>
    );
  };

  columns: Column[] = [
    {
      label: 'Product Information',
      dataKey: 'title',
      sortable: true,
      show: true,
      render: this.renderProductInformation,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Sales/Mo',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Profit/Mo',
      dataKey: 'profit_monthly',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Add To Tracker',
      dataKey: 'track',
      show: true,
      render: this.renderTracker,
    },
    {
      label: 'Last Synthesis',
      dataKey: 'last_syn',
      sortable: true,
      type: 'date',
      show: true,
      render: this.renderCompleted,
    },
    {
      label: 'Amazon',
      dataKey: 'amazon_url',
      show: true,
      render: this.renderAmazonProductLink,
    },
  ];

  componentDidMount() {
    const { supplierID, fetchProductTrackerGroup } = this.props;
    fetchProductTrackerGroup(supplierID);
  }

  render() {
    const { products, filterRanges, singlePageItemsCount, setSinglePageItemsCount } = this.props;

    if ((products.length === 1 && products[0] === undefined) || filterRanges === undefined) {
      return (
        <Segment>
          <Loader
            hidden={products.length === 1 && products[0] === undefined ? false : true}
            active={true}
            inline="centered"
            size="massive"
          >
            Loading
          </Loader>
        </Segment>
      );
    }
    const filteredProducts = findFilterProducts(products, filterRanges);
    const data = filteredProducts;
    const columns = this.columns;
    return (
      <GenericTable
        data={data}
        columns={columns}
        singlePageItemsCount={singlePageItemsCount}
        setSinglePageItemsCount={setSinglePageItemsCount}
      />
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: get(state, 'supplier.products'),
  filterRanges: get(state, 'supplier.filterRanges'),
  productTrackerGroup: get(state, 'supplier.productTrackerGroup'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
});

const mapDispatchToProps = {
  fetchProductTrackerGroup: (supplierID: any) => fetchSupplierProductTrackerGroup(supplierID),
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any
  ) => updateProductTrackingStatus(status, productID, productTrackerID, productTrackerGroupID),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable);
