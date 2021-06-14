import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Dropdown, Input } from 'semantic-ui-react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

/* Styling */
import styles from './index.module.scss';

/* Globals */
import '../globals.scss';

/* Selectors */
import { sellerDatabaseFilters, sellerDatabaseMarket } from '../../../selectors/SellerDatabase';

/* Actions */
import {
  fetchSellersDatabase,
  loadFilters,
  SellerDatabaseFilter,
  SellerDatabasePayload,
  updateMarketplace,
  updateSellerDatabaseFilters,
} from '../../../actions/SellerDatabase';

/* Constants */
import { DURATIONS, FILTERS, STATES } from '../../../constants/SellerDatabase';
import { defaultMarketplaces } from '../../../constants/Settings';

/* Assets */
import filterRightArrow from '../../../assets/images/filterRightArrow.svg';
import InventoryIcon from '../../../assets/images/inventory.svg';
import sellerRatingsIcon from '../../../assets/images/sellerRatings.svg';
import brandIcon from '../../../assets/images/brands.svg';
import reviewRatingsIcon from '../../../assets/images/reviewRatings.svg';
import reviewCountIcon from '../../../assets/images/reviewCount.svg';
import positiveCountIcon from '../../../assets/images/positiveCount.svg';
import neutralCountIcon from '../../../assets/images/neutralCount.svg';
import negativeCountIcon from '../../../assets/images/negativeCount.svg';

interface Props {
  updateFilter: (filter: SellerDatabaseFilter) => void;
  loadFilters: () => void;
  filters: SellerDatabaseFilter[];
  fetchSellersDatabase: (payload: SellerDatabasePayload) => void;
  updateMarketplace: (market: string) => void;
  market: string;
}

