import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../hooks';
import { validateAndUploadCsv } from '../../Action/UploadSupplierFilesActions';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';
import styles from './UploadSupplierFiles.module.css';

interface DataValidationProps {
  validateAndUploadCsv: any;
}

const DataValidation = (props: DataValidationProps) => {
  const { validateAndUploadCsv } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      await validateAndUploadCsv();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Dimmer active={true} inverted={true}>
        <Loader size="huge">Loading</Loader>
      </Dimmer>
    );
  }

  if (error) {
    return <div className="center-child">Something went wrong!</div>;
  }

  return (
    <div className={styles.successMessage}>
      <Icon name="check circle" size="huge" className={styles.checkCircle} />
      <p>
        <b>Supplier successfully added</b>
      </p>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  validateAndUploadCsv,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataValidation);
