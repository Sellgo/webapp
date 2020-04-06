import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import { validateAndUploadCsv } from '../../../actions/UploadSupplier';
import { Loader, Dimmer, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import PieChart from './../../../components/Chart/PieChart';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
}

const options = {
  title: '',
  name: 'Products',
  data: [
    {
      name: 'Argon',
      y: 100,
      color: '#4ad991',
    },
    {
      name: 'Marlon',
      y: 50,
      color: '#fd8373',
    },
  ],
};

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
    <div className={`submit-container`}>
      {error ? (
        <React.Fragment>
          <Segment>
            <Header>Sample header</Header>
            <Segment>
              <Label circular color={'green'} empty />
              asdsadsad
              <PieChart options={options} />
              <Label circular color={'green'} empty />
              asdsadsad
            </Segment>
          </Segment>
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
