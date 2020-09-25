import React, { useEffect, useRef, useState } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import styles from './UploadSupplier.module.scss';
import { Field } from 'redux-form';
import { InputField, SelectField } from '../../../components/ReduxFormFields';
import { marketPlace } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';
import { fileDetailsSelector } from '../../../selectors/UploadSupplier';
import { connect } from 'react-redux';

const required = isRequired();

const AddNewSearch = (props: any) => {
  const { fileDetails } = props;
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    const name = fileDetails
      ? fileDetails.name.substring(0, fileDetails.name.lastIndexOf('.'))
      : '';
    setFileName(name);
    if (inputRef && inputRef.current && !!name) {
      // @ts-ignore
      inputRef.current.focus();
      // @ts-ignore
      setTimeout(() => inputRef.current.select(), 50);
    }
  }, [fileDetails]);

  return (
    <div className={`AddNewSearch__new-search ${styles['ouline-box']}`}>
      <Form className={`${styles['supply-container']} ${styles['form-size']}`}>
        <Grid columns="equal" className="AddNewSearch__container bg-color">
          <Grid.Column
            width={7}
            className={`AddNewSearch__first-column ${styles.padding0} ${styles.leftAdjust}`}
          >
            <div className={styles['form-container']}>
              <Field
                required={true}
                validate={required}
                component={InputField}
                name="search"
                label="Search Name"
                placeholder="Search Name"
                maxLength="100"
                setFieldToBeFocused={inputRef}
                inputProps={{
                  value: fileName,
                  onChange: (e: any) => setFileName(e.target.value),
                }}
              />
              <div className={`field `} />
            </div>
          </Grid.Column>
          <Grid.Column className={'AddNewSearch__second-column'} width={7}>
            <div className={`AddNewSearch__second-column field`}>
              <Field
                required={true}
                validate={required}
                component={SelectField}
                name="marketplace_id"
                label="Marketplace"
                placeholder="Amazon.com"
                options={marketPlace}
              />
            </div>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  fileDetails: fileDetailsSelector(state),
});

export default connect(mapStateToProps)(AddNewSearch);
