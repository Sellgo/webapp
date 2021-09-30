import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

/* Styling */
import styles from './index.module.scss';

/* Constanst */
import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';

/* Utils */
import { success } from '../../../../utils/notifications';
import { getDomain, convertAsinLinks } from '../../../../utils/amazonStore';

/* Actions */
import { fetchCentralScrapingProgress } from '../../../../actions/SellerResearch/SellerInventory';

/* Components */
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';

/* Hooks */
import { useFindRefreshSeller } from '../SocketProviders/FindRefreshSeller';
import { useFindRefreshSellerByAsin } from '../SocketProviders/FindRefreshSellerByAsin';

export const searchChoices = [
  { label: 'Using Seller IDs', value: 'sellerId' },
  { label: 'Using Product ASINs/Links', value: 'asins' },
];

interface Props {
  fetchCentralScrapingProgress: () => void;
}

const InventoryFilters = (props: Props) => {
  const { fetchCentralScrapingProgress } = props;

  const [searchInput, setSearchInput] = useState('');
  const [searchChoice, setSearchChoice] = useState('asins');
  const [searchError, setSearchError] = useState(false);
  const [notSupportedMarketplace, setNonSupportedMarketplace] = useState(false);

  const { handleFindOrRefresh } = useFindRefreshSeller();
  const { handleFindOrRefreshByAsin } = useFindRefreshSellerByAsin();

  /* Reset the form */
  const handleReset = () => {
    setSearchInput('');
    setSearchChoice('sellerId');
  };

  /* Handle Submission */
  const handleSubmit = () => {
    if (searchChoice === 'sellerId') {
      handleFindOrRefresh({
        merchantIds: searchInput,
        type: 'find',
      });
    } else if (searchChoice === 'asins') {
      handleFindOrRefreshByAsin({
        asins: searchInput,
        parentAsin: false,
      });
    }
    success('Search for seller started');
    fetchCentralScrapingProgress();
    handleReset();
  };

  useEffect(() => {
    // validate all Seller Id's
    if (searchChoice === 'sellerId') {
      if (searchInput.length) {
        const sellerIdList = searchInput.split(',');

        const isValidSellerIdsList = sellerIdList
          .filter(s => s.trim().length > 0)
          .every((sellerId: string) => isValidAmazonSellerId(sellerId.trim()));

        setSearchError(!isValidSellerIdsList);
      } else {
        setSearchError(false);
        setNonSupportedMarketplace(false);
      }
      return;
    }

    // validate seller ASINS
    if (searchChoice === 'asins') {
      if (searchInput.length) {
        const asinList = searchInput.split(',');

        const filteredAsin = asinList.filter(a => a.trim().length > 0);

        const hasURL = filteredAsin.some(a => validator.isURL(a) || a.includes('htttp://'));

        setNonSupportedMarketplace(hasURL);

        const isValidAsinList = filteredAsin.every((a: string) => isValidAsin(a.trim()));

        setSearchError(!isValidAsinList);
      } else {
        setSearchError(false);
        setNonSupportedMarketplace(false);
      }
      return;
    }
  }, [searchChoice, searchInput]);

  const disableSearch = searchInput.length === 0 || searchError;

  const handleOnPaste = (value: string) => {
    const supportedStores = /(amazon.com(.?)$)/i;

    if (validator.isURL(value)) {
      const isSupportedStore = supportedStores.test(getDomain(value));
      const convertedData = isSupportedStore ? convertAsinLinks(value) : value;

      if (!isSupportedStore) {
        setNonSupportedMarketplace(true);
      }

      setSearchInput(prevState => {
        const prevStateArray = prevState.split(',').filter((s: string) => s.trim().length > 0);
        return [...prevStateArray, convertedData].join(',');
      });
    } else {
      const convertedData = convertAsinLinks(value);
      setSearchInput(prevState => {
        const prevStateArray = prevState.split(',').filter((s: string) => s.trim().length > 0);
        return [...prevStateArray, convertedData].join('');
      });
    }
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.basicFilters}>
        {/* Search Input  */}
        <InputFilter
          label="Search for Sellers on Amazon"
          placeholder="Insert Amazon Links or ASINs or Seller IDs"
          value={searchInput}
          handleChange={value => setSearchInput(value.toUpperCase())}
          className={styles.longInput}
          error={searchError}
          handleOnPaste={handleOnPaste}
        />
        <RadioListFilters
          filterOptions={searchChoices}
          value={searchChoice}
          handleChange={value => setSearchChoice(value)}
        />
        {notSupportedMarketplace && (
          <p className={styles.nonSupportedMarketplaceMessage}>We only suuport U.S. Marketplace</p>
        )}
      </div>

      <FormFilterActions
        onFind={handleSubmit}
        onReset={handleReset}
        submitLabel="Search"
        disabled={disableSearch}
      />
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(null, mapDispatchToProps)(InventoryFilters);
