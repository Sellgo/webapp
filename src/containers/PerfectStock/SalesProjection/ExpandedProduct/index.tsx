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

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';

const ExpandedProduct = () => {
  const [isInventoryThreshholdActivated, setIsInventoryThreshholdActivated] = React.useState(false);
  const [inventoryThreshold, setInventoryThreshold] = React.useState(0);
  return (
    <div className={styles.expandedProduct}>
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
