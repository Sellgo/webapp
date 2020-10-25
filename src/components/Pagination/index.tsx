import React from 'react';
import { Dropdown, Button, Input, Icon } from 'semantic-ui-react';
import './index.scss';
import { selectItemsCountList } from '../../constants';

interface PaginationProps {
  totalRecords?: number;
  currentPage: number;
  pageSize: number;
  showPageSize?: boolean;
  totalPages: number;
  onNextPage: (currentPage: number) => void;
  onPrevPage: (currentPage: number) => void;
  onPageSizeSelect: (size: number) => void;
  onPageNumberUpdate: (currentPage: number) => void;
  loading: boolean;
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
    showPageSize,
    loading,
  } = props;

  const [page, setPage] = React.useState(currentPage);

  const onPageSizeChanges = (evt: any, data: any) => {
    evt.stopPropagation();
    const { value } = data;
    onPageSizeSelect(+value);
  };

  const onPageNumberChanges = (evt: any, data: any = {}) => {
    evt.stopPropagation();
    if (data) {
      const { value } = data;
      if (value) {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          if (value === '' || value === ' ') {
            setPage(value);
          }
        } else {
          if (String(parsedValue).startsWith('-')) {
            setPage(Number(String(parsedValue).replace('-', '')));
          } else {
            setPage(parsedValue);
          }
        }
      } else {
        if (value === '') {
          setPage(value);
        }
      }
    }

    if (evt.key === 'Enter') {
      const pageNo = getValidatedPage();
      onPageNumberUpdate(pageNo);
      setPage(pageNo);
    }
  };

  const onBlur = () => {
    const pageNo = getValidatedPage();
    onPageNumberUpdate(pageNo);
    setPage(pageNo);
  };

  const getValidatedPage = (): number => {
    let value: any = page;
    if (!page) {
      value = currentPage;
    } else if (page < 1) {
      value = 1;
    } else if (page > totalPages) {
      value = totalPages;
    }

    return value;
  };
  const onNext = () => onNextPage(+currentPage + 1);
  const onPrev = () => onPrevPage(+currentPage - 1);

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className="sellgo-pagination">
      {showPageSize && (
        <React.Fragment>
          <div>
            <p>Display</p>
          </div>
          <div className="page-size">
            <Dropdown
              text={`${pageSize}`}
              value={pageSize}
              options={selectItemsCountList}
              className="page-size-input"
              selection
              onChange={onPageSizeChanges}
              selectOnBlur={false}
            />
          </div>
          <div className="page-count">
            <p>
              of <span>{totalRecords}</span>
            </p>
          </div>
        </React.Fragment>
      )}
      <div>
        <p>&nbsp;Page&nbsp;&nbsp;</p>
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
          onBlur={onBlur}
          type={'text'}
        />
      </div>
      <div>
        <Button
          disabled={+currentPage === totalPages || loading}
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
