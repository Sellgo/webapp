import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { DURATIONS, LAUNCHED_DURATIONS } from '../../../constants/SellerDatabase';

/* Components */
import InputFilter from '../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../components/FormFilters/MinMaxFilter';
import PeriodFilter from '../../../components/FormFilters/PeriodFilter';
import MinMaxRatingsFilter from '../../../components/FormFilters/MinMaxRatingsFilter';
import RadioListFilters from '../../../components/FormFilters/RadioListFilters';

const SellerDatabase = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [merchantName, setMerchantName] = useState<string>('');
  const [asins, setAsins] = useState({
    include: '',
    exclude: '',
  });
  const [sellerIds, setSellerIds] = useState({
    include: '',
    exclude: '',
  });

  /* Advanced Filters */
  const [businessName, setBusinessName] = useState<string>('');
  const [brands, setBrands] = useState({
    include: '',
    exclude: '',
  });
  const [numInventory, setNumInventory] = useState({
    min: '',
    max: '',
  });
  const [numBrands, setNumBrands] = useState({
    min: '',
    max: '',
  });
  const [reviewRatings, setReviewRatings] = useState({
    min: '',
    max: '',
  });
  const [reviewCount, setReviewCount] = useState({
    min: '',
    max: '',
    period: '30_days',
  });
  const [neutralReview, setNeutralReview] = useState({
    min: '',
    max: '',
    period: '30_days',
  });
  const [positiveReview, setPositiveReview] = useState({
    min: '',
    max: '',
    period: '30_days',
  });
  const [negativeReview, setNegativeReview] = useState({
    min: '',
    max: '',
    period: '30_days',
  });
  const [sellerRatings, setSellerRatings] = useState({
    min: '',
    max: '',
  });
  const [launched, setLaunched] = useState<string>('');

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          {/* Merchant Name */}
          <InputFilter
            label="Merchant Name"
            placeholder="Name"
            value={merchantName}
            handleChange={(value: string) => setMerchantName(value)}
          />

          {/* Include ASINS */}
          <InputFilter
            label="Include ASINs"
            placeholder="seperated by comma"
            value={asins.include}
            handleChange={(value: string) =>
              setAsins(prevState => ({ ...prevState, include: value }))
            }
          />

          {/* Exclude ASINS Name */}
          <InputFilter
            label="Exclude ASINs"
            placeholder="seperated by comma"
            value={asins.exclude}
            handleChange={(value: string) =>
              setAsins(prevState => ({ ...prevState, exclude: value }))
            }
          />

          {/* Include Seller IDs */}
          <InputFilter
            label="Include Seller IDs"
            placeholder="seperated by comma"
            value={sellerIds.include}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({ ...prevState, include: value }))
            }
          />

          {/* Exclude Seller IDS */}
          <InputFilter
            label="Exclude Seller IDs"
            placeholder="seperated by comma"
            value={sellerIds.exclude}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({ ...prevState, exclude: value }))
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
              {/* Business name */}
              <InputFilter
                label="Business Name"
                placeholder="Name"
                value={businessName}
                handleChange={(value: string) => setBusinessName(value)}
              />

              {/*  Include brands */}
              <InputFilter
                label="Include Brands"
                placeholder="seperated by comma"
                value={brands.include}
                handleChange={(value: string) =>
                  setBrands(prevState => ({ ...prevState, include: value }))
                }
              />

              {/* Exclude brands */}
              <InputFilter
                label="Exclude Brands"
                placeholder="seperated by comma"
                value={brands.exclude}
                handleChange={(value: string) =>
                  setBrands(prevState => ({ ...prevState, exclude: value }))
                }
              />

              {/* Review Ratings */}
              <MinMaxRatingsFilter
                label="Review Ratings"
                minValue={reviewRatings.min}
                maxValue={reviewRatings.max}
                handleChange={(type: string, value: string) =>
                  setReviewRatings(prevState => ({ ...prevState, [type]: value }))
                }
              />

              {/* Seller Ratings */}
              <MinMaxRatingsFilter
                label="Seller Ratings"
                minValue={sellerRatings.min}
                maxValue={sellerRatings.max}
                handleChange={(type: string, value: string) =>
                  setSellerRatings(prevState => ({ ...prevState, [type]: value }))
                }
              />

              {/* Review Count */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Review Count"
                  minValue={reviewCount.min}
                  maxValue={reviewCount.max}
                  handleChange={(type: string, value: string) =>
                    setReviewCount(prevState => ({ ...prevState, [type]: value }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={reviewCount.period}
                  filterOptions={DURATIONS}
                  handleChange={(period: string) => {
                    setReviewCount(prevState => ({ ...prevState, period }));
                  }}
                />
              </div>

              {/* Neutral Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Neutral Review"
                  minValue={neutralReview.min}
                  maxValue={neutralReview.max}
                  handleChange={(type: string, value: string) =>
                    setNeutralReview(prevState => ({ ...prevState, [type]: value }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={neutralReview.period}
                  filterOptions={DURATIONS}
                  handleChange={(period: string) => {
                    setNeutralReview(prevState => ({ ...prevState, period }));
                  }}
                />
              </div>

              {/* Positive Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Positive Review"
                  minValue={positiveReview.min}
                  maxValue={positiveReview.max}
                  handleChange={(type: string, value: string) =>
                    setPositiveReview(prevState => ({ ...prevState, [type]: value }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={positiveReview.period}
                  filterOptions={DURATIONS}
                  handleChange={(period: string) => {
                    setPositiveReview(prevState => ({ ...prevState, period }));
                  }}
                />
              </div>

              {/* Negative Reviews */}
              <div className={styles.groupFilters}>
                <MinMaxFilter
                  label="Negative Review"
                  minValue={negativeReview.min}
                  maxValue={negativeReview.max}
                  handleChange={(type: string, value: string) =>
                    setNegativeReview(prevState => ({ ...prevState, [type]: value }))
                  }
                />
                <PeriodFilter
                  placeholder="30D"
                  value={negativeReview.period}
                  filterOptions={DURATIONS}
                  handleChange={(period: string) => {
                    setNegativeReview(prevState => ({ ...prevState, period }));
                  }}
                />
              </div>

              {/* # of inventory */}
              <MinMaxFilter
                label="# of Inventory"
                minValue={numInventory.min}
                maxValue={numInventory.max}
                handleChange={(type: string, value: string) =>
                  setNumInventory(prevState => ({ ...prevState, [type]: value }))
                }
              />

              {/* # of brands */}
              <MinMaxFilter
                label="# of Brands"
                minValue={numBrands.min}
                maxValue={numBrands.max}
                handleChange={(type: string, value: string) =>
                  setNumBrands(prevState => ({ ...prevState, [type]: value }))
                }
              />
              {/* Seller Launched */}
              <RadioListFilters
                label="Seller Launched"
                filterOptions={LAUNCHED_DURATIONS}
                value={launched}
                handleChange={(value: string) => setLaunched(value)}
              />
            </div>
          )}
        </div>

        <FormFilterActions
          onFind={() => console.log('Find')}
          onReset={() => console.log('Reset')}
        />
      </section>
    </>
  );
};

export default SellerDatabase;
