import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../hooks';
import { validateAndUploadCsv } from '../../Action/UploadSupplierFilesActions';
import { Loader } from 'semantic-ui-react';

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
    return <Loader active={loading} />;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return <div>Completed</div>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  validateAndUploadCsv,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataValidation);
