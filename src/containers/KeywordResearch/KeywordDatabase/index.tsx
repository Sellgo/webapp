import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseProgress from './DatabaseProgress';
import DatabaseKeywordList from './DatabaseKeywordList';
import DatabaseExport from './DatabaseExport';
import DatabaseTable from './DatabaseTable';

/* Interfaces */
import { KeywordDatabaseTablePayload } from '../../../interfaces/KeywordResearch/KeywordDatabase';

/* Actions */
import { fetchKeywordDatabaseTableInformation } from '../../../actions/KeywordResearch/KeywordDatabase';

interface Props {
  fetchKeywordDatabaseTableInformation: (paylaod: KeywordDatabaseTablePayload) => void;
}
const KeywordDatabase = (props: Props) => {
  const { fetchKeywordDatabaseTableInformation } = props;

  useEffect(() => {
    const keywordId = sessionStorage.getItem('keywordDatabaseRequestId') || '';

    if (keywordId) {
      fetchKeywordDatabaseTableInformation({});
      return;
    }
  }, []);

  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
      <DatabaseProgress />
      <DatabaseKeywordList />
      <DatabaseExport />
      <DatabaseTable />
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) =>
      dispatch(fetchKeywordDatabaseTableInformation(payload)),
  };
};

export default connect(null, mapDispatchToProps)(KeywordDatabase);
