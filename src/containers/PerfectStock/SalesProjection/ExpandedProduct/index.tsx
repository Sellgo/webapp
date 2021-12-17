import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Selectors */
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Constants */
import { WEIGHT_OPTIONS } from '../../../../constants/PerfectStock/SalesProjection';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import SaveCancelOptions from '../../../../components/SaveCancelOptions';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import ProductSalesTable from '../ProductSalesTable';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { AppConfig } from '../../../../config';
import axios from 'axios';

interface Props {
  rowData: any;
}

const ExpandedProduct = (props: Props) => {
  const { rowData } = props;
  console.log(rowData);

  const [isInventoryThreshholdActivated, setIsInventoryThreshholdActivated] = React.useState(false);
  const [inventoryThreshold, setInventoryThreshold] = React.useState(0);
  const [productProjectedSales, setProductProjectedSales] = React.useState<any[]>([]);

  const sku = rowData.sku;
  const getProductSales = async () => {
    const sellerId = sellerIDSelector();
    const startDate = new Date(new Date()).toISOString().split('T')[0];
    // const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
    const endDate = new Date(new Date().setDate(new Date().getDate() + 50))
      .toISOString()
      .split('T')[0];

    const url =
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/order-plan?` +
      `types=expected_sales,seasonal_adjustment&sku=${sku}&date_start=${startDate}&date_end=${endDate}`;
    const res = await axios.get(url);
    const { data } = res;
    const newProductProjectedSales: any[] = [];
    data.forEach((attribute: any) => {
      if (attribute.expected_sales) {
        newProductProjectedSales.push(attribute.expected_sales);
      } else if (attribute.seasonal_adjustment) {
        newProductProjectedSales.push(attribute.seasonal_adjustment);
      }
    });
    setProductProjectedSales(newProductProjectedSales);
  };

  React.useEffect(() => {
    getProductSales();
  }, []);

  return (
    <div className={styles.expandedProduct}>
      <div className={styles.expandedProductSettings}>
        <BoxHeader className={styles.settingsBoxHeader}>Calculation Variables</BoxHeader>
        <BoxContainer className={styles.settingsBoxContainer}>
          <div className={styles.settingWrapper}>
            <p className={styles.settingsTitle}> Inventory Threshhold </p>
            <Checkbox
              toggle
              checked={isInventoryThreshholdActivated}
              onChange={() => setIsInventoryThreshholdActivated(!isInventoryThreshholdActivated)}
              label="Inventory Threshold"
              className={styles.settingToggle}
            />
            <InputFilter
              placeholder="100"
              isNumber
              value={inventoryThreshold.toString()}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SaveCancelOptions
              className={styles.saveCancelOptions}
              handleSave={() => {
                return null;
              }}
              handleCancel={() => {
                return null;
              }}
            />
          </div>
          <div className={styles.settingWrapper}>
            <p className={styles.settingsTitle}> Average Weighted Sales </p>
            <Checkbox
              toggle
              checked={isInventoryThreshholdActivated}
              onChange={() => setIsInventoryThreshholdActivated(!isInventoryThreshholdActivated)}
              label="Average Weighted Sales"
              className={styles.settingToggle}
            />
            <SelectionFilter
              label="Average Last 7 Day"
              placeholder=""
              filterOptions={WEIGHT_OPTIONS}
              value={'0.2'}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SelectionFilter
              label="Average Last 7 Day"
              placeholder=""
              filterOptions={WEIGHT_OPTIONS}
              value={'0.2'}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SelectionFilter
              label="Average Last 7 Day"
              placeholder=""
              filterOptions={WEIGHT_OPTIONS}
              value={'0.2'}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SelectionFilter
              label="Average Last 7 Day"
              placeholder=""
              filterOptions={WEIGHT_OPTIONS}
              value={'0.2'}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SelectionFilter
              label="Average Last 7 Day"
              placeholder=""
              filterOptions={WEIGHT_OPTIONS}
              value={'0.2'}
              handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
              className={styles.settingInput}
            />
            <SaveCancelOptions
              className={styles.saveCancelOptions}
              handleSave={() => {
                return null;
              }}
              handleCancel={() => {
                return null;
              }}
            />
          </div>
        </BoxContainer>
      </div>
      <div className={styles.expandedProductTable}>
        <BoxHeader className={styles.tableHeader}>
          WEEKLY EXPECTED SALES WITH SEASONALITY ADJUSTOR
        </BoxHeader>
        <BoxContainer className={styles.tableContainer}>
          <ProductSalesTable data={productProjectedSales} />
        </BoxContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  productDatabaseResults: getProductsDatabaseResults(state),
  isLoadingProductDatabase: getIsLoadingProductsDatabase(state),
  productDatabasePaginationInfo: getProductsDatabasePaginationInfo(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedProduct);
