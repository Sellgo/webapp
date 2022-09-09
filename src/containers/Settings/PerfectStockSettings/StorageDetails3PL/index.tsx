import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchTplVendors } from '../../../../actions/PerfectStock/Tpl';
// import {ReactComponent as PlusIcon} from '../../../assets/images/plusIcon.svg';

/* Styles */
import styles from './index.module.scss';

/* Components */
import StorageDetailsMeta from './StorageDetailsMeta';
import TplSettingsCore from './TplSettingsCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ElevioArticle from '../../../../components/ElevioArticle';

interface Props {
  match: any;
  fetchTplVendors: () => void;
}

const StorageDetails = (props: Props) => {
  const { fetchTplVendors, match } = props;

  React.useEffect(() => {
    fetchTplVendors();
  }, []);

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Storage Details' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <StorageDetailsMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <TplSettingsCore />
          </div>
        </div>
      </div>
      <BoxContainer className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'17'} />
      </BoxContainer>
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplVendors: () => dispatch(fetchTplVendors()),
  };
};
export default connect(null, mapDispatchToProps)(StorageDetails);
