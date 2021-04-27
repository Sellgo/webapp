import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import './index.scss';
interface Props {
  onSearch: (input: string) => void;
  message: string;
  loading: boolean;
}
const SellerSearch = (props: Props) => {
  const [search, setSearch] = React.useState<any>('');
  return (
    <div className="seller-finder-search">
      <div className="search-container">
        <Input
          size="small"
          icon={'search'}
          loading={props.loading}
          placeholder="Search by ASIN or Seller Name/ID"
          onChange={evt => setSearch(evt.target.value)}
        />
        <span className="or">Or</span>
        <Button primary className="search-btn" onClick={() => props.onSearch(search)}>
          Find Sellers
        </Button>
      </div>
      <p className="search-message">{props.message}</p>
    </div>
  );
};

export default SellerSearch;
