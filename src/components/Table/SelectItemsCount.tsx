import React from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import { selectItemsCountList } from '../../constants';

interface SelectItemsCountProps {
  totalCount: number;
  singlePageItemsCount: number;
  currentPage: number;
  setSinglePageItemsCount: (itemsCount: any) => void;
}

const SelectItemsCount = (props: SelectItemsCountProps) => {
  const { totalCount, singlePageItemsCount, currentPage, setSinglePageItemsCount } = props;

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
            text={String(singlePageItemsCount)}
            upward={false}
            style={{ width: '100px' }}
            fluid={true}
            selection={true}
            options={selectItemsCountList}
            onChange={(e, data) => {
              const newItemsCount = Number(data.value);
              setSinglePageItemsCount(newItemsCount);
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

export default SelectItemsCount;
