import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Accordion, Icon, Image, Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchSellerDatabase,
  setIsRestoringSellerDatabaseLastSearch,
  setSellerDatabaseMarketplace,
} from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  MarketplaceOption,
  SellerDatabasePayload,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Constants */
import {
  DEFAULT_SELLER_DATABASE_FILTER,
  DEFAULT_INCLUDE_EXCLUDE_ERROR,
  //FILTER_PERIOD_DURATIONS,
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
  //FILTER_REVIEW_OPTIONS,
  //GROWTH_PERCENT_PERIOD_OPTIONS,
  //LAUNCHED_FILTER_OPTIONS,
  //SELLER_TYPE_FILTER_OPTIONS,
  FILTER_QUERY_KEY_MAPPER,
  getMinMaxPeriodFilter,
  getGrowthFilter,
  getMarketplace,
  SIMPLE_SD_FILTERS,
  MIN_MAX_SD_FILTERS,
  INCLUDE_EXCLUDE_SD_FILTERS,
  PRODUCT_COUNT_CHOICES,
  BRANDS_COUNT_CHOICES,
  SALES_ESTIMATE_CHOICES,
} from '../../../../constants/SellerResearch/SellerDatabase';

import { getProductCategories } from '../../../../constants/ProductResearch/ProductsDatabase';
import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';
import {
  ALL_US_STATES,
  SELLER_DATABASE_COUNTRY_DROPDOWN_LIST,
} from '../../../../constants/SellerResearch/SellerMap';
import { F_TYPES } from '../../../../constants/SellerResearch';

/* Components */
import InputFilter from '../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../../components/FormFilters/MinMaxFilter';
//import PeriodFilter from '../../../../components/FormFilters/PeriodFilter';
import MarketPlaceFilter from '../../../../components/FormFilters/MarketPlaceFilter';
//import MinMaxRatingsFilter from '../../../../components/FormFilters/MinMaxRatingsFilter';
//import ReviewTypeFilter from '../../../../components/FormFilters/ReviewTypeFilter';
import CheckboxDropdownFilter from '../../../../components/FormFilters/CheckboxDropdownFilter';
//import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';
import CheckboxFilter from '../../../../components/FormFilters/CheckboxFilter';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Configs */
import { AppConfig } from '../../../../config';

/* Assets */
import SquareMinusRegular from '../../../../assets/images/minus-square-regular.svg';
import SquarePlusRegular from '../../../../assets/images/plus-square-regular (1).svg';
import downArrow from '../../../../assets/images/sorting-icon-down.svg';
import upArrow from '../../../../assets/images/angle-up-black.svg';
import OnboardingTooltip from '../../../../components/OnboardingTooltip';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  setSellerDatabaseMarketplace: (payload: MarketplaceOption) => void;
  setIsRestoringSellerDatabaseLastSearch: (isRestoringSellerDatabaseLastSearch: boolean) => void;
  sellerDatabaseIsRestoringLastSearch: boolean;
  setShowFilterInitMessage: (a: boolean) => void;
}

