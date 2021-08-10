import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

/* Actions */
import { updateProductsDatabaseFilter } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Selectors */
import { getProductsDatabaseFilters } from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Constants */
import {
  PRODUCTS_DATABASE_CATEGORIES,
  PRODUCTS_DATABASE_FILTER,
} from '../../../../constants/ProductResearch/ProductsDatabase';

/* Interfaces */
import { ProductsDatabaseFilters } from '../../../../interfaces/ProductResearch/ProductsDatabase';

interface Props {
  productsDatabaseFilters: ProductsDatabaseFilters[];
  updateProductsDatabaseFilter: (payload: any) => void;
}

const BasicFilters = (props: Props) => {
  const { productsDatabaseFilters, updateProductsDatabaseFilter } = props;

  const getFilterValues = (filterName: string) => {
    return productsDatabaseFilters.find((f: ProductsDatabaseFilters) => f.name === filterName);
  };

  /* Catch filter values from state */
  const monthlyRevenue = getFilterValues(PRODUCTS_DATABASE_FILTER.MONTHLY_REVENUE);
  const price = getFilterValues(PRODUCTS_DATABASE_FILTER.PRICE);
  const reviewCount = getFilterValues(PRODUCTS_DATABASE_FILTER.REVIEW_COUNT);
  const reviewRating = getFilterValues(PRODUCTS_DATABASE_FILTER.REVIEW_RATING);
  const category = getFilterValues(PRODUCTS_DATABASE_FILTER.CATEGORIES);

  return (
    <div className={styles.basicFilters}>
      <SelectionFilter
        filterOptions={PRODUCTS_DATABASE_CATEGORIES}
        label="Categories"
        placeholder="Categories"
        value={category?.value || ''}
        handleChange={(value: string) => {
          updateProductsDatabaseFilter({
            ...category,
            value,
          });
        }}
      />

      <MinMaxFilter
        label="Monthly Revenue"
        minValue={monthlyRevenue?.min || ''}
        maxValue={monthlyRevenue?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...monthlyRevenue,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="Price"
        minValue={price?.min || ''}
        maxValue={price?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...price,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="Review Count"
        minValue={reviewCount?.min || ''}
        maxValue={reviewCount?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...reviewCount,
            [type]: value,
          });
        }}
      />

      <MinMaxFilter
        label="Review Rating"
        minValue={reviewRating?.min || ''}
        maxValue={reviewRating?.max || ''}
        handleChange={(type: string, value: string) => {
          updateProductsDatabaseFilter({
            ...reviewRating,
            [type]: value,
          });
        }}
      />

      {/* <SelectionFilter filterOptions={[]} label="Shipping Size Tier" placeholder="Size Tier" /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicFilters);
