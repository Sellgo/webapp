import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import { validateAndUploadCsv } from '../../../actions/UploadSupplier';
import { Loader, Dimmer, Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
}

const Submit = (props: SubmitProps) => {
  const { validateAndUploadCsv, onFinished } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useAsyncEffect(async () => {
    setLoading(true);
    try {
      await validateAndUploadCsv();
      onFinished();
    } catch (error) {
      let errors = ['Something went wrong!'];
      if (error && error.response && error.response.data && error.response.data.message) {
        errors = error.response.data.message;
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
    <div className={styles['ouline-box']}>
      {error ? (
        <React.Fragment>
          <Icon name="exclamation circle" size="big" className={styles['check-error']} />
          <br />
          <p>
            <b>{error}</b>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Icon name="check circle" size="big" className={styles['check-circle']} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