const SellerDatabaseFilters = (props: Props) => {
  const {
    fetchSellerDatabase,
    setSellerDatabaseMarketplace,
    sellerDatabaseIsRestoringLastSearch,
    setIsRestoringSellerDatabaseLastSearch,
    setShowFilterInitMessage,
  } = props;

  const [showGeneralFilters, setShowGeneralFilters] = useState(true);
  const [showBuyingIntentFilters, setShowBuyingIntentFilters] = useState(true);
  const [activeFilterValues, setActiveFilterValues] = useState<{ [key: string]: any }>({});
  // const [generalFiltersActiveIndexes, setGeneralFiltersActiveIndexes] = useState<number[]>([-1]);
  // const [buyingIntentFiltersActiveIndexes, setBuyingIntentFiltersActiveIndexes] = useState<
  //   number[]
  // >([-1]);
  const [revenueChoiceIndex, setRevenueChoiceIndex] = useState<number>(-1);
  const [productChoiceIndex, setProductChoiceIndex] = useState<number>(-1);
  const [brandChoiceIndex, setBrandChoiceIndex] = useState<number>(-1);
  const [filterActiveIndex, setFilterActiveIndex] = useState<number>(-1);
  const [sellerDatabaseFilters, setSellerDatabaseFilters] = useState(
    DEFAULT_SELLER_DATABASE_FILTER
  );
  const [sellerDatabaseTextFieldFilters, setSellerDatabaseTextFieldFilters] = useState({
    ...DEFAULT_SELLER_DATABASE_FILTER,
  });
  const [marketPlace, setMarketPlace] = useState<MarketplaceOption>(DEFAULT_US_MARKET);
  const [isFilteredOnce, setIsFilteredOnce] = useState<boolean>(false);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    console.log(key, value);
    setIsFilteredOnce(true);
    if (key === 'countries') {
      setSellerDatabaseFilters((prevValues: any) => ({ ...prevValues, [key]: value, states: [] }));
    } else {
      setSellerDatabaseFilters((prevValues: any) => ({ ...prevValues, [key]: value }));
    }
  };

  const updateSellerDatabaseTextFieldFilter = (key: string, value: any) => {
    // console.log('108 =>', sellerDatabaseTextFieldFilters, key, value);
    if (key === 'countries') {
      setSellerDatabaseTextFieldFilters((prevValues: any) => ({
        ...prevValues,
        [key]: value,
        states: [],
      }));
    } else {
      setSellerDatabaseTextFieldFilters((prevValues: any) => ({ ...prevValues, [key]: value }));
    }
  };

  const getActiveFilters = () => {
    console.log(sellerDatabaseFilters);
    const activeFilters: string[] = [];
    let activeFilterValues = {};
    SIMPLE_SD_FILTERS.forEach(sdFilter => {
      console.log(
        Array.isArray(sellerDatabaseFilters[sdFilter]),
        sellerDatabaseFilters[sdFilter].length > 0
      );
      if (Array.isArray(sellerDatabaseFilters[sdFilter])) {
        if (sellerDatabaseFilters[sdFilter].length > 0) {
          activeFilters.push(sdFilter);
          activeFilterValues = {
            ...activeFilterValues,
            [sdFilter]: sellerDatabaseFilters[sdFilter].toString(),
          };
        }
      } else if (sellerDatabaseFilters[sdFilter]) {
        activeFilters.push(sdFilter);
        switch (sdFilter) {
          case 'hasContact':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Contacts',
            };
            break;
          case 'hasAddress':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Address',
            };
            break;
          case 'hasWebsite':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Company website',
            };
            break;
          case 'hasCompanyEmail':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Company email',
            };
            break;
          case 'hasCompanySocial':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Company social media',
            };
            break;
          case 'hasProfessionalEmail':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Professional email',
            };
            break;
          case 'hasPersonalEmail':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Personal email',
            };
            break;
          case 'hasEmployeePhone':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Direct phone',
            };
            break;
          case 'hasEmployeeSocial':
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: 'Personal social media',
            };
            break;

          default:
            activeFilterValues = {
              ...activeFilterValues,
              [sdFilter]: sellerDatabaseFilters[sdFilter],
            };
            break;
        }
      }
    });
    MIN_MAX_SD_FILTERS.forEach(minMaxSdFilter => {
      if (sellerDatabaseFilters[minMaxSdFilter].min || sellerDatabaseFilters[minMaxSdFilter].max) {
        activeFilters.push(minMaxSdFilter);
        if (!sellerDatabaseFilters[minMaxSdFilter].min) {
          activeFilterValues = {
            ...activeFilterValues,
            [minMaxSdFilter]: `<${sellerDatabaseFilters[minMaxSdFilter].max}`,
          };
        } else if (!sellerDatabaseFilters[minMaxSdFilter].max) {
          activeFilterValues = {
            ...activeFilterValues,
            [minMaxSdFilter]: `>${sellerDatabaseFilters[minMaxSdFilter].min}`,
          };
        } else {
          activeFilterValues = {
            ...activeFilterValues,
            // eslint-disable-next-line max-len
            [minMaxSdFilter]: `${sellerDatabaseFilters[minMaxSdFilter].min} -> ${sellerDatabaseFilters[minMaxSdFilter].max}`,
          };
        }
      }
    });
    INCLUDE_EXCLUDE_SD_FILTERS.forEach(includeExcludeSdFilter => {
      if (
        sellerDatabaseFilters[includeExcludeSdFilter].include ||
        sellerDatabaseFilters[includeExcludeSdFilter].exclude
      ) {
        if (sellerDatabaseFilters[includeExcludeSdFilter].include) {
          activeFilterValues = {
            ...activeFilterValues,
            // eslint-disable-next-line max-len
            [`${includeExcludeSdFilter}__include`]: `Include -> ${sellerDatabaseFilters[includeExcludeSdFilter].include}`,
          };
        }
        if (sellerDatabaseFilters[includeExcludeSdFilter].exclude) {
          activeFilterValues = {
            ...activeFilterValues,
            // eslint-disable-next-line max-len
            [`${includeExcludeSdFilter}__exclude`]: `Exclude -> ${sellerDatabaseFilters[includeExcludeSdFilter].exclude}`,
          };
        }
        activeFilters.push(includeExcludeSdFilter);
      }
    });
    setActiveFilterValues({ ...activeFilterValues });
  };

  const removeActiveFilter = (filterName: string) => {
    if (filterName.includes('__include')) {
      filterName = filterName.replace('__include', '');
    } else if (filterName.includes('__exclude')) {
      filterName = filterName.replace('__exclude', '');
    }
    if (SIMPLE_SD_FILTERS.indexOf(filterName) >= 0) {
      if (Array.isArray(sellerDatabaseFilters[filterName])) {
        updateSellerDatabaseFilter(filterName, []);
      } else if (typeof sellerDatabaseFilters[filterName] === 'string') {
        updateSellerDatabaseFilter(filterName, '');
      } else {
        updateSellerDatabaseFilter(filterName, false);
      }
      return;
    }
    if (MIN_MAX_SD_FILTERS.indexOf(filterName) >= 0) {
      updateSellerDatabaseFilter(filterName, {
        min: '',
        max: '',
      });
      return;
    }
    if (INCLUDE_EXCLUDE_SD_FILTERS.indexOf(filterName) >= 0) {
      updateSellerDatabaseFilter(filterName, {
        include: '',
        exclude: '',
      });
      return;
    }
  };

  useEffect(() => {
    if (isFilteredOnce) {
      handleSubmit();
      setSellerDatabaseTextFieldFilters({ ...sellerDatabaseFilters });
    }
  }, [sellerDatabaseFilters]);

  /* Error States */
  const [asinsError, setAsinsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);
  const [sellerIdsError, setSellerIdsError] = useState(DEFAULT_INCLUDE_EXCLUDE_ERROR);

  /* Handlers */
  const handleSubmit = () => {
    if (asinsError.include || asinsError.exclude) {
      return;
    }
    const filterPayload = { ...sellerDatabaseFilters };
    filterPayload.categories = filterPayload.categories.join('|');
    filterPayload.countries = filterPayload.countries.join('|');
    filterPayload.states = filterPayload.states.join('|');
    filterPayload.country = filterPayload.country === 'All Countries' ? '' : filterPayload.country;
    filterPayload.state = filterPayload.state === 'All States' ? '' : filterPayload.state;
    delete filterPayload.isLookedUp;
    delete filterPayload.isCollection;
    setShowFilterInitMessage(false);
    fetchSellerDatabase({ filterPayload, marketplaceId: marketPlace.value });
    localStorage.setItem('isFilteredOnce', 'true');
  };

  const handleReset = () => {
    setShowFilterInitMessage(true);
    setIsFilteredOnce(false);
    setSellerDatabaseMarketplace(DEFAULT_US_MARKET);
    setSellerDatabaseFilters(DEFAULT_SELLER_DATABASE_FILTER);
    setSellerDatabaseTextFieldFilters(DEFAULT_SELLER_DATABASE_FILTER);
    /* Reset Error States */
    setAsinsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);
    setSellerIdsError(DEFAULT_INCLUDE_EXCLUDE_ERROR);

    fetchSellerDatabase({ resetFilter: true });
  };

  const handleRestoreLastSearch = async () => {
    setShowFilterInitMessage(false);
    const sellerID = sellerIDSelector();
    try {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/last-search?type=seller_database`;
      const { data } = await axios.get(URL);
      const restoredSellerDatabaseFilters = { ...sellerDatabaseFilters };
      if (data && data.length > 0) {
        const restoredFilter = JSON.parse(data[0].parameter);
        /* Special treatment to set categories */
        if (restoredFilter.categories) {
          restoredFilter.categories = restoredFilter.categories.split('|');
          restoredSellerDatabaseFilters.categories = restoredFilter.categories;
        }
        if (restoredFilter.countries) {
          restoredFilter.countries = restoredFilter.countries.split('|');
          restoredSellerDatabaseFilters.countries = restoredFilter.countries;
        }
        if (restoredFilter.states) {
          restoredFilter.states = restoredFilter.states.split('|');
          restoredSellerDatabaseFilters.states = restoredFilter.states;
        }

        /* Special treatment to set marketplace */
        if (restoredFilter.marketplace_id) {
          setMarketPlace(getMarketplace(restoredFilter.marketplace_id));
          setSellerDatabaseMarketplace(getMarketplace(restoredFilter.marketplace_id));
        }

        Object.keys(FILTER_QUERY_KEY_MAPPER).forEach((payloadKey: string) => {
          const filter = FILTER_QUERY_KEY_MAPPER[payloadKey];
          /* If MIN_MAX_FILTER */
          if (filter.type === F_TYPES.MIN_MAX) {
            if (restoredFilter[`${filter.keyName}_min`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                min: restoredFilter[`${filter.keyName}_min`],
              };
            }

            if (restoredFilter[`${filter.keyName}_max`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                max: restoredFilter[`${filter.keyName}_max`],
              };
            }
            /* IF INPUT_EXCLUDE FILTER */
          } else if (filter.type === F_TYPES.INPUT_INCLUDE_EXCLUDE) {
            if (restoredFilter[`include_${filter.keyName}`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                include: restoredFilter[`include_${filter.keyName}`],
              };
            }
            if (restoredFilter[`exclude_${filter.keyName}`]) {
              restoredSellerDatabaseFilters[payloadKey] = {
                ...restoredSellerDatabaseFilters[payloadKey],
                exclude: restoredFilter[`exclude_${filter.keyName}`],
              };
            }
            /* IF MIN_MAX_PERIOD_REVIEW FILTER */
          } else if (filter.type === F_TYPES.MIN_MAX_PERIOD_REVIEW) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getMinMaxPeriodFilter(key, restoredFilter[key], true)) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getMinMaxPeriodFilter(key, restoredFilter[key], true),
                };
              }
            });

            /* IF MIN_MAX_PERIOD FILTER */
          } else if (filter.type === F_TYPES.MIN_MAX_PERIOD) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getMinMaxPeriodFilter(key, restoredFilter[key]) && key.includes(filter.keyName)) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getMinMaxPeriodFilter(key, restoredFilter[key]),
                };
              }
            });

            /* IF GROWTH FILTER */
          } else if (
            filter.type === F_TYPES.GROWTH_PERCENT_FILTER ||
            filter.type === F_TYPES.GROWTH_COUNT_FILTER
          ) {
            Object.keys(restoredFilter).forEach((key: string) => {
              if (getGrowthFilter(key, restoredFilter[key])) {
                restoredSellerDatabaseFilters[payloadKey] = {
                  ...restoredSellerDatabaseFilters[payloadKey],
                  ...getGrowthFilter(key, restoredFilter[key]),
                };
              }
            });
            /* IF OTHER TYPES OF FILTER */
          } else if (restoredFilter[filter.keyName] && filter.keyName !== 'categories') {
            restoredSellerDatabaseFilters[payloadKey] = restoredFilter[filter.keyName];
          }
        });

        setSellerDatabaseFilters(restoredSellerDatabaseFilters);
        setSellerDatabaseTextFieldFilters(restoredSellerDatabaseFilters);
      }
    } catch (err) {
      handleReset();
    }
  };

  /* Effect on component mount */
  useEffect(() => {
    handleReset();

    return () => {
      handleReset();
    };
  }, []);

  /* Effect on restore last search */
  useEffect(() => {
    if (sellerDatabaseIsRestoringLastSearch) {
      handleRestoreLastSearch();
      setIsRestoringSellerDatabaseLastSearch(false);
    }
  }, [sellerDatabaseIsRestoringLastSearch]);

  /* Include Asin validation check */
  useEffect(() => {
    if (sellerDatabaseTextFieldFilters.asins.include) {
      const asinList = sellerDatabaseTextFieldFilters.asins.include.split(',');

      const isValidAsinList = asinList
        .filter((a: string) => a.trim().length > 0)
        .every((asin: string) => isValidAsin(asin));

      setAsinsError(prevState => ({
        ...prevState,
        include: !isValidAsinList,
      }));
    } else {
      setAsinsError(prevState => ({
        ...prevState,
        include: false,
      }));
    }
  }, [sellerDatabaseTextFieldFilters.asins.include]);

  /* Exclude Asin validation check */
  useEffect(() => {
    if (sellerDatabaseTextFieldFilters.asins.exclude) {
      const asinList = sellerDatabaseTextFieldFilters.asins.exclude.split(',');

      const isValidAsinList = asinList
        .filter((a: string) => a.trim().length > 0)
        .every((asin: string) => isValidAsin(asin));

      setAsinsError(prevState => ({
        ...prevState,
        exclude: !isValidAsinList,
      }));
    } else {
      setAsinsError(prevState => ({
        ...prevState,
        exclude: false,
      }));
    }
  }, [sellerDatabaseTextFieldFilters.asins.exclude]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.sellerIds.include) {
      const sellerIdList = sellerDatabaseFilters.sellerIds.include.split(',');
      const isValidSellerIdsList = sellerIdList.every((sellerid: string) =>
        isValidAmazonSellerId(sellerid)
      );
      setSellerIdsError(prevState => ({
        ...prevState,
        include: !isValidSellerIdsList,
      }));
    } else {
      setSellerIdsError(prevState => ({
        ...prevState,
        include: false,
      }));
    }
  }, [sellerDatabaseFilters.sellerIds.include]);

  /* Include Seller ID validation check */
  useEffect(() => {
    if (sellerDatabaseFilters.sellerIds.exclude) {
      const sellerIdList = sellerDatabaseFilters.sellerIds.exclude.split(',');
      const isVliadSellerIdsList = sellerIdList.every((sellerid: string) =>
        isValidAmazonSellerId(sellerid)
      );
      setSellerIdsError(prevState => ({
        ...prevState,
        exclude: !isVliadSellerIdsList,
      }));
    } else {
      setSellerIdsError(prevState => ({
        ...prevState,
        exclude: false,
      }));
    }
  }, [sellerDatabaseFilters.sellerIds.exclude]);

  useEffect(() => {
    getActiveFilters();
  }, [sellerDatabaseFilters]);

  /* Overall form submit diable condition */
  const disableFormSubmit = useMemo(() => {
    const shouldDisabledFormSubmit =
      asinsError.include || asinsError.exclude || sellerIdsError.include || sellerIdsError.exclude;

    return shouldDisabledFormSubmit;
  }, [asinsError.include, asinsError.exclude, sellerIdsError.include, sellerIdsError.exclude]);

  // const setFilterActiveIndex = (activeIndex: number) => {
  //   const newIndex = [...generalFiltersActiveIndexes];

  //   const currentIndexPosition = generalFiltersActiveIndexes.indexOf(activeIndex);
  //   if (currentIndexPosition > -1) {
  //     newIndex.splice(currentIndexPosition, 1);
  //   } else {
  //     newIndex.push(activeIndex);
  //   }
  //   setGeneralFiltersActiveIndexes([...newIndex]);
  // };

  // const setFilterActiveIndex = (activeIndex: number) => {
  //   const newIndex = [...buyingIntentFiltersActiveIndexes];

  //   const currentIndexPosition = buyingIntentFiltersActiveIndexes.indexOf(activeIndex);
  //   if (currentIndexPosition > -1) {
  //     newIndex.splice(currentIndexPosition, 1);
  //   } else {
  //     newIndex.push(activeIndex);
  //   }
  //   setBuyingIntentFiltersActiveIndexes([...newIndex]);
  // };

  const handleAccordianUpArrowClick = (number: number) => {
    if (filterActiveIndex === number) {
      setFilterActiveIndex(-1);
    } else {
      setFilterActiveIndex(number);
    }
  };

  useEffect(() => {
    handleProductCountChange();
  }, [productChoiceIndex]);

  const handleProductCountChange = () => {
    if (productChoiceIndex >= 0) {
      if (productChoiceIndex === 6) {
        updateSellerDatabaseTextFieldFilter('numOfInventory', {
          min: '',
          max: '',
        });
        return;
      }
      updateSellerDatabaseFilter('numOfInventory', {
        min: PRODUCT_COUNT_CHOICES[productChoiceIndex].minValue,
        max: PRODUCT_COUNT_CHOICES[productChoiceIndex].maxValue,
      });
      return;
    }
  };

  useEffect(() => {
    handleBrandCountChange();
  }, [brandChoiceIndex]);

  const handleBrandCountChange = () => {
    if (brandChoiceIndex >= 0) {
      if (brandChoiceIndex === 5) {
        updateSellerDatabaseTextFieldFilter('numOfBrands', {
          min: '',
          max: '',
        });
        return;
      }
      updateSellerDatabaseFilter('numOfBrands', {
        min: BRANDS_COUNT_CHOICES[brandChoiceIndex].minValue,
        max: BRANDS_COUNT_CHOICES[brandChoiceIndex].maxValue,
      });
      return;
    }
  };

  useEffect(() => {
    handleSalesEstimateChange();
  }, [revenueChoiceIndex]);

  const handleSalesEstimateChange = () => {
    if (revenueChoiceIndex >= 0) {
      if (revenueChoiceIndex === 10) {
        updateSellerDatabaseTextFieldFilter('monthlyRevenue', {
          min: '',
          max: '',
        });
        return;
      }
      updateSellerDatabaseFilter('monthlyRevenue', {
        min: SALES_ESTIMATE_CHOICES[revenueChoiceIndex].minValue,
        max: SALES_ESTIMATE_CHOICES[revenueChoiceIndex].maxValue,
      });
      return;
    }
  };

  const currentIcon: { [key: string]: any } = {
    companyName: <Icon name="building" className={styles.accordian__title__icon} />,
    countries: <Icon name="map marker alternate" className={styles.accordian__title__icon} />,
    states: <Icon name="map marker alternate" className={styles.accordian__title__icon} />,
    zipCode: <Icon name="map marker alternate" className={styles.accordian__title__icon} />,
    hasAddress: <Icon name="users" className={styles.accordian__title__icon} />,
    hasContact: <Icon name="users" className={styles.accordian__title__icon} />,
    hasWebsite: <Icon name="globe" className={styles.accordian__title__icon} />,
    hasCompanyEmail: <Icon name="envelope" className={styles.accordian__title__icon} />,
    hasCompanySocial: <Icon name="users" className={styles.accordian__title__icon} />,
    hasProfessionalEmail: <Icon name="envelope" className={styles.accordian__title__icon} />,
    hasPersonalEmail: <Icon name="envelope" className={styles.accordian__title__icon} />,
    hasEmployeePhone: <Icon name="phone" className={styles.accordian__title__icon} />,
    hasEmployeeSocial: <Icon name="users" className={styles.accordian__title__icon} />,
    categories: <Icon name="list" className={styles.accordian__title__icon} />,
    numOfInventory: <Icon name="boxes" className={styles.accordian__title__icon} />,
    numOfBrands: <Icon name="tag" className={styles.accordian__title__icon} />,
    monthlyRevenue: <Icon name="chart line" className={styles.accordian__title__icon} />,
    brands__include: <Icon name="tag" className={styles.accordian__title__icon} />,
    brands__exclude: <Icon name="tag" className={styles.accordian__title__icon} />,
    asins__include: <Icon name="boxes" className={styles.accordian__title__icon} />,
    asins__exclude: <Icon name="boxes" className={styles.accordian__title__icon} />,
  };

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.activeFiltersWrapper}>
          {activeFilterValues && Object.keys(activeFilterValues).length > 0 && (
            <>
              <div className={styles.activeFiltersPils}>
                {Object.keys(activeFilterValues).map((activeFilter, index) => {
                  return (
                    <div key={index} className={styles.activeFiltersPils__pil}>
                      <div className={styles.icons}>{currentIcon[activeFilter]}</div>
                      <p className={styles.activeFiltersPils__pil__text}>
                        {activeFilterValues[activeFilter]}{' '}
                        <OnboardingTooltip
                          youtubeLink={''}
                          tooltipMessage={activeFilterValues[activeFilter]}
                          infoIconClassName="infoOnboardingIcon"
                          youtubeIconClassName="youtubeOnboarding"
                        />
                      </p>
                      <p className={styles.cross} onClick={() => removeActiveFilter(activeFilter)}>
                        x
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.btnWrapper}>
                <button onClick={() => handleReset()} className={styles.btn}>
                  <span className={styles.cross}>x</span>Clear all
                </button>
              </div>
            </>
          )}
          {(!activeFilterValues || Object.keys(activeFilterValues).length) === 0 && (
            <p>Filter by</p>
          )}
        </div>
        <div className={styles.filterType}>
          {showGeneralFilters ? (
            <Image
              src={SquareMinusRegular}
              onClick={() => setShowGeneralFilters(false)}
              className={styles.filterType__img}
            />
          ) : (
            <Image
              src={SquarePlusRegular}
              onClick={() => setShowGeneralFilters(true)}
              className={styles.filterType__img}
            />
          )}
          <p className={styles.filterType__text}>GENERAL </p>
        </div>
        <div className={`${styles.basicFilters} ${!showGeneralFilters && styles.hide}`}>
          {/* Marketplace */}

          {/* Feature request */}
          {/* Company Name */}
          <Accordion>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 0 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 0}
                index={0}
                onClick={() => handleAccordianUpArrowClick(0)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="building" className={styles.accordian__title__icon} />
                  <p>Company name</p>
                </div>
                <Image
                  src={filterActiveIndex === 0 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 0}>
                <div>
                  <InputFilter
                    label=""
                    placeholder="Enter Company name"
                    value={sellerDatabaseTextFieldFilters.companyName}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter('companyName', e.target.value);
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('companyName', value)
                    }
                    className={sellerDatabaseTextFieldFilters.companyName && styles.activeFilter}
                  />
                </div>
              </Accordion.Content>
            </div>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 1 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 1}
                index={1}
                onClick={() => handleAccordianUpArrowClick(1)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="world" className={styles.accordian__title__icon} />
                  <p>Marketplace</p>
                </div>
                <Image
                  src={filterActiveIndex === 1 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 1}>
                <div>
                  <MarketPlaceFilter
                    label=""
                    marketplaceDetails={marketPlace}
                    marketPlaceChoices={SELLER_DB_MARKETPLACE}
                    handleChange={(option: MarketplaceOption) => {
                      setMarketPlace(option);
                      setSellerDatabaseMarketplace(option);
                      if (
                        getProductCategories(option.code) !== getProductCategories(marketPlace.code)
                      ) {
                        updateSellerDatabaseFilter('categories', []);
                      }
                    }}
                  />
                </div>
              </Accordion.Content>
            </div>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 2 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 2}
                index={2}
                onClick={() => handleAccordianUpArrowClick(2)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="map marker alternate" className={styles.accordian__title__icon} />
                  <p>Location</p>
                </div>
                <Image
                  src={filterActiveIndex === 2 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 2}>
                <div>
                  {/* Location */}
                  <CheckboxDropdownFilter
                    filterOptions={SELLER_DATABASE_COUNTRY_DROPDOWN_LIST}
                    label="Country of origin"
                    selectedValues={sellerDatabaseFilters.countries}
                    handleChange={(newCountries: string[]) => {
                      updateSellerDatabaseFilter('countries', [...newCountries]);
                    }}
                  />

                  <CheckboxDropdownFilter
                    filterOptions={ALL_US_STATES}
                    label="U.S. states"
                    selectedValues={sellerDatabaseFilters.states}
                    handleChange={(newStates: string[]) => {
                      updateSellerDatabaseFilter('states', [...newStates]);
                    }}
                    disabled={sellerDatabaseFilters.countries.indexOf('US') === -1}
                  />
                  <InputFilter
                    label="Zip code"
                    placeholder="Zip code"
                    value={sellerDatabaseTextFieldFilters.zipCode}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter('zipCode', e.target.value);
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('zipCode', value)
                    }
                    className={sellerDatabaseTextFieldFilters.zipCode && styles.activeFilter}
                  />
                </div>
              </Accordion.Content>
            </div>

            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 3 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 3}
                index={3}
                onClick={() => handleAccordianUpArrowClick(3)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="users" className={styles.accordian__title__icon} />
                  <p>Contact</p>
                </div>
                <Image
                  src={filterActiveIndex === 3 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 3}>
                <div>
                  <CheckboxFilter
                    label="Company"
                    checkboxLabel="Physical address"
                    checked={sellerDatabaseFilters.hasAddress}
                    handleChange={value => updateSellerDatabaseFilter('hasAddress', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Website"
                    checked={sellerDatabaseFilters.hasWebsite}
                    handleChange={value => updateSellerDatabaseFilter('hasWebsite', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Company email"
                    checked={sellerDatabaseFilters.hasCompanyEmail}
                    handleChange={value => updateSellerDatabaseFilter('hasCompanyEmail', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Company social media"
                    checked={sellerDatabaseFilters.hasCompanySocial}
                    handleChange={value => updateSellerDatabaseFilter('hasCompanySocial', value)}
                  />
                </div>
              </Accordion.Content>
              <Accordion.Content active={filterActiveIndex === 3}>
                <div>
                  <CheckboxFilter
                    label="Decision maker"
                    checkboxLabel="Professional email"
                    checked={sellerDatabaseFilters.hasProfessionalEmail}
                    handleChange={value =>
                      updateSellerDatabaseFilter('hasProfessionalEmail', value)
                    }
                  />
                  <CheckboxFilter
                    checkboxLabel="Personal email"
                    checked={sellerDatabaseFilters.hasPersonalEmail}
                    handleChange={value => updateSellerDatabaseFilter('hasPersonalEmail', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Direct phone"
                    checked={sellerDatabaseFilters.hasEmployeePhone}
                    handleChange={value => updateSellerDatabaseFilter('hasEmployeePhone', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Social media"
                    checked={sellerDatabaseFilters.hasEmployeeSocial}
                    handleChange={value => updateSellerDatabaseFilter('hasEmployeeSocial', value)}
                  />
                </div>
              </Accordion.Content>
            </div>
            {/* <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 
                4
              ) && styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 4)}
                index={4}
                onClick={() => handleAccordianUpArrowClick(4)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="building" className={styles.accordian__title__icon} />
                  <p>Employees</p>
                </div>
                <Image
                  src={filterActiveIndex === 4) ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 4)}>
                <div>
                  <MinMaxFilter
                    label=""
                    minValue={sellerDatabaseTextFieldFilters.numOfEmployees.min}
                    maxValue={sellerDatabaseTextFieldFilters.numOfEmployees.max}
                    handleChange={(type: string, value: string) =>
                      updateSellerDatabaseTextFieldFilter('numOfEmployees', {
                        ...sellerDatabaseTextFieldFilters.numOfEmployees,
                        [type]: value,
                      })
                    }
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter(
                          'numOfEmployees',
                          sellerDatabaseTextFieldFilters.numOfEmployees
                        );
                      }
                    }}
                    maxClassName={
                      sellerDatabaseTextFieldFilters.numOfEmployees.max && styles.activeFilter
                    }
                    minClassName={
                      sellerDatabaseTextFieldFilters.numOfEmployees.min && styles.activeFilter
                    }
                  />
                </div>
              </Accordion.Content>
              <Accordion.Content active={filterActiveIndex === 4)}>
                <div>
                  <CheckboxFilter
                    checkboxLabel="Professional email"
                    checked={sellerDatabaseFilters.hasProfessionalEmail}
                    handleChange={value =>
                      updateSellerDatabaseFilter('hasProfessionalEmail', value)
                    }
                  />              
                  <CheckboxFilter
                    checkboxLabel="Personal email"
                    checked={sellerDatabaseFilters.hasPersonalEmail}
                    handleChange={value => updateSellerDatabaseFilter('hasPersonalEmail', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Phone"
                    checked={sellerDatabaseFilters.hasEmployeePhone}
                    handleChange={value => updateSellerDatabaseFilter('hasEmployeePhone', value)}
                  />
                  <CheckboxFilter
                    checkboxLabel="Social media"
                    checked={sellerDatabaseFilters.hasEmployeeSocial}
                    handleChange={value => updateSellerDatabaseFilter('hasEmployeeSocial', value)}
                  />
                </div>
              </Accordion.Content>
            </div> */}
          </Accordion>
        </div>
        <div className={styles.filterType}>
          {showBuyingIntentFilters ? (
            <Image
              src={SquareMinusRegular}
              onClick={() => setShowBuyingIntentFilters(false)}
              className={styles.filterType__img}
            />
          ) : (
            <Image
              src={SquarePlusRegular}
              onClick={() => setShowBuyingIntentFilters(true)}
              className={styles.filterType__img}
            />
          )}
          <p className={styles.filterType__text}>MARKETPLACE METRICS</p>
        </div>
        <div className={`${styles.basicFilters} ${!showBuyingIntentFilters && styles.hide}`}>
          {/* Marketplace */}

          {/* Feature request */}
          {/* Company Name */}
          <Accordion>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 8 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 8}
                index={0}
                onClick={() => handleAccordianUpArrowClick(8)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="list" className={styles.accordian__title__icon} />
                  <p>Categories</p>
                </div>
                <Image
                  src={filterActiveIndex === 8 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 8}>
                <div>
                  <CheckboxDropdownFilter
                    filterOptions={getProductCategories(marketPlace.code)}
                    label="Main product categories"
                    selectedValues={sellerDatabaseFilters.categories}
                    handleChange={(newCategories: string[]) => {
                      updateSellerDatabaseFilter('categories', [...newCategories]);
                    }}
                  />
                </div>
              </Accordion.Content>
            </div>

            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 9 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 9}
                index={1}
                onClick={() => handleAccordianUpArrowClick(9)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="chart line" className={styles.accordian__title__icon} />
                  <p>Revenue</p>
                </div>
                <Image
                  src={filterActiveIndex === 9 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 9}>
                <div>
                  <p>Annual revenue estimate</p>
                  <div className={styles.minMaxCount}>
                    {SALES_ESTIMATE_CHOICES.map((choice, index) => (
                      <div key={index} className={styles.minMaxCount__choice}>
                        <Radio
                          label={choice.label}
                          checked={revenueChoiceIndex === index}
                          onClick={() => setRevenueChoiceIndex(index)}
                        />
                      </div>
                    ))}
                    <Radio
                      className={styles.minMaxCount__choice}
                      label="Custom"
                      checked={revenueChoiceIndex === 10}
                      onClick={() => setRevenueChoiceIndex(10)}
                    />
                  </div>
                  {revenueChoiceIndex === 10 && (
                    <MinMaxFilter
                      label=""
                      minValue={sellerDatabaseTextFieldFilters.monthlyRevenue.min}
                      maxValue={sellerDatabaseTextFieldFilters.monthlyRevenue.max}
                      handleChange={(type: string, value: string) =>
                        updateSellerDatabaseTextFieldFilter('monthlyRevenue', {
                          ...sellerDatabaseTextFieldFilters.monthlyRevenue,
                          [type]: value,
                        })
                      }
                      handleKeyDown={e => {
                        if (e.key === 'Enter') {
                          updateSellerDatabaseFilter(
                            'monthlyRevenue',
                            sellerDatabaseTextFieldFilters.monthlyRevenue
                          );
                        }
                      }}
                      maxClassName={
                        sellerDatabaseTextFieldFilters.monthlyRevenue.max && styles.activeFilter
                      }
                      minClassName={
                        sellerDatabaseTextFieldFilters.monthlyRevenue.min && styles.activeFilter
                      }
                    />
                  )}

                  {/* <MinMaxFilter
                    label="Annual growth estimate (%)"
                    minValue={sellerDatabaseTextFieldFilters.growthPercent.min}
                    maxValue={sellerDatabaseTextFieldFilters.growthPercent.max}
                    handleChange={(type: string, value: string) =>
                      updateSellerDatabaseTextFieldFilter('growthPercent', {
                        ...sellerDatabaseTextFieldFilters.growthPercent,
                        [type]: value,
                      })
                    }
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter(
                          'growthPercent',
                          sellerDatabaseTextFieldFilters.growthPercent
                        );
                      }
                    }}
                    maxClassName={
                      sellerDatabaseTextFieldFilters.growthPercent.max && styles.activeFilter
                    }
                    minClassName={
                      sellerDatabaseTextFieldFilters.growthPercent.min && styles.activeFilter
                    }
                  />                          */}
                </div>
              </Accordion.Content>
            </div>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 10 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 10}
                index={1}
                onClick={() => handleAccordianUpArrowClick(10)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="tag" className={styles.accordian__title__icon} />
                  <p>Brands</p>
                </div>
                <Image
                  src={filterActiveIndex === 10 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 10}>
                <div>
                  <p>Brands count</p>
                  <div className={styles.minMaxCount}>
                    {BRANDS_COUNT_CHOICES.map((choice, index) => (
                      <div key={index} className={styles.minMaxCount__choice}>
                        <Radio
                          label={choice.label}
                          checked={brandChoiceIndex === index}
                          onClick={() => setBrandChoiceIndex(index)}
                        />
                      </div>
                    ))}
                    <Radio
                      className={styles.minMaxCount__choice}
                      label="Custom"
                      checked={brandChoiceIndex === 5}
                      onClick={() => setBrandChoiceIndex(5)}
                    />
                  </div>
                  {brandChoiceIndex === 5 && (
                    <MinMaxFilter
                      label=""
                      minValue={sellerDatabaseTextFieldFilters.numOfBrands.min}
                      maxValue={sellerDatabaseTextFieldFilters.numOfBrands.max}
                      handleChange={(type: string, value: string) =>
                        updateSellerDatabaseTextFieldFilter('numOfBrands', {
                          ...sellerDatabaseTextFieldFilters.numOfBrands,
                          [type]: value,
                        })
                      }
                      handleKeyDown={e => {
                        if (e.key === 'Enter') {
                          updateSellerDatabaseFilter(
                            'numOfBrands',
                            sellerDatabaseTextFieldFilters.numOfBrands
                          );
                        }
                      }}
                      maxClassName={
                        sellerDatabaseTextFieldFilters.numOfBrands.max && styles.activeFilter
                      }
                      minClassName={
                        sellerDatabaseTextFieldFilters.numOfBrands.min && styles.activeFilter
                      }
                    />
                  )}
                  {/*  Include brands */}
                  <InputFilter
                    label="Include brands"
                    placeholder="Enter separated by comma"
                    // value={sellerDatabaseFilters.brands.include}
                    // handleChange={(value: string) =>
                    //   updateSellerDatabaseFilter('brands', {
                    //     ...sellerDatabaseFilters.brands,
                    //     include: value,
                    //   })
                    // }
                    value={sellerDatabaseTextFieldFilters.brands.include}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter('brands', {
                          exclude: '',
                          include: e.target.value,
                        });
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('brands', {
                        ...sellerDatabaseTextFieldFilters.brands,
                        include: value,
                      })
                    }
                    className={sellerDatabaseTextFieldFilters.brands.include && styles.activeFilter}
                  />

                  {/* Exclude brands */}
                  <InputFilter
                    label="Exclude brands"
                    placeholder="Enter separated by comma"
                    // value={sellerDatabaseFilters.brands.exclude}
                    // handleChange={(value: string) =>
                    //   updateSellerDatabaseFilter('brands', {
                    //     ...sellerDatabaseFilters.brands,
                    //     exclude: value,
                    //   })
                    value={sellerDatabaseTextFieldFilters.brands.exclude}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateSellerDatabaseFilter('brands', {
                          ...sellerDatabaseTextFieldFilters.brands,
                          exclude: e.target.value,
                        });
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('brands', {
                        ...sellerDatabaseTextFieldFilters.brands,
                        exclude: value,
                      })
                    }
                    className={sellerDatabaseTextFieldFilters.brands.exclude && styles.activeFilter}
                  />
                </div>
              </Accordion.Content>
            </div>
            <div
              className={`${styles.accordianBlockWrapper} ${filterActiveIndex === 11 &&
                styles.accordianBlockWrapper__active}`}
            >
              <Accordion.Title
                active={filterActiveIndex === 11}
                index={3}
                onClick={() => handleAccordianUpArrowClick(11)}
                className={styles.accordian__title}
              >
                <div className={styles.accordian__title__block}>
                  <Icon name="boxes" className={styles.accordian__title__icon} />
                  <p>Products</p>
                </div>
                <Image
                  src={filterActiveIndex === 11 ? upArrow : downArrow}
                  className={styles.accordian__title__arrowImage}
                />
              </Accordion.Title>
              <Accordion.Content active={filterActiveIndex === 11}>
                <p>Products count</p>
                <div>
                  {/* Inventory Choices */}

                  <div className={styles.minMaxCount}>
                    {PRODUCT_COUNT_CHOICES.map((choice, index) => (
                      <div key={index} className={styles.minMaxCount__choice}>
                        <Radio
                          label={choice.label}
                          checked={productChoiceIndex === index}
                          onClick={() => setProductChoiceIndex(index)}
                        />
                      </div>
                    ))}
                    <Radio
                      className={styles.minMaxCount__choice}
                      label="Custom"
                      checked={productChoiceIndex === 5}
                      onClick={() => setProductChoiceIndex(5)}
                    />
                  </div>
                  {/* # of Inventory */}
                  {productChoiceIndex === 5 && (
                    <MinMaxFilter
                      label=""
                      minValue={sellerDatabaseTextFieldFilters.numOfInventory.min}
                      maxValue={sellerDatabaseTextFieldFilters.numOfInventory.max}
                      handleChange={(type: string, value: string) =>
                        updateSellerDatabaseTextFieldFilter('numOfInventory', {
                          ...sellerDatabaseTextFieldFilters.numOfInventory,
                          [type]: value,
                        })
                      }
                      handleKeyDown={e => {
                        if (e.key === 'Enter') {
                          updateSellerDatabaseFilter(
                            'numOfInventory',
                            sellerDatabaseTextFieldFilters.numOfInventory
                          );
                        }
                      }}
                      maxClassName={
                        sellerDatabaseTextFieldFilters.numOfInventory.max && styles.activeFilter
                      }
                      minClassName={
                        sellerDatabaseTextFieldFilters.numOfInventory.min && styles.activeFilter
                      }
                    />
                  )}
                  {/* Include ASINS */}
                  <InputFilter
                    label="Include Product IDs"
                    placeholder="Enter separated by comma"
                    // value={sellerDatabaseFilters.asins.include.toUpperCase()}
                    // handleChange={(value: string) =>
                    //   updateSellerDatabaseFilter('asins', {
                    //     ...sellerDatabaseFilters.asins,
                    //     include: value,
                    //   })
                    // }
                    value={sellerDatabaseTextFieldFilters.asins.include.toUpperCase()}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (asinsError.include) {
                          return;
                        }
                        updateSellerDatabaseFilter('asins', {
                          ...sellerDatabaseTextFieldFilters.asins,
                          include: e.target.value,
                        });
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('asins', {
                        ...sellerDatabaseTextFieldFilters.asins,
                        include: value,
                      })
                    }
                    error={asinsError.include}
                    className={sellerDatabaseTextFieldFilters.asins.include && styles.activeFilter}
                  />

                  {/* Exclude ASINS Name */}
                  <InputFilter
                    label="Exclude Product IDs"
                    placeholder="Enter separated by comma"
                    // value={sellerDatabaseFilters.asins.exclude.toUpperCase()}
                    // handleChange={(value: string) =>
                    //   updateSellerDatabaseFilter('asins', {
                    //     ...sellerDatabaseFilters.asins,
                    //     exclude: value,
                    //   })
                    // }
                    value={sellerDatabaseTextFieldFilters.asins.exclude.toUpperCase()}
                    handleKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (asinsError.exclude) {
                          return;
                        }
                        updateSellerDatabaseFilter('asins', {
                          ...sellerDatabaseTextFieldFilters.asins,
                          exclude: e.target.value,
                        });
                      }
                    }}
                    handleChange={(value: string) =>
                      updateSellerDatabaseTextFieldFilter('asins', {
                        ...sellerDatabaseTextFieldFilters.asins,
                        exclude: value,
                      })
                    }
                    error={asinsError.exclude}
                    className={sellerDatabaseTextFieldFilters.asins.exclude && styles.activeFilter}
                  />
                </div>
              </Accordion.Content>
            </div>
          </Accordion>
        </div>
        <FormFilterActions
          onFind={handleSubmit}
          onReset={handleReset}
          disabled={disableFormSubmit}
          hideSubmit
          hideReset
        />
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerDatabaseIsRestoringLastSearch: state.sellerDatabase.sellerDatabaseIsRestoringLastSearch,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsRestoringSellerDatabaseLastSearch: (isRestoringSellerDatabaseLastSearch: boolean) =>
      dispatch(setIsRestoringSellerDatabaseLastSearch(isRestoringSellerDatabaseLastSearch)),
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
    setSellerDatabaseMarketplace: (payload: MarketplaceOption) =>
      dispatch(setSellerDatabaseMarketplace(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseFilters);
