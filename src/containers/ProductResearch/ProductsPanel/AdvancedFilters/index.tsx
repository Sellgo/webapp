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
import { ProductsDatabaseFilters } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import { PRODUCTS_DATABASE_FILTER } from '../../../../constants/ProductResearch/ProductsDatabase';

interface Props {
  productsDatabaseFilters: ProductsDatabaseFilters[];
  updateProductsDatabaseFilter: (payload: any) => void;
}

const AdvancedFilters = (props: Props) => {
  const { productsDatabaseFilters, updateProductsDatabaseFilter } = props;

  const getFilterValues = (filterName: string) => {
    return productsDatabaseFilters.find((f: ProductsDatabaseFilters) => f.name === filterName);
  };

  const numberOfSellers = getFilterValues(PRODUCTS_DATABASE_FILTER.SELLER_COUNT);
  const weight = getFilterValues(PRODUCTS_DATABASE_FILTER.WEIGHT_LBS);
  // const includeTitle = getFilterValues(PRODUCTS_DATABASE_FILTER.INCLUDE_KEYWORDS);
  // const excludeTitle = getFilterValues(PRODUCTS_DATABASE_FILTER.EXCLUDE_KEYWORDS);
  // const includeBrands = getFilterValues(PRODUCTS_DATABASE_FILTER.INCLUDE_BRANDS);
  // const excludeBrands = getFilterValues(PRODUCTS_DATABASE_FILTER.EXCLUDE_BRANDS);

  return (
    <div className={styles.advancedFiltersOptions}>
      {/* First Row */}
      {/* <MinMaxFilter label="Sales Year Over Year (%)" /> */}
      {/* <MinMaxFilter label="Price Change (%)" /> */}
      {/* <MinMaxFilter label="Sales Change (%)" /> */}
      {/* <SelectionFilter filterOptions={options} label="Best Sales Period" placeholder="Month" /> */}
      {/* <MinMaxFilter label="Sales to Reviews" /> */}
      {/* <MinMaxFilter label="Monthly Sales (units)" /> */}

      {/* Second Row */}
      {/* <MinMaxFilter label="BSR" /> */}
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
      {/* <MinMaxFilter label="# of Images" /> */}
      {/* <CheckboxListFilter label="Fulfillment" /> */}
      {/* <MinMaxFilter label="Variation Count" /> */}
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

      {/* last Row*/}
      <InputFilter label="Include Title Keywords" placeholder="Enter keywords" />
      <InputFilter label="Exclude Title Keywords" placeholder="Enter keywords" />
      <InputFilter label="Include Brands" placeholder="Enter brands" />
      <InputFilter label="Exclude Brands" placeholder="Enter brands" />
      {/* <InputFilter label="Include Sellers" placeholder="Enter sellers" /> */}
      {/* <InputFilter label="Exclude Sellers" placeholder="Enter sellers" /> */}
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
