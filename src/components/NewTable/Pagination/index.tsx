import React, { useMemo } from 'react';
import { Pagination, Icon, Dropdown } from 'semantic-ui-react';

/* Styling */
import './index.scss';

interface PageOptions {
  text: string;
  id: string;
  value: number;
}

interface Props {
  totalPages: number;
  currentPage: number;
  showSiblingsCount: number;
  showEllipsis?: boolean;
  showfirstItem?: boolean;
  showLastItem?: boolean;
  onPageChange: (pageNo: any, perPage?: any) => void;
  showPerPage?: boolean;
  perPage?: number;
  perPageList?: PageOptions[];
}

const TablePagination = (props: Props) => {
  const {
    totalPages,
    currentPage,
    showSiblingsCount,
    onPageChange,
    showEllipsis = false,
    showLastItem = false,
    showfirstItem = false,
    showPerPage = false,
    perPage = 50,
    perPageList,
  } = props;

  const isFirstPage = useMemo(() => currentPage === 1, [totalPages, currentPage]);
  const isLastPage = useMemo(() => currentPage === totalPages, [totalPages, currentPage]);

  if (showPerPage && (!perPage || !perPageList)) {
    throw new Error('Missing prop "perPage" or "perPageList" for per page pagination results');
  }

  return (
    <>
      {showPerPage && (
        <div className="perPageWrapper">
          <span>Display</span>
          <Dropdown
            options={perPageList}
            value={perPage}
            onChange={(e: any, { value }) => {
              if (perPage !== value) {
                onPageChange(undefined, value);
              }
            }}
            className="perPageDropdown"
          />
          <span>&nbsp; results per page &nbsp; &nbsp;</span>
        </div>
      )}

      <Pagination
        size="mini"
        className={'newSellgoPagination'}
        ellipsisItem={
          showEllipsis ? { content: <Icon name="ellipsis horizontal" />, icon: true } : null
        }
        firstItem={
          showfirstItem ? { content: <Icon name="angle double left" />, icon: true } : null
        }
        lastItem={showLastItem ? { content: <Icon name="angle double right" />, icon: true } : null}
        prevItem={{
          content: <Icon name="caret left" className={'controlIcon'} disabled={isFirstPage} />,
          icon: true,
        }}
        nextItem={{
          content: <Icon name="caret right" className={'controlIcon'} disabled={isLastPage} />,
          icon: true,
        }}
        activePage={currentPage}
        totalPages={totalPages}
        onPageChange={(e: any, { activePage }) => {
          onPageChange(activePage, perPage);
        }}
        boundaryRange={0}
        siblingRange={showSiblingsCount}
      />
    </>
  );
};

export default TablePagination;
