import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../hooks';
import { validateAndUploadCsv } from '../../actions/UploadSupplierFiles';
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
      let errors = ['Something went wrong!'];
      if (error && error.response && error.response.data && error.response.data.error) {
        errors = error.response.data.error;
      }
      setError(errors.join());
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

  return (
    <div className={styles.ouline_box}>
      {error ? (
        <React.Fragment>
          <Icon name="exclamation circle" size="big" className={styles.checkError} />
          <br />
          <p>
            <b>{error}</b>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Icon name="check circle" size="big" className={styles.checkCircle} />
          <br />
          <p>
            <b>Supplier successfully added</b>
          </p>
        </React.Fragment>
      )}
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
