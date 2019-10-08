import React from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import { selectItemsCountList } from '../../constants';

interface SelectItemsCountProps {
  totalCount: number;
  singlePageItemsCount: number;
  currentPage: number;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setCurrentPage: (pageNumber: any) => void;
}

const SelectItemsCount = (props: SelectItemsCountProps) => {
  const {
    totalCount,
    singlePageItemsCount,
    currentPage,
    setCurrentPage,
    setSinglePageItemsCount,
  } = props;
  const maxCount =
    currentPage * singlePageItemsCount > totalCount
      ? totalCount
      : currentPage * singlePageItemsCount;
  const minCount = (currentPage - 1) * singlePageItemsCount + 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{ whiteSpace: 'nowrap', marginRight: '2rem' }}
      >{`${minCount}-${maxCount} of ${totalCount} items`}</span>
      <Dropdown
        text={String(singlePageItemsCount)}
        style={{ width: '100px' }}
        fluid={true}
        selection={true}
        options={selectItemsCountList}
        onChange={(e, data) => {
          const newItemsCount = Number(data.value);
          setCurrentPage(1);
          setSinglePageItemsCount(newItemsCount);
        }}
      />
      <span style={{ whiteSpace: 'nowrap', marginLeft: '1rem' }}>Items per page</span>
    </div>
  );
};

export default SelectItemsCount;
