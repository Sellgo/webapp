import React, { useEffect, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import './index.scss';

import { SellersPayload } from '../../../actions/SellerFinder';

interface Props {
  onSearch: (input: string) => void;
  fetchSellers: (payload: SellersPayload) => void;
  clearSearchInput: boolean;
}
const SellerSearch = (props: Props) => {
  const { onSearch, fetchSellers, clearSearchInput } = props;

  const [leftSearchValue, setLeatSearchValue] = useState<string>('');
  const [rightSearchValue, setRightSeachValue] = useState<string>('');

  const handleSellerSearch = () => {
    fetchSellers({ enableLoader: true, query: `&search=${leftSearchValue}` });
  };

  useEffect(() => {
    if (clearSearchInput) {
      setRightSeachValue('');
    }
  }, [clearSearchInput]);

  return (
    <div className="seller-finder-search">
      <div className="search-container">
        <Input
          size="small"
          className="input-1"
          icon={'search'}
          value={leftSearchValue}
          placeholder="Find in your Seller Finder List"
          onChange={(evt: any) => setLeatSearchValue(evt.target.value)}
        />
        <Button primary className="search-btn" onClick={() => handleSellerSearch()}>
          Find
        </Button>
        <span className="or">or</span>
        <Input
          size="small"
          className="input-2"
          icon={'search'}
          value={rightSearchValue}
          placeholder="Insert ASINs or Seller IDs ..."
          onChange={(evt: any) => setRightSeachValue(evt.target.value)}
        />
        <Button primary className="search-btn" onClick={() => onSearch(rightSearchValue)}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SellerSearch;
