import React, { useMemo } from 'react';
import { Pagination, Icon } from 'semantic-ui-react';

/* Styling */
import './index.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  showSiblingsCount: number;
  showEllipsis?: boolean;
  showfirstItem?: boolean;
  showLastItem?: boolean;
  onPageChange: (pageNo: any) => void;
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
  } = props;

  const isFirstPage = useMemo(() => currentPage === 1, [totalPages, currentPage]);
  const isLastPage = useMemo(() => currentPage === totalPages, [totalPages, currentPage]);

  return (
    <Pagination
      size="mini"
      className={'newSellgoPagination'}
      ellipsisItem={
        showEllipsis ? { content: <Icon name="ellipsis horizontal" />, icon: true } : null
      }
      firstItem={showfirstItem ? { content: <Icon name="angle double left" />, icon: true } : null}
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
        onPageChange(activePage);
      }}
      boundaryRange={0}
      siblingRange={showSiblingsCount}
    />
  );
};

export default TablePagination;
