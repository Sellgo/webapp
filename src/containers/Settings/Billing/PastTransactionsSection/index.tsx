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
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import Placeholder from '../../../../components/Placeholder';

/* Types */
import { Transaction } from '../../../../interfaces/Settings/billing';

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
      <section className={styles.billingHistoryWrapper}>
        <BoxHeader>Billing History</BoxHeader>
        <BoxContainer className={styles.pastTransactionHistory}>
          <div className={styles.transactionHistoryTable}>No past transactions found.</div>
        </BoxContainer>
      </section>
    );
  }
  return (
    <>
      <section className={styles.billingHistoryWrapper}>
        <BoxHeader>Billing History</BoxHeader>
        <BoxContainer className={styles.pastTransactionHistory}>
          <div className={styles.transactionHistoryTable}>
            <Table
              renderLoading={() => loading && <Placeholder numberRows={0} numberParagraphs={3} />}
              data={!loading ? transactionHistory : []}
              hover={false}
              autoHeight
              rowHeight={50}
              headerHeight={50}
              id="pastTransactionsTable"
            >
              <Table.Column width={30} verticalAlign="middle" align="center">
                <Table.HeaderCell />
                <IsSuccessfulTransactionCell dataKey="paid" />
              </Table.Column>

              <Table.Column width={130} verticalAlign="middle" align="center">
                <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                <Table.Cell dataKey="id" />
              </Table.Column>

              <Table.Column width={130} verticalAlign="middle" align="center">
                <Table.HeaderCell>Billing date</Table.HeaderCell>
                <Table.Cell dataKey="date" />
              </Table.Column>

              <Table.Column width={140} verticalAlign="middle" align="center">
                <Table.HeaderCell>Amount (USD$)</Table.HeaderCell>
                <Table.Cell dataKey="price" />
              </Table.Column>

              <Table.Column width={160} verticalAlign="middle" align="center">
                <Table.HeaderCell>Plan</Table.HeaderCell>
                <PlanDescriptionCell dataKey="desc" />
              </Table.Column>

              <Table.Column width={240} verticalAlign="middle" align="center">
                <Table.HeaderCell>Payment method</Table.HeaderCell>
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
          </div>
        </BoxContainer>
      </section>
    </>
  );
};

export default PastTransactionsSection;
