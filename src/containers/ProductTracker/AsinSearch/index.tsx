import React, { useState } from 'react';
import { Menu, Dropdown, Input, Button, Grid } from 'semantic-ui-react';
import Confirm from './Confirm';
import { useInput } from '../../../hooks';
import './index.scss';

const AsinSearch = (props: any) => {
  const options = [
    { key: 1, text: 'This is a super long item', value: 1 },
    { key: 2, text: 'Dropdown direction can help', value: 2 },
    { key: 3, text: 'Items are kept within view', value: 3 },
  ];

  const { searchFilteredProduct, searchFilterValue, setCurrentPage } = props;
  const { bind: bindSearch } = useInput(searchFilterValue);

  const [open, setOpen] = useState(false);

  const openModal = (val: boolean) => setOpen(val);

  return (
    <Grid.Row className="AsinSearch__row">
      <Menu.Menu className="AsinSearch__menu">
        <Input
          placeholder="Insert ASIN or Amazon URL"
          value={searchFilterValue}
          onKeyUp={(e: any) => {
            // if (e.key === 'Enter') {
            setCurrentPage(1);
            searchFilteredProduct(e.target.value);
            // }
          }}
          {...bindSearch}
        />
        <Dropdown openOnFocus selection options={options} />
      </Menu.Menu>
      <Button basic onClick={() => setOpen(!open)}>
        Add Product
      </Button>
      <Confirm open={open} openModal={openModal} />
    </Grid.Row>
  );
};

export default AsinSearch;
