import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import InputFilter from '../../../../components/FormFilters/InputFilter';

/* Selectors */
import { getProductsDatabaseFilters } from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Actions */
import { updateProductsDatabaseFilter } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Constants */
import { PRODUCTS_DATABASE_FILTER } from '../../../../constants/ProductResearch/ProductsDatabase';

/* Interfaces */
import { ProductsDatabaseFilters } from '../../../../interfaces/ProductResearch/ProductsDatabase';

interface Props {
  productsDatabaseFilters: ProductsDatabaseFilters[];
  updateProductsDatabaseFilter: (payload: any) => void;
}

const AdvancedFilters = (props: Props) => {
  const { productsDatabaseFilters, updateProductsDatabaseFilter } = props;

  const getFilterValues = (filterName: string) => {
    return productsDatabaseFilters.find((f: ProductsDatabaseFilters) => f.name === filterName);
  };

  /* Get filter states */
  const numberOfSellers = getFilterValues(PRODUCTS_DATABASE_FILTER.SELLER_COUNT);
  const weight = getFilterValues(PRODUCTS_DATABASE_FILTER.WEIGHT_LBS);
  const includeTitle = getFilterValues(PRODUCTS_DATABASE_FILTER.INCLUDE_KEYWORDS);
  const excludeTitle = getFilterValues(PRODUCTS_DATABASE_FILTER.EXCLUDE_KEYWORDS);
  const includeBrands = getFilterValues(PRODUCTS_DATABASE_FILTER.INCLUDE_BRANDS);
  const excludeBrands = getFilterValues(PRODUCTS_DATABASE_FILTER.EXCLUDE_BRANDS);

  return (
    <div className={styles.advancedFiltersOptions}>
      <MinMaxFilter
        label="# of Sellers"
        minValue={numberOfSellers?.min || ''}
        maxValue={numberOfSellers?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...numberOfSellers,
            [type]: value,
          });
        }}
      />

      {/* <CheckboxListFilter label="Fulfillment" /> */}

      <MinMaxFilter
        label="Weight(lbs)"
        minValue={weight?.min || ''}
        maxValue={weight?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...weight,
            [type]: value,
          });
        }}
      />

      <InputFilter
        label="Include Title Keywords"
        placeholder="Enter keywords"
        value={includeTitle?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...includeTitle,
            value,
          });
        }}
      />

      <InputFilter
        label="Exclude Title Keywords"
        placeholder="Enter keywords"
        value={excludeTitle?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...excludeTitle,
            value,
          });
        }}
      />

      <InputFilter
        label="Include Brands"
        placeholder="Enter brands"
        value={includeBrands?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...includeBrands,
            value,
          });
        }}
      />

      <InputFilter
        label="Exclude Brands"
        placeholder="Enter brands"
        value={excludeBrands?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...excludeBrands,
            value,
          });
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  productsDatabaseFilters: getProductsDatabaseFilters(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateProductsDatabaseFilter: (payload: any) => dispatch(updateProductsDatabaseFilter(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedFilters);
