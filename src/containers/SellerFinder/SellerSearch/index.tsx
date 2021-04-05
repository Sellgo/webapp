import React from 'react';
import { Button, Search } from 'semantic-ui-react';
import './index.scss';

const SellerSearch = () => {
  return (
    <div className="seller-finder-search">
      <div className="search-container">
        <Search
          placeholder="Search by ASIN or Seller Name/ID"
          loading={false}
          onResultSelect={() => {
            console.log('something');
          }}
          onSearchChange={() => console.log('something')}
          results={[]}
          value={''}
        />
        <span className="or">Or</span>
        <Button primary className="search-btn">
          Find Sellers
        </Button>
      </div>
      <p className="search-message">Message response.</p>
    </div>
  );
};

export default SellerSearch;
