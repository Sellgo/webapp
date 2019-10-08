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
    <Grid>
      <Grid.Column width={5} textAlign="center">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {`${minCount}-${maxCount} of ${totalCount} items`}
          <Dropdown
            text={String(singlePageItemsCount)}
            style={{ width: '40%', alignSelf: 'center', margin: 'auto' }}
            fluid={true}
            selection={true}
            options={selectItemsCountList}
            onChange={(e, data) => {
              const newItemsCount = Number(data.value);
              setCurrentPage(1);
              setSinglePageItemsCount(newItemsCount);
            }}
          />
          Items per Page
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default SelectItemsCount;