const Filters: React.FC<Props> = props => {
  const {
    updateFilter,
    filters,
    loadFilters,
    market,
    updateMarketplace,
    fetchSellersDatabase,
  } = props;

  const [asins, setAsins] = useState<string>('');
  const [brands, setBrands] = useState<string>('');
  const [sellerIds, setSellerIds] = useState<string>('');
  const [state, setState] = useState<string>('');

  /* Error States */
  const [inventoryError, setInventoryError] = useState({
    min: false,
    max: false,
  });
  const [sellerRatingsError, setSellerRatingsError] = useState({ min: false, max: false });
  const [brandError, setBrandError] = useState({
    min: false,
    max: false,
  });
  const [reviewRatingsError, setReviewRatingsError] = useState({ min: false, max: false });

  const [reviewCountError, setReviewCountError] = useState({ min: false, max: false });
  const [positiveReviewError, setPositiveReviewError] = useState({ min: false, max: false });
  const [negativeReviewError, setNegativeReviewError] = useState({ min: false, max: false });
  const [neutralReviewError, setNeutralReviewError] = useState({ min: false, max: false });

  // find the correct filter and get it's value
  const getFilterValue = (type: string): SellerDatabaseFilter => {
    const filter = filters.find(f => f.type === type);
    return filter
      ? filter
      : {
          active: false,
          value: null,
          type,
          values: [],
          max: 0,
          min: 0,
          duration: '',
        };
  };

  const updateInputFilterValue = (update: SellerDatabaseFilter) => {
    updateFilter(update);
  };

  /* Load Filters on load */
  useEffect(() => {
    loadFilters();
  }, []);

  // Filters without time period
  const inventory = getFilterValue(FILTERS.INVENTORY);
  const ratings = getFilterValue(FILTERS.SELLER_RATINGS);
  const brand = getFilterValue(FILTERS.BRAND);
  const reviewRatings = getFilterValue(FILTERS.REVIEW_RATINGS);

  //  Filters with time period
  const reviewCount = getFilterValue(FILTERS.REVIEW_COUNT);
  const positiveReview = getFilterValue(FILTERS.POSITIVE_REVIEW);
  const neutralReview = getFilterValue(FILTERS.NEUTRAL_REVIEW);
  const negativeReview = getFilterValue(FILTERS.NEGATIVE_REVIEW);

  // size tier filters
  const launched = getFilterValue(FILTERS.LAUNCHED);

  // Marketplace options
  const marketplaceOptions = defaultMarketplaces.map(({ name, id, disabled, code }, key) => {
    return {
      key,
      text: name,
      value: id,
      disabled,
      flag: code.toLowerCase(),
    };
  });

  // State Options
  const states = STATES.map((state: any) => ({
    key: state.code,
    value: state.code,
    text: state.name,
  }));

  /* Effect to check inventory values error*/
  useEffect(() => {
    const minError =
      Boolean(inventory.min && inventory.max && Number(inventory.min) > Number(inventory.max)) ||
      Number.isNaN(inventory.min);

    const maxError =
      Boolean(inventory.min && inventory.max && Number(inventory.max) < Number(inventory.min)) ||
      Number.isNaN(inventory.max);

    setInventoryError({ min: minError, max: maxError });
  }, [inventory.min, inventory.max]);

  /* Effect to check seller ratings values error*/
  useEffect(() => {
    const minError =
      Boolean(ratings.min && ratings.max && Number(ratings.min) > Number(ratings.max)) ||
      Number.isNaN(ratings.min);

    const maxError =
      Boolean(ratings.min && ratings.max && Number(ratings.max) < Number(ratings.min)) ||
      Number.isNaN(ratings.max);

    setSellerRatingsError({
      min: minError,
      max: maxError,
    });
  }, [ratings.min, ratings.max]);

  /* Effect to check brands  values error*/
  useEffect(() => {
    const minError =
      Boolean(brand.min && brand.max && Number(brand.min) > Number(brand.max)) ||
      Number.isNaN(brand.min);

    const maxError =
      Boolean(brand.min && brand.max && Number(brand.max) < Number(brand.min)) ||
      Number.isNaN(brand.max);

    setBrandError({ min: minError, max: maxError });
  }, [brand.min, brand.max]);

  /* Effect to review ratings values error*/
  useEffect(() => {
    const minError =
      Boolean(
        reviewRatings.min &&
          reviewRatings.max &&
          Number(reviewRatings.min) > Number(reviewRatings.max)
      ) || Number.isNaN(reviewRatings.min);

    const maxError =
      Boolean(
        reviewRatings.min &&
          reviewRatings.max &&
          Number(reviewRatings.max) < Number(reviewRatings.min)
      ) || Number.isNaN(reviewRatings.max);

    setReviewRatingsError({
      min: minError,
      max: maxError,
    });
  }, [reviewRatings.min, reviewRatings.max]);

  /* Effect to review count values error*/
  useEffect(() => {
    const minError =
      Boolean(
        reviewCount.min && reviewCount.max && Number(reviewCount.min) > Number(reviewCount.max)
      ) || Number.isNaN(reviewCount.min);

    const maxError =
      Boolean(
        reviewCount.min && reviewCount.max && Number(reviewCount.max) < Number(reviewCount.min)
      ) || Number.isNaN(reviewCount.max);

    setReviewCountError({ min: minError, max: maxError });
  }, [reviewCount.min, reviewCount.max]);

  /* Effect to positive ratings values error*/
  useEffect(() => {
    const minError =
      Boolean(
        positiveReview.min &&
          positiveReview.max &&
          Number(positiveReview.min) > Number(positiveReview.max)
      ) || Number.isNaN(positiveReview.min);

    const maxError =
      Boolean(
        positiveReview.min &&
          positiveReview.max &&
          Number(positiveReview.max) < Number(positiveReview.min)
      ) || Number.isNaN(positiveReview.max);

    setPositiveReviewError({
      min: minError,
      max: maxError,
    });
  }, [positiveReview.min, positiveReview.max]);

  /* Effect to negative ratings values error*/
  useEffect(() => {
    const minError =
      Boolean(
        negativeReview.min &&
          negativeReview.max &&
          Number(negativeReview.min) > Number(negativeReview.max)
      ) || Number.isNaN(negativeReview.min);

    const maxError =
      Boolean(
        negativeReview.min &&
          negativeReview.max &&
          Number(negativeReview.max) < Number(negativeReview.min)
      ) || Number.isNaN(negativeReview.max);

    setNegativeReviewError({
      min: minError,
      max: maxError,
    });
  }, [negativeReview.min, negativeReview.max]);

  /* Effect to neutral ratings values error*/
  useEffect(() => {
    const minError =
      Boolean(
        neutralReview.min &&
          neutralReview.max &&
          Number(neutralReview.min) > Number(neutralReview.max)
      ) || Number.isNaN(neutralReview.min);

    const maxError =
      Boolean(
        neutralReview.min &&
          neutralReview.max &&
          Number(neutralReview.max) < Number(neutralReview.min)
      ) || Number.isNaN(neutralReview.max);

    setNeutralReviewError({
      min: minError,
      max: maxError,
    });
  }, [neutralReview.min, neutralReview.max]);

  const isFilterInputError =
    inventoryError.min ||
    inventoryError.max ||
    sellerRatingsError.min ||
    sellerRatingsError.max ||
    brandError.min ||
    brandError.max ||
    reviewRatingsError.min ||
    reviewRatingsError.max ||
    reviewCountError.min ||
    reviewCountError.max ||
    positiveReviewError.min ||
    positiveReviewError.max ||
    negativeReviewError.min ||
    negativeReviewError.max ||
    neutralReviewError.min ||
    neutralReviewError.max;

  return (
    <section className={styles.filterContainerWrapper}>
      <h1>SELLER DATABASE</h1>

      <Tabs
        className={styles.filterTabs}
        selectedTabClassName={styles.filterTabs__selected}
        disabledTabClassName={styles.filterTabs__disabled}
      >
        <TabList className={styles.filterTabList}>
          <Tab className={styles.tab}>Filters</Tab>
          <Tab className={styles.tab}>Location</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.filterContainer}>
            {/* Filters without time period */}
            <div className={styles.groupedFilters}>
              {/* Inventory Filter */}
              <div className={styles.filterGroups}>
                <img src={InventoryIcon} alt="Inventory" className={styles.filterGroups__icon} />
                <Input
                  className={styles.formInput}
                  placeholder="Min # of Inventory"
                  value={inventory.min ? inventory.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...inventory,
                      min: +evt.target.value,
                    })
                  }
                  error={inventoryError.min}
                />

                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max # of Inventory"
                  value={inventory.max ? inventory.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...inventory,
                      max: +evt.target.value,
                    })
                  }
                  error={inventoryError.max}
                />
              </div>

              {/* Seller Rating Filter */}
              <div className={styles.filterGroups}>
                <img
                  src={sellerRatingsIcon}
                  alt="Seller Ratings"
                  className={styles.filterGroups__icon}
                />

                <Input
                  className={styles.formInput}
                  placeholder="Min Seller Ratings"
                  value={ratings.min > 0 ? ratings.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...ratings,
                      min: +evt.target.value,
                    })
                  }
                  error={sellerRatingsError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Seller Ratings"
                  value={ratings.max > 0 ? ratings.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...ratings,
                      max: +evt.target.value,
                    })
                  }
                  error={sellerRatingsError.max}
                />
              </div>

              {/* Number of brands  Filter */}
              <div className={styles.filterGroups}>
                <img src={brandIcon} alt="Brands" className={styles.filterGroups__icon} />

                <Input
                  className={styles.formInput}
                  placeholder="Min # of Brand"
                  value={brand.min > 0 ? brand.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...brand,
                      min: +evt.target.value,
                    })
                  }
                  error={brandError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max # of Brand"
                  value={brand.max > 0 ? brand.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...brand,
                      max: +evt.target.value,
                    })
                  }
                  error={brandError.max}
                />
              </div>

              {/* Review Rating Filter */}
              <div className={styles.filterGroups}>
                <img
                  src={reviewRatingsIcon}
                  alt="Review Ratings"
                  className={styles.filterGroups__icon}
                />

                <Input
                  className={styles.formInput}
                  placeholder="Min Review Ratings"
                  value={reviewRatings.min ? reviewRatings.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...reviewRatings,
                      min: +evt.target.value,
                    })
                  }
                  error={reviewRatingsError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Review Ratings"
                  value={reviewRatings.max ? reviewRatings.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...reviewRatings,
                      max: +evt.target.value,
                    })
                  }
                  error={reviewRatingsError.max}
                />
              </div>
            </div>

            {/* Filter with time period */}
            <div className={styles.groupedFilters}>
              {/* Review Count Filter */}
              <div className={styles.filterGroups}>
                <img src={reviewCountIcon} className={styles.filterGroups__icon} />
                <Input
                  className={styles.formInput}
                  placeholder="Min Review Count"
                  value={reviewCount.min > 0 ? reviewCount.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...reviewCount,
                      min: +evt.target.value,
                    })
                  }
                  error={reviewCountError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Review Count"
                  value={reviewCount.max > 0 ? reviewCount.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...reviewCount,
                      max: +evt.target.value,
                    })
                  }
                  error={reviewCountError.max}
                />

                <Dropdown
                  className="formDropdown"
                  placeholder="30D"
                  fluid
                  selection
                  value={reviewCount.duration}
                  onChange={(evt, { value }: any) =>
                    updateInputFilterValue({
                      ...reviewCount,
                      duration: value,
                    })
                  }
                  options={DURATIONS}
                />
              </div>

              {/* Positive Count Filter */}
              <div className={styles.filterGroups}>
                <img src={positiveCountIcon} className={styles.filterGroups__icon} />

                <Input
                  className={styles.formInput}
                  placeholder="Min Positive Review"
                  value={positiveReview.min > 0 ? positiveReview.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...positiveReview,
                      min: +evt.target.value,
                    })
                  }
                  error={positiveReviewError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Positive Review"
                  value={positiveReview.max > 0 ? positiveReview.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...positiveReview,
                      max: +evt.target.value,
                    })
                  }
                  error={positiveReviewError.max}
                />

                <Dropdown
                  className="formDropdown"
                  placeholder="30D"
                  fluid
                  selection
                  value={positiveReview.duration}
                  onChange={(evt, { value }: any) =>
                    updateInputFilterValue({
                      ...positiveReview,
                      duration: value,
                    })
                  }
                  options={DURATIONS}
                />
              </div>

              {/* Neutral Count Filter */}
              <div className={styles.filterGroups}>
                <img src={neutralCountIcon} className={styles.filterGroups__icon} />

                <Input
                  className={styles.formInput}
                  placeholder="Min Neutral Review"
                  value={neutralReview.min > 0 ? neutralReview.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...neutralReview,
                      min: +evt.target.value,
                    })
                  }
                  error={neutralReviewError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Neutral Review"
                  value={neutralReview.max > 0 ? neutralReview.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...neutralReview,
                      max: +evt.target.value,
                    })
                  }
                  error={neutralReviewError.max}
                />

                <Dropdown
                  className="formDropdown"
                  placeholder="30D"
                  fluid
                  selection
                  value={neutralReview.duration}
                  onChange={(evt, { value }: any) =>
                    updateInputFilterValue({
                      ...neutralReview,
                      duration: value,
                    })
                  }
                  options={DURATIONS}
                />
              </div>

              {/* Neutral Count Filter */}
              <div className={styles.filterGroups}>
                <img src={negativeCountIcon} className={styles.filterGroups__icon} />

                <Input
                  className={styles.formInput}
                  placeholder="Min Negative Review"
                  value={negativeReview.min > 0 ? negativeReview.min : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...negativeReview,
                      min: +evt.target.value,
                    })
                  }
                  error={negativeReviewError.min}
                />
                <img src={filterRightArrow} alt="Right Arrow" />
                <Input
                  className={styles.formInput}
                  placeholder="Max Negative Review"
                  value={negativeReview.max > 0 ? negativeReview.max : ''}
                  onChange={evt =>
                    updateInputFilterValue({
                      ...negativeReview,
                      max: +evt.target.value,
                    })
                  }
                  error={negativeReviewError.max}
                />

                <Dropdown
                  className="formDropdown"
                  placeholder="30D"
                  fluid
                  selection
                  value={negativeReview.duration}
                  onChange={(evt, { value }: any) =>
                    updateInputFilterValue({
                      ...negativeReview,
                      duration: value,
                    })
                  }
                  options={DURATIONS}
                />
              </div>
            </div>

            {/* Input based filters */}
            <div className={styles.groupedFilters__input}>
              {/* ASIN's filters */}
              <div className={styles.inputGroups}>
                <p>Include ASIN's</p>
                <Input
                  className={styles.formInput__long}
                  placeholder="Enter ASINs separated by commas"
                  value={asins}
                  onChange={evt => {
                    setAsins(evt.target.value);
                  }}
                />
              </div>

              {/* Brands's filters */}
              <div className={styles.inputGroups}>
                <p>Include brands</p>
                <Input
                  className={styles.formInput__long}
                  placeholder="Enter brands separated by commas"
                  value={brands}
                  onChange={evt => {
                    setBrands(evt.target.value);
                  }}
                />
              </div>

              {/* Seller ID's filters */}
              <div className={styles.inputGroups}>
                <p>Include Seller IDs</p>
                <Input
                  className={styles.formInput__long}
                  placeholder="Enter Seller IDs separated by commas"
                  value={sellerIds}
                  onChange={evt => {
                    setSellerIds(evt.target.value);
                  }}
                />
              </div>
            </div>

            {/* Marketplace, Launched Filters and submission*/}
            <div className={styles.groupedFilters}>
              {/* Matketplace Filter */}
              <div className={styles.inputGroups__marketplace}>
                <p>Marketplace</p>
                <Dropdown
                  placeholder="United States"
                  defaultValue={market}
                  className="formDropdown__marketplace"
                  onChange={(evt, { value }: any) => updateMarketplace(value)}
                  selection
                  options={marketplaceOptions}
                />
              </div>

              {/* Size Tier Filters */}
              <div className={styles.groupedFilters}>
                <p>Size Tier</p>
                <div className={styles.inputGroups__sizeTier}>
                  <Checkbox
                    radio
                    label="Launched < 1-yr"
                    className={styles.formInput}
                    name="launched"
                    checked={launched.value === '<1Y'}
                    onChange={() =>
                      updateFilter({
                        ...launched,
                        value: '<1Y',
                      })
                    }
                  />
                </div>

                <div className={styles.inputGroups__sizeTier}>
                  <Checkbox
                    radio
                    label="Launched > 1-yr"
                    className={styles.formInput}
                    name="launched"
                    checked={launched.value === '>1Y'}
                    onChange={() =>
                      updateFilter({
                        ...launched,
                        value: '>1Y',
                      })
                    }
                  />
                </div>

                <div className={styles.inputGroups__sizeTier}>
                  {/*<Checkbox*/}
                  {/*  label="FBM"*/}
                  {/*  checked={fbm.active}*/}
                  {/*  onChange={() => updateFilter({ ...fbm, active: !fbm.active })}*/}
                  {/*/>*/}
                  <Checkbox
                    radio
                    label="All"
                    className={styles.formInput}
                    name="launched"
                    checked={launched.value === null || launched.value === ''}
                    onChange={() =>
                      updateFilter({
                        ...launched,
                        value: '',
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Location Panel */}
        <TabPanel>
          <div className={styles.locationContainer}>
            <div className={styles.groupedFilters__state}>
              <p>State</p>
              <Dropdown
                placeholder="State"
                fluid
                className="formDropdown__state"
                value={state}
                onChange={(evt, { value }: any) => setState(value)}
                selection
                options={states}
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {/* Filter submission */}
      <div className={styles.filterSubmit}>
        <Button
          size="small"
          className={styles.filterSubmit__reset}
          onClick={() => {
            localStorage.removeItem('showSellerDatabaseData');
            setAsins('');
            setBrands('');
            setSellerIds('');
            setState('');
            fetchSellersDatabase({ resetFilters: true });
          }}
        >
          Reset
        </Button>
        <Button
          size="small"
          disabled={isFilterInputError}
          className={styles.filterSubmit__find}
          onClick={() => {
            localStorage.setItem('showSellerDatabaseData', 'true');
            fetchSellersDatabase({
              filters: true,
              sort: 'seller_id',
              asins,
              brands,
              sellerIds,
              state,
            });
          }}
        >
          Find
        </Button>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  filters: sellerDatabaseFilters(state),
  market: sellerDatabaseMarket(state),
});

const mapDispatchToProps = {
  loadFilters: () => loadFilters(),
  updateFilter: (filter: SellerDatabaseFilter) => updateSellerDatabaseFilters(filter),
  fetchSellersDatabase: (payload: SellerDatabasePayload) => fetchSellersDatabase(payload),
  updateMarketplace: (market: string) => updateMarketplace(market),
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
