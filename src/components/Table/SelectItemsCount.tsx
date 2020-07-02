import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Dropdown, List } from 'semantic-ui-react';
import { selectItemsCountList } from '../../constants';

interface SelectItemsCountProps {
  isScrollSelector: boolean;
  totalCount: number;
  singlePageItemsCount: number;
  currentPage: number;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setCurrentPage: (number: number) => void;
}

const SelectItemsCount = (props: SelectItemsCountProps) => {
  const {
    isScrollSelector,
    totalCount,
    singlePageItemsCount,
    currentPage,
    setSinglePageItemsCount,
    setCurrentPage,
  } = props;

  const maxCount =
    currentPage * singlePageItemsCount > totalCount
      ? totalCount
      : currentPage * singlePageItemsCount;

  const minCount = (currentPage - 1) * singlePageItemsCount + 1;

  return (
    <List horizontal={true} className="select-items-list">
      <List.Item>
        <List.Content>
          {maxCount > 0 && `${minCount}-${maxCount} of `}
          {totalCount} items
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <Dropdown
            {...(isScrollSelector ? { open: false } : {})}
            text={String(singlePageItemsCount)}
            upward={false}
            style={{ width: '100px' }}
            fluid={true}
            selection={true}
            defaultValue={String(singlePageItemsCount)}
            options={selectItemsCountList}
            onChange={(e, data) => {
              const newItemsCount = Number(data.value);
              setSinglePageItemsCount(newItemsCount);
              setCurrentPage(1);
            }}
          />
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>Items per page</List.Content>
      </List.Item>
    </List>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isScrollSelector: get(state, 'supplier.setIsScroll'),
  };
};

export default connect(mapStateToProps)(SelectItemsCount);
