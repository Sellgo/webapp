import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import CheckboxDropdown from '../../../../components/FormFilters/CheckboxDropdownFilter';
// import CheckboxListFilter from '../../../../components/FormFilters/CheckboxListFilter';
import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Interfaces */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';

/* Constants */
import {
  DEFAULT_INCLUDE_EXCLUDE_FILTER,
  DEFAULT_MIN_MAX_FILTER,
  DEFAULT_CHECKBOX_FILTER,
  PRODUCTS_DATABASE_SIZE_TIERS,
  // FULFILMENT_TYPES,
  PRODUCTS_DATABASE_CATEGORIES,
} from '../../../../constants/ProductResearch/ProductsDatabase';

interface Props {
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

const ProductDatabaseFilters = (props: Props) => {
  const { fetchProductsDatabase } = props;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  /* Basic Filters */
  const [categories, setCategories] = useState<string[]>([]);
  const [monthlySales, setMonthlySales] = useState(DEFAULT_MIN_MAX_FILTER);
  const [monthlyRevenue, setMonthlyRevenue] = useState(DEFAULT_MIN_MAX_FILTER);
  const [price, setPrice] = useState(DEFAULT_MIN_MAX_FILTER);
  const [reviewCount, setReviewCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [reviewRating, setReviewRating] = useState(DEFAULT_MIN_MAX_FILTER);

  /* Advanced Filters */
  const [sellerCount, setSellerCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [weight, setWeight] = useState(DEFAULT_MIN_MAX_FILTER);
  const [titleKeywords, setTitleKeywords] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [brands, setBrands] = useState(DEFAULT_INCLUDE_EXCLUDE_FILTER);
  const [bsr, setBsr] = useState(DEFAULT_MIN_MAX_FILTER);
  const [sizeTier, setSizeTier] = useState<string>('');
  const [imageCount, setImageCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [variationCount, setVariationCount] = useState(DEFAULT_MIN_MAX_FILTER);
  const [fulfillment, setFulfillment] = useState(DEFAULT_CHECKBOX_FILTER);

  /* Handlers */
  const handleSubmit = () => {
    const filterPayload = {
      categories,
      monthlySales,
      monthlyRevenue,
      price,
      reviewCount,
      reviewRating,
      sellerCount,
      weight,
      titleKeywords,
      brands,
      bsr,
      sizeTier,
      imageCount,
      variationCount,
      fulfillment,
    };

    fetchProductsDatabase({ filterPayload });
  };

  const handleReset = () => {
    fetchProductsDatabase({ resetFilters: true });
    setCategories([]);
    setMonthlySales(DEFAULT_MIN_MAX_FILTER);
    setMonthlyRevenue(DEFAULT_MIN_MAX_FILTER);
    setPrice(DEFAULT_MIN_MAX_FILTER);
    setReviewCount(DEFAULT_MIN_MAX_FILTER);
    setReviewRating(DEFAULT_MIN_MAX_FILTER);
    setSellerCount(DEFAULT_MIN_MAX_FILTER);
    setWeight(DEFAULT_MIN_MAX_FILTER);
    setTitleKeywords(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setBrands(DEFAULT_INCLUDE_EXCLUDE_FILTER);
    setBsr(DEFAULT_MIN_MAX_FILTER);
    setSizeTier('');
    setImageCount(DEFAULT_MIN_MAX_FILTER);
    setVariationCount(DEFAULT_MIN_MAX_FILTER);
    setFulfillment(DEFAULT_CHECKBOX_FILTER);
  };

  /* Effect on component mount */
  useEffect(() => {
    handleReset();

    return () => {
      handleReset();
    };
  }, []);

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          <CheckboxDropdown
            filterOptions={PRODUCTS_DATABASE_CATEGORIES}
            label="Categories"
            selectedValues={categories}
            handleChange={(value: string) => {
              setCategories(value ? value.split(';') : []);
            }}
          />

          <MinMaxFilter
            label="Monthly Revenue"
            minValue={monthlyRevenue?.min || ''}
            maxValue={monthlyRevenue?.max || ''}
            handleChange={(type: string, value: string) =>
              setMonthlyRevenue(prevState => ({
                ...prevState,
                [type]: value,
              }))
            }
          />

          <MinMaxFilter
            label="Price"
            minValue={price?.min || ''}
            maxValue={price?.max || ''}
            handleChange={(type: string, value: string) =>
              setPrice(prevState => ({
                ...prevState,
                [type]: value,
              }))
            }
          />

          <MinMaxFilter
            label="Review Count"
            minValue={reviewCount?.min || ''}
            maxValue={reviewCount?.max || ''}
            handleChange={(type: string, value: string) =>
              setReviewCount(prevState => ({
                ...prevState,
                [type]: value,
              }))
            }
          />

          <MinMaxRatingsFilter
            label="Review Rating"
            minValue={reviewRating?.min || ''}
            maxValue={reviewRating?.max || ''}
            handleChange={(type: string, value: string) =>
              setReviewRating(prevState => ({
                ...prevState,
                [type]: value,
              }))
            }
          />
        </div>

        <div className={styles.advancedFilterWrapper}>
          <div
            className={styles.advancedFilterToggle}
            onClick={() => setShowAdvancedFilter(prevState => !prevState)}
          >
            <span>Advanced Filters</span>
            <span>
              {showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
            </span>
          </div>

          {showAdvancedFilter && (
            <div className={styles.showAdvancedFilter}>
              {/* <MinMaxFilter
                label="Monthly Sales"
                minValue={monthlySales?.min || ''}
                maxValue={monthlySales?.max || ''}
                handleChange={(type: string, value: string) =>
                  setMonthlySales(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              /> */}

              <MinMaxFilter
                label="# of Sellers"
                minValue={sellerCount?.min || ''}
                maxValue={sellerCount?.max || ''}
                handleChange={(type: string, value: string) =>
                  setSellerCount(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />
              {/* 
              <CheckboxListFilter
                label="Fulfillment"
                options={FULFILMENT_TYPES}
                currentFilterObject={fulfillment}
                handleChange={(value: string) => {
                  setFulfillment(value);
                }}
              /> */}

              <MinMaxFilter
                label="Weight (lbs)"
                minValue={weight?.min || ''}
                maxValue={weight?.max || ''}
                handleChange={(type: string, value: string) =>
                  setWeight(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              <SelectionFilter
                filterOptions={PRODUCTS_DATABASE_SIZE_TIERS}
                label="Size Tier"
                placeholder="Size Tier"
                value={sizeTier || ''}
                handleChange={(value: string) => {
                  setSizeTier(value);
                }}
              />

              <MinMaxFilter
                label="BSR"
                minValue={bsr?.min || ''}
                maxValue={bsr?.max || ''}
                handleChange={(type: string, value: string) =>
                  setBsr(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              <MinMaxFilter
                label="# of Images"
                minValue={imageCount?.min || ''}
                maxValue={imageCount?.max || ''}
                handleChange={(type: string, value: string) =>
                  setImageCount(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              <MinMaxFilter
                label="Variation Count"
                minValue={variationCount?.min || ''}
                maxValue={variationCount?.max || ''}
                handleChange={(type: string, value: string) =>
                  setVariationCount(prevState => ({
                    ...prevState,
                    [type]: value,
                  }))
                }
              />

              <InputFilter
                label="Include Title Keywords"
                placeholder="Enter keywords"
                value={titleKeywords?.include || ''}
                handleChange={(value: string) =>
                  setTitleKeywords(prevState => ({
                    ...prevState,
                    include: value,
                  }))
                }
              />

              <InputFilter
                label="Exclude Title Keywords"
                placeholder="Enter keywords"
                value={titleKeywords?.exclude || ''}
                handleChange={(value: string) =>
                  setTitleKeywords(prevState => ({
                    ...prevState,
                    exclude: value,
                  }))
                }
              />

              <InputFilter
                label="Include Brands"
                placeholder="Enter brands"
                value={brands?.include || ''}
                handleChange={(value: string) =>
                  setBrands(prevState => ({
                    ...prevState,
                    include: value,
                  }))
                }
              />

              <InputFilter
                label="Exclude Brands"
                placeholder="Enter brands"
                value={brands?.exclude || ''}
                handleChange={(value: string) =>
                  setBrands(prevState => ({
                    ...prevState,
                    exclude: value,
                  }))
                }
              />
            </div>
          )}
        </div>

        <FormFilterActions onFind={handleSubmit} onReset={handleReset} />
      </section>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ProductDatabaseFilters);
