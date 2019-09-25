import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Icon, Segment, Loader, Grid, Image, Button } from 'semantic-ui-react';
import GenericTable, { Column } from '../../../../../components/Table';
import { Link } from 'react-router-dom';
import { Product } from '../../../../../interfaces/Product';
import { openSupplierProductDetailModal } from '../../../../../actions/Modals';
import { resetSupplierProducts, fetchSupplierProducts } from '../../../../../actions/Suppliers';
import { supplierProductsSelector } from '../../../../../selectors/Supplier';

interface ProductsTableProps {
  supplierID: any;
  products: Product[];
  fetchSupplierProducts: (supplierID: any) => void;
  resetSupplierProducts: typeof resetSupplierProducts;
  openProductDetailModal: (product?: Product) => void;
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
            <h2 style={{ fontSize: 17 }}>View</h2>
          </Button>
        </Grid.Column>
      </Grid>
    );
  };

  renderTracker = (row: Product) => {
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
        /* onClick={() => {
      let productTrackGroupID = 2;
      if (
        this.props.productTrackGroup.length > 0 &&
        this.props.productTrackGroup[0].id > 0
      ) {
        productTrackGroupID = this.props.productTrackGroup[0].id;
        if (row.tracking_status !== null) {
          this.props.trackProductWithPatch(
            String(row.product_track_id),
            String(productTrackGroupID),
            row.tracking_status === 'active' ? 'inactive' : 'active',
            this.props.match.params.supplierID
          );
        } else {
          this.props.trackProductWithPost(
            String(row.product_id),
            String(productTrackGroupID),
            'active',
            this.props.match.params.supplierID
          );
        }
      }
    }} */
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
    const { supplierID, resetSupplierProducts, fetchSupplierProducts } = this.props;
    resetSupplierProducts();
    fetchSupplierProducts(supplierID);
  }

  componentWillUnmount() {
    this.props.resetSupplierProducts();
  }

  render() {
    const { products } = this.props;

    if (products.length === 1 && products[0] === undefined) {
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
    const data = products;
    const columns = this.columns;
    return (
      <>
        <GenericTable data={data} columns={columns} />
      </>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: supplierProductsSelector(state),
});

const mapDispatchToProps = {
  fetchSupplierProducts: (supplierID: any) => fetchSupplierProducts(supplierID),
  resetSupplierProducts: () => resetSupplierProducts(),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable);

/* 
renderMiddleRows = () => {
  const totalProducts = this.state.products.length;
  const singlePageItemsCount = this.state.singlePageItemsCount;
  const currentPage = this.state.currentPage;
  const maxCount =
    currentPage * singlePageItemsCount > totalProducts
      ? totalProducts
      : currentPage * singlePageItemsCount;
  const minCount = (currentPage - 1) * singlePageItemsCount + 1;

  return (
    <Grid>
      <Grid.Column width={4} textAlign="center">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {`${minCount}-${maxCount} of ${totalProducts} items`}
          <Dropdown
            text={String(this.state.singlePageItemsCount)}
            style={{ width: '40%', alignSelf: 'center', margin: 'auto' }}
            fluid={true}
            selection={true}
            options={[
              {
                key: '10',
                text: '10',
                value: '10',
              },
              {
                key: '30',
                text: '30',
                value: '30',
              },
              {
                key: '50',
                text: '50',
                value: '50',
              },
              {
                key: '100',
                text: '100',
                value: '100',
              },
            ]}
            onChange={(e, data) => {
              const singlePageItemCounts = Number(data.value);
              const totalPages = Math.ceil(this.props.products.length / singlePageItemCounts);
              this.setState({
                singlePageItemsCount: singlePageItemCounts,
                totalPages,
                currentPage: totalPages < this.state.currentPage ? 1 : this.state.currentPage,
              });
            }}
          />
          Items per Page
        </div>
      </Grid.Column>
      <Grid.Column
        width={4}
        floated="right"
        style={{
          padding: 0,
        }}
      >
        <div
          className="ui"
          style={{
            display: 'inline-flex',
          }}
        >
          <span style={{ padding: '0 8px' }}>
            Time Saved
            <h2>
              <strong>
                {this.props.time_efficiency_data.length > 0
                  ? this.props.time_efficiency_data[0].saved_time
                  : '0'}{' '}
                hrs
              </strong>
            </h2>
          </span>
          <span style={{ padding: '0 8px' }}>
            Efficiency
            <h2>
              <strong>
                {this.props.time_efficiency_data.length > 0
                  ? this.props.time_efficiency_data[0].efficiency
                  : '0'}{' '}
                %
              </strong>
            </h2>
          </span>
        </div>
      </Grid.Column>
    </Grid>
  );
};
 */
