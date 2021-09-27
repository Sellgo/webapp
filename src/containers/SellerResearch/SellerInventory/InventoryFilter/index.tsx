import React, { useEffect, useState } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import FormFilterActions from '../../../../components/FormFilters/FormFilterActions';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import RadioListFilters from '../../../../components/FormFilters/RadioListFilters';
import { useFindRefreshSeller } from '../SocketProviders/FindRefreshSeller';
import { useFindRefreshSellerByAsin } from '../SocketProviders/FindRefreshSellerByAsin';
import { success } from '../../../../utils/notifications';
import { isValidAmazonSellerId, isValidAsin } from '../../../../constants';

export const searchChoices = [
  { label: 'Using Seller IDs', value: 'sellerId' },
  { label: 'Using Product ASINs', value: 'asins' },
];

const InventoryFilters = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchChoice, setSearchChoice] = useState('sellerId');
  const [searchError, setSearchError] = useState(false);

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
      }
      return;
    }

    // validate seller ASINS
    if (searchChoice === 'asins') {
      if (searchInput.length) {
        const asinList = searchInput.split(',');

        const isValidAsinList = asinList
          .filter(a => a.trim().length > 0)
          .every((a: string) => isValidAsin(a.trim()));

        setSearchError(!isValidAsinList);
      } else {
        setSearchError(false);
      }
      return;
    }
  }, [searchChoice, searchInput]);

  const disableSearch = searchInput.length === 0 || searchError;

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
        />

        <RadioListFilters
          filterOptions={searchChoices}
          value={searchChoice}
          handleChange={value => setSearchChoice(value)}
        />
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

export default InventoryFilters;
