import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'rsuite';
import TablePagination from '../../../components/NewTable/Pagination';
// import HeaderSortCell from '../../../components/NewTable/HeaderSortCell';
import TruncatedTextCell from '../../../components/NewTable/TruncatedTextCell';
import Placeholder from '../../../components/Placeholder';
import { AppConfig } from '../../../config';

/* Selectors */
import { sellerIDSelector } from '../../../selectors/Seller';

/* Styling */
import styles from './index.module.scss';
import MerchantEmailCell from './MerchantEmailCell';

const MerchantEmployeesCore = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [employeesData, setEmployeesData] = useState<any[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const [employeesDataPaginationInfo, setEmployeesDataPaginationInfo] = useState<any>({});

  const getMerchantId = () => {
    const splitPathName = window.location.pathname.split('/');
    setPageNumber(1);
    return splitPathName[splitPathName.length - 1];
  };
  const merchantId = useMemo(() => getMerchantId(), [window.location.pathname]);

  const fetchEmployees = async () => {
    const sellerID = sellerIDSelector();
    // eslint-disable-next-line max-len
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-employees?page=${pageNumber}&ordering=id&merchant_id=${merchantId}`;
    const { data } = await axios.get(URL);
    console.log('data', data);
    setEmployeesData(data?.results);
    setEmployeesDataPaginationInfo({
      total_pages: data.total_pages,
      current_page: data.current_page,
    });
    setIsLoadingEmployees(false);
  };
  useEffect(() => {
    setIsLoadingEmployees(true);
    fetchEmployees();
  }, [pageNumber]);
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <section className={styles.sellerDatbaseTableWrapper}>
          <Table
            renderLoading={() =>
              isLoadingEmployees && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
            }
            affixHorizontalScrollbar={10}
            shouldUpdateScroll={false}
            data={!isLoadingEmployees ? employeesData : []}
            autoHeight
            hover={false}
            rowHeight={200}
            headerHeight={55}
            virtualized
            id="sellerDatabaseTable"
            className={employeesData.length === 0 ? 'no-scroll' : ''}
            renderEmpty={() => <div />}
          >
            {/* Category */}
            <Table.Column width={180} verticalAlign="middle" align="center">
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <TruncatedTextCell dataKey="first_name" />
            </Table.Column>
            <Table.Column width={180} verticalAlign="middle" align="center">
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <TruncatedTextCell dataKey="last_name" />
            </Table.Column>
            <Table.Column width={180} verticalAlign="middle" align="center">
              <Table.HeaderCell>Title</Table.HeaderCell>
              <TruncatedTextCell dataKey="title" />
            </Table.Column>
            <Table.Column width={600} verticalAlign="middle" align="center">
              <Table.HeaderCell>Emasil</Table.HeaderCell>
              <MerchantEmailCell dataKey="id" />
            </Table.Column>
          </Table>

          {employeesDataPaginationInfo && employeesDataPaginationInfo.total_pages > 0 && (
            <footer className={styles.sellerDatabasePagination}>
              <TablePagination
                totalPages={employeesDataPaginationInfo.total_pages}
                currentPage={employeesDataPaginationInfo.current_page}
                onPageChange={(pageNo: number) => setPageNumber(pageNo)}
                showSiblingsCount={3}
              />
            </footer>
          )}
        </section>
      </div>
    </>
  );
};
export default MerchantEmployeesCore;
