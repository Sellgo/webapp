import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import ExpensesMeta from './ExpensesMeta';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import SettingsInputTable from './SettingsInputTable';

/* Constants */
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { error, success } from '../../../../utils/notifications';

interface Props {
  match: any;
}
const Expenses = (props: Props) => {
  const { match } = props;

  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/expense-configs`
      );

      if (data && data.length > 0) {
        return data.filter((data: any) => data.type === 'employee');
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const handleSave = async (expenses: any[]) => {
    try {
      let patchExpenseStatus = true;
      let postExpenseStatus = true;

      /* New expenses */
      const newExpenses = expenses.filter((expense: any) => {
        return expense.isNew;
      });
      const newExpensesPayload = newExpenses.map((expense: any) => {
        return {
          ...expense,
          id: null,
          type: 'employee',
          status: 'active',
        };
      });
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/expense-configs`;

      if (newExpensesPayload.length > 0) {
        const { status } = await axios.post(url, { expense_configs: newExpensesPayload });
        if (status !== 201) {
          postExpenseStatus = false;
        }
      }

      /* Patching current expenses */
      const currentExpenses = expenses.filter((expense: any) => {
        return !expense.isNew;
      });

      if (currentExpenses.length > 0) {
        const { status } = await axios.patch(url, { expense_configs: currentExpenses });
        if (status !== 200) {
          patchExpenseStatus = false;
        }
      }

      if (patchExpenseStatus && postExpenseStatus) {
        success('Expenses successfully saved');
      }
    } catch (err) {
      error('Failed to save expenses');
      console.error(err);
    }
  };

  return (
    <main className={styles.leadTimeWrapper}>
      <PageHeader
        title={'Expenses'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Perfect Stock' },
          { content: 'Expenses' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.leadTime}>
        <ExpensesMeta />
        <SettingsInputTable
          tableRowProperties={['name', 'start_date', 'amount', 'repeat_days']}
          fetchData={fetchExpenses}
          handleSave={handleSave}
        />
      </div>
    </main>
  );
};

export default Expenses;
