import React from 'react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Constants */
import { TIME_SETTING } from '../../../../constants/PerfectStock/OrderPlanning';
import { GRAPH_SETTING_OPTIONS } from '../../../../constants/PerfectStock';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import Placeholder from '../../../../components/Placeholder';
import ProductSalesTable from './ProductSalesTable';
import ProductSalesGraph from './ProductSalesGraph';
import ProductSettings from './ProductSettings';

/* Interface */
import {
  ProductProjectedSales,
  GraphDataSeries,
} from '../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { AppConfig } from '../../../../config';
import { connect } from 'react-redux';
import { getSalesProjectionResults } from '../../../../selectors/PerfectStock/SalesProjection';

interface Props {
  rowData: any;
  salesProjectionResults: ProductProjectedSales[];
}

const ExpandedProduct = (props: Props) => {
  const { rowData, salesProjectionResults } = props;

  /* Local states */
  const [productProjectedSales, setProductProjectedSales] = React.useState<ProductProjectedSales[]>(
    []
  );
  const [graphProductProjectedSalesData, setGraphProductProjectedSalesData] = React.useState<
    GraphDataSeries[]
  >([]);
  const [isLoadingProductProjectedSales, setIsLoadingProductProjectedSales] = React.useState(false);
  const [timeSettings, setTimeSettings] = React.useState<string>(TIME_SETTING.WEEK);
  const [showTrends, setShowTrends] = React.useState<boolean>(true);

  const sku = rowData.sku;

  /* Retrieve product projected sales and seasonality data */
  const getProductSales = async () => {
    setIsLoadingProductProjectedSales(true);
    const sellerId = sellerIDSelector();
    const startDate = new Date(new Date()).toISOString().split('T')[0];
    const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split('T')[0];
    try {
      /* Fetch either only expected_sales or both expected_sales and seasonal adjustment */
      const EXPANDED_TYPES = 'expected_sales,seasonal_adjustment';
      const UNEXPANDED_TYPES = 'expected_sales';

      /* Fetch data from the server */
      const url =
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/order-plan?` +
        `types=${showTrends ? EXPANDED_TYPES : UNEXPANDED_TYPES}` +
        `&skus=${sku}` +
        `&start_date=${startDate}&end_date=${endDate}` +
        `&display_mode=${timeSettings === TIME_SETTING.DAY ? 'daily' : 'weekly'}`;
      const res = await axios.get(url);
      const { data } = res;
      const newProductProjectedSales: ProductProjectedSales[] = [];
      const newGraphProductProjectedSalesData: GraphDataSeries[] = [];

      /* Parse data to fit graph and table format */
      data.forEach((attribute: any) => {
        if (attribute.expected_sales) {
          /* Add expected sales to the table data */
          newProductProjectedSales.push(attribute.expected_sales);

          /* Add expected sales to the graph data */
          const graphDataSeries = {
            name: 'Expected Sales',
            type: GRAPH_SETTING_OPTIONS.LINE,
            data: Object.values(attribute.expected_sales) as number[],
          };
          newGraphProductProjectedSalesData.push(graphDataSeries);
        } else if (attribute.seasonal_adjustment) {
          /* Add expected sales to the table data */
          newProductProjectedSales.push(attribute.seasonal_adjustment);

          /* Add expected sales to the graph data */
          const graphDataSeries = {
            name: 'Seasonality Adjustment',
            type: GRAPH_SETTING_OPTIONS.LINE,
            data: Object.values(attribute.seasonal_adjustment) as number[],
          };
          newGraphProductProjectedSalesData.push(graphDataSeries);
        }
      });
      setProductProjectedSales(newProductProjectedSales);
      setGraphProductProjectedSalesData(newGraphProductProjectedSalesData);
    } catch (error) {
      setProductProjectedSales([]);
      console.error(error);
    }
    setIsLoadingProductProjectedSales(false);
  };

  React.useEffect(() => {
    getProductSales();
  }, [timeSettings, showTrends, salesProjectionResults]);

  return (
    <div className={styles.expandedProduct}>
      <ProductSettings
        productId={rowData.id}
        defaultWeightActivated={rowData.weighted_average_included}
        defaultWeightL30D={rowData.avg_l30d_weight}
        defaultWeightL90D={rowData.avg_l90d_weight}
        defaultWeightL7D={rowData.avg_l7d_weight}
        defaultWeightN30D={rowData.avg_n30d_ly_weight}
        defaultWeightN90D={rowData.avg_n90d_ly_weight}
      />
      <div className={styles.expandedProductTable}>
        <BoxHeader className={styles.tableHeader}>
          WEEKLY EXPECTED SALES WITH SEASONALITY ADJUSTOR
        </BoxHeader>
        <BoxContainer className={styles.tableContainer}>
          {/* Placeholder is used here because the headers are pre-rendered, and the table data is huge */}
          {isLoadingProductProjectedSales ? (
            <Placeholder numberParagraphs={2} numberRows={3} />
          ) : (
            <>
              <ProductSalesTable
                timeSettings={timeSettings}
                setTimeSettings={(timeSettings: string) => setTimeSettings(timeSettings)}
                productProjectedSales={productProjectedSales}
                showTrends={showTrends}
                setShowTrends={setShowTrends}
              />
              <ProductSalesGraph
                data={graphProductProjectedSalesData}
                timeSetting={timeSettings}
                xAxisStartDate={
                  productProjectedSales.length > 0 ? Object.keys(productProjectedSales[0])[0] : ''
                }
              />
            </>
          )}
        </BoxContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    salesProjectionResults: getSalesProjectionResults(state),
  };
};

export default connect(mapStateToProps)(ExpandedProduct);
