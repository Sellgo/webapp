import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Selectors */
import {
  getIsLoadingSellerDatabase,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* COmponents */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import GenericRowCell from '../../../../components/NewTable/GenericRowCell';

interface Props {
  isLoadingSellerDatabase: boolean;
  sellerDatabaseResults: [];
  sellerDatabaPaginationInfo: SellerDatabasePaginationInfo;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const SellerDatabaseTable = (props: Props) => {
  const { isLoadingSellerDatabase, sellerDatabaseResults } = props;

  const [sortColumn] = useState<string>('');
  const [sortType] = useState<'asc' | 'desc' | undefined>(undefined);

  const SellerInformation = ({ rowData, ...props }: any) => {
    console.log(rowData);
    return (
      <>
        <GenericRowCell {...props}>
          <div className={styles.sellerInformation}>
            <div className={styles.sellerInformationLeft}>Asin</div>
            <div className={styles.sellerInformationRight}>
              <h2>Kikkoman</h2>
            </div>
          </div>
        </GenericRowCell>
      </>
    );
  };

  return (
    <>
      <section className={styles.sellerDatbaseTableWrapper}>
        <Table
          loading={isLoadingSellerDatabase}
          data={sellerDatabaseResults}
          autoHeight
          hover={false}
          rowHeight={200}
          headerHeight={55}
          sortColumn={sortColumn}
          sortType={sortType}
          id="newSellerDatabaseTable"
        >
          <Table.Column width={500} verticalAlign="middle" fixed>
            <Table.HeaderCell>Seller Information</Table.HeaderCell>
            <SellerInformation dataKey="sellerInformation" />
          </Table.Column>

          <Table.Column width={150} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title="ASIN"
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Brands"
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Rating\nL365D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Rating%\nL365D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Total\nRating`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL30D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL90D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL365D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nLifetime`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle" sortable align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Product\nReview#`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>
        </Table>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerDatabase: getIsLoadingSellerDatabase(state),
    sellerDatabaseResults: getSellerDatabaseResults(state),
    sellerDatabaPaginationInfo: getSellerDatabasePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseTable);
