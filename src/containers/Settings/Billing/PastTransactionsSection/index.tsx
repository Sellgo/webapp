import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Components */
import PaymentMethodCell from './PaymentMethodCell';
import PlanDescriptionCell from './PlanDescriptionCell';
import ReceiptCell from './ReceiptCell';
import IsSuccessfulTransactionCell from './IsSuccessfulTransactionCell';
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../../components/ProfileBoxContainer';

/* Types */
import { Transaction } from '../../../../interfaces/Settings/billing';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
  transactionHistory: Transaction[];
  loading: boolean;
  fetchTransactionHistoryAll: () => void;
}

/* Main component */
const PastTransactionsSection = (props: Props) => {
  const { transactionHistory, loading, fetchTransactionHistoryAll } = props;
  const [isAllHistoryFetched, setAllHistoryFetched] = React.useState<boolean>(false);

  const handleFetchMoreHistory = () => {
    fetchTransactionHistoryAll();
    setAllHistoryFetched(true);
  };

  if (!loading && transactionHistory.length === 0) {
    return (
      <section>
        <ProfileBoxHeader>Billing History</ProfileBoxHeader>
        <ProfileBoxContainer>
          <div className={styles.transactionHistoryTable}>No past transactions found.</div>
        </ProfileBoxContainer>
      </section>
    );
  }
  return (
    <>
      <section>
        <ProfileBoxHeader>Billing History</ProfileBoxHeader>
        <ProfileBoxContainer>
          <div className={styles.transactionHistoryTable}>
            <Table
              data={transactionHistory}
              hover={false}
              autoHeight
              rowHeight={50}
              headerHeight={50}
              id="pastTransactionsTable"
            >
              <Table.Column width={30} verticalAlign="middle" align="center">
                <Table.HeaderCell></Table.HeaderCell>
                <IsSuccessfulTransactionCell dataKey="paid" />
              </Table.Column>

              <Table.Column width={150} verticalAlign="middle" align="center">
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.Cell dataKey="id" />
              </Table.Column>

              <Table.Column width={150} verticalAlign="middle" align="center">
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.Cell dataKey="date" />
              </Table.Column>

              <Table.Column width={100} verticalAlign="middle" align="center">
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.Cell dataKey="price" />
              </Table.Column>

              <Table.Column width={150} verticalAlign="middle" align="center">
                <Table.HeaderCell>Description</Table.HeaderCell>
                <PlanDescriptionCell dataKey="desc" />
              </Table.Column>

              <Table.Column width={250} verticalAlign="middle">
                <Table.HeaderCell>Payment Method</Table.HeaderCell>
                <PaymentMethodCell dataKey="card_type" />
              </Table.Column>

              <Table.Column width={100} verticalAlign="middle" align="center">
                <Table.HeaderCell>Receipt</Table.HeaderCell>
                <ReceiptCell dataKey="receipt" />
              </Table.Column>
            </Table>

            {!isAllHistoryFetched && !loading && (
              <button className={styles.retrieveMoreHistoryButton} onClick={handleFetchMoreHistory}>
                Look up more billing history
              </button>
            )}

            {loading && (
              <Dimmer blurring inverted active>
                <Loader />
              </Dimmer>
            )}
          </div>
        </ProfileBoxContainer>
      </section>
    </>
  );
};

export default PastTransactionsSection;
