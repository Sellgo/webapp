import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import './index.scss';
import history from '../../../history';
interface Props {
  onSearch: (input: string) => void;
}
const SellerSearch = (props: Props) => {
  const [search, setSearch] = React.useState<any>('');
  return (
    <div className="seller-finder-search">
      <div className="search-container">
        <Input
          size="small"
          icon={'search'}
          placeholder="Search by ASIN or Seller Name/ID"
          onChange={(evt: any) => setSearch(evt.target.value)}
          onKeyDown={(evt: any) => (evt.key === 'Enter' ? props.onSearch(search) : undefined)}
        />
        <span className="or">Or</span>
        <Button primary className="search-btn" onClick={() => history.push('seller-database')}>
          Find Sellers
        </Button>
      </div>
    </div>
  );
};

export default SellerSearch;
