import React from 'react';
import { Dropdown, Button, Input, Icon } from 'semantic-ui-react';
import './index.scss';
interface PaginationProps {
  totalRecords?: number;
  currentPage: number;
  pageSize: number;
  totalPages?: number;
  onNextPage: (currentPage: number) => void;
  onPrevPage: (currentPage: number) => void;
  onPageSizeSelect: (size: number) => void;
  onPageNumberUpdate: (currentPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const {
    pageSize = 0,
    onPageSizeSelect,
    currentPage,
    totalPages,
    totalRecords,
    onPageNumberUpdate,
    onNextPage,
    onPrevPage,
  } = props;

  const [page, setPage] = React.useState(currentPage);

  const options = [
    { key: 1, text: '50', value: 50 },
    { key: 2, text: '100', value: 100 },
    { key: 3, text: '200', value: 200 },
  ];

  const onPageSizeChanges = (evt: any, data: any) => {
    evt.stopPropagation();
    const { value } = data;
    onPageSizeSelect(value);
  };

  const onPageNumberChanges = (evt: any, data: any = {}) => {
    evt.stopPropagation();
    if (data) {
      const { value } = data;
      setPage(value);
    }
    if (evt.key === 'Enter') {
      onPageNumberUpdate(page);
    }
  };

  const onNext = () => onNextPage(currentPage + 1);
  const onPrev = () => onPrevPage(currentPage - 1);

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className="sellgo-pagination">
      <div>
        <p>Display</p>
      </div>
      <div className="page-size">
        <Dropdown
          text={`${pageSize}`}
          value={pageSize}
          options={options}
          className="page-size-input"
          selection
          onChange={onPageSizeChanges}
        />
      </div>
      <div className="page-count">
        <p>
          of <span>{totalRecords}</span> &nbsp; Page
        </p>
      </div>

      <div>
        <Button
          disabled={pageSize === 1 || currentPage <= 1}
          className="page-prev-nav"
          onClick={() => onPrev()}
        >
          <Icon name="caret left" />
        </Button>
      </div>
      <div>
        <Input
          value={page}
          className="page-number-input"
          onChange={onPageNumberChanges}
          onKeyDown={onPageNumberChanges}
        />
      </div>
      <div>
        <Button
          disabled={+currentPage === totalPages}
          className="page-next-nav"
          onClick={() => onNext()}
        >
          <Icon name="caret right" />
        </Button>
      </div>
      <div>
        <p>
          of <span>{totalPages}</span>&nbsp;Pages
        </p>
      </div>
    </div>
  );
};

export default Pagination;
