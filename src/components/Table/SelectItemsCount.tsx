import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Dropdown, List } from 'semantic-ui-react';
import { selectItemsCountList } from '../../constants';
import { setIsScroll } from '../../actions/Suppliers';

interface SelectItemsCountProps {
  isScrollSelector: boolean;
  scrollTop: boolean;
  totalCount: number;
  singlePageItemsCount: number;
  currentPage: number;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setCurrentPage: (number: number) => void;
  setIsScroll: (value: boolean) => void;
}

const SelectItemsCount = (props: SelectItemsCountProps) => {
  const {
    isScrollSelector,
    scrollTop,
    totalCount,
    singlePageItemsCount,
    currentPage,
    setSinglePageItemsCount,
    setCurrentPage,
    setIsScroll,
  } = props;

  const maxCount =
    currentPage * singlePageItemsCount > totalCount
      ? totalCount
      : currentPage * singlePageItemsCount;

  const [scrollValue1, setScrollValue1] = React.useState(false);
  const minCount = (currentPage - 1) * singlePageItemsCount + 1;

  React.useEffect(() => {
    setScrollValue1(true);
    setIsScroll(true);
  }, [scrollTop]);

  if (scrollValue1) {
    setIsScroll(false);
  }
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
            openOnFocus
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
    scrollTop: get(state, 'supplier.setScrollTop'),
  };
};

const mapDispatchToProps = {
  setIsScroll: (value: boolean) => setIsScroll(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItemsCount);
