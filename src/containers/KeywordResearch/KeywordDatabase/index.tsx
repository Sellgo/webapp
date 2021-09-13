import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseProgress from './DatabaseProgress';
import DatabaseSummary from './DatabaseSummary';
import DatabaseKeywordList from './DatabaseKeywordList';
import DatabaseExport from './DatabaseExport';
import DatabaseTable from './DatabaseTable';

/* Interfaces */
import { KeywordDatabaseTablePayload } from '../../../interfaces/KeywordResearch/KeywordDatabase';

/* Actions */
import { fetchKeywordDatabaseTableInformation } from '../../../actions/KeywordResearch/KeywordDatabase';

/* Selectors */
import { getKeywordDatabaseRequestId } from '../../../selectors/KeywordResearch/KeywordDatabase';

interface Props {
  fetchKeywordDatabaseTableInformation: (paylaod: KeywordDatabaseTablePayload) => void;
  keywordDatabaseTrackId: string;
}
const KeywordDatabase = (props: Props) => {
  const { fetchKeywordDatabaseTableInformation, keywordDatabaseTrackId } = props;

  useEffect(() => {
    const keywordId = sessionStorage.getItem('keywordDatabaseRequestId') || '';

    if (keywordId) {
      fetchKeywordDatabaseTableInformation({});
      return;
    }
  }, []);

  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseKeywordList />
      {keywordDatabaseTrackId && <DatabaseFilters />}
      <DatabaseProgress />
      <DatabaseSummary />
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

const mapStateToProps = (state: any) => {
  return {
    keywordDatabaseTrackId: getKeywordDatabaseRequestId(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordDatabase);
