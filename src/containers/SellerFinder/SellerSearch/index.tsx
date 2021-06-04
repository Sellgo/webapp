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
          className="input-1"
          icon={'search'}
          placeholder="Find in your Seller Finder List"
          onChange={(evt: any) => setSearch(evt.target.value)}
          onKeyDown={(evt: any) => (evt.key === 'Enter' ? props.onSearch(search) : undefined)}
        />
        <span className="or">or</span>
        <Input
          size="small"
          className="input-2"
          icon={'search'}
          placeholder="Insert Amazon Links or ASINs or Seller IDs ..."
          onChange={(evt: any) => setSearch(evt.target.value)}
          onKeyDown={(evt: any) => (evt.key === 'Enter' ? props.onSearch(search) : undefined)}
        />
        <Button primary className="search-btn" onClick={() => history.push('seller-database')}>
          Find
        </Button>
      </div>
    </div>
  );
};

export default SellerSearch;
