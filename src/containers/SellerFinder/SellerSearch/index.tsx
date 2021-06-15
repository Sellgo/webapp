import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import './index.scss';

import { SellersPayload } from '../../../actions/SellerFinder';

interface Props {
  onSearch: (input: string) => void;
  fetchSellers: (payload: SellersPayload) => void;
}
const SellerSearch = (props: Props) => {
  const { onSearch, fetchSellers } = props;

  const [search, setSearch] = React.useState<any>('');

  const handleSellerSearch = () => {
    fetchSellers({ enableLoader: true, query: `&search=${search}` });
  };

  return (
    <div className="seller-finder-search">
      <div className="search-container">
        <Input
          size="small"
          className="input-1"
          icon={'search'}
          placeholder="Find in your Seller Finder List"
          onChange={(evt: any) => setSearch(evt.target.value)}
        />
        <Button primary className="search-btn" onClick={() => handleSellerSearch()}>
          Find
        </Button>
        <span className="or">or</span>
        <Input
          size="small"
          className="input-2"
          icon={'search'}
          placeholder="Insert ASINs or Seller IDs ..."
          onChange={(evt: any) => setSearch(evt.target.value)}
        />
        <Button primary className="search-btn" onClick={() => onSearch(search)}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SellerSearch;
