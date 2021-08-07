import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import CheckboxListFilter from '../../../../components/FormFilters/CheckboxListFilter';

/* Selectors */
import { getProductsDatabaseFilters } from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Actions */
import { updateProductsDatabaseFilter } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Constants */
import {
  FULFILMENT_TYPES,
  PRODUCTS_DATABASE_FILTER,
  PRODUCTS_DATABASE_SIZE_TIERS,
} from '../../../../constants/ProductResearch/ProductsDatabase';

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
  const imageCount = getFilterValues(PRODUCTS_DATABASE_FILTER.IMAGE_COUNT);
  const bsr = getFilterValues(PRODUCTS_DATABASE_FILTER.BSR);
  const variationCount = getFilterValues(PRODUCTS_DATABASE_FILTER.VARIATION_COUNT);
  const sizeTier = getFilterValues(PRODUCTS_DATABASE_FILTER.SIZE_TIER);
  const fulfilment = getFilterValues(PRODUCTS_DATABASE_FILTER.FULFILLMENT);

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

      <CheckboxListFilter
        label="Fulfillment"
        options={FULFILMENT_TYPES}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...fulfilment,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="Weight (lbs)"
        minValue={weight?.min || ''}
        maxValue={weight?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...weight,
            [type]: value,
          });
        }}
      />

      <SelectionFilter
        filterOptions={PRODUCTS_DATABASE_SIZE_TIERS}
        label="Size Tier"
        placeholder="Size Tier"
        value={sizeTier?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...sizeTier,
            value,
          });
        }}
      />

      <MinMaxFilter
        label="BSR"
        minValue={bsr?.min || ''}
        maxValue={bsr?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...bsr,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="# of Images"
        minValue={imageCount?.min || ''}
        maxValue={imageCount?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...imageCount,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="Variation Count"
        minValue={variationCount?.min || ''}
        maxValue={variationCount?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...variationCount,
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
