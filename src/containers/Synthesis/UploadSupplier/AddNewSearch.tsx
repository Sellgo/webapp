import React from 'react';
import { Form, Grid, TextArea, Dropdown } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { Field } from 'redux-form';
import { InputField } from '../../../components/ReduxFormFields';
import { marketPlace } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';

const required = isRequired();

const SupplierDetails = () => (
  <React.Fragment>
    <Grid.Column className={styles.rightAdjust} width={7}>
      <div className={`field`}>
        <label>Market Place</label>
        <Dropdown
          name="marketPlace"
          placeholder="Amazon.com"
          fluid
          search
          selection
          options={marketPlace}
        />
      </div>
    </Grid.Column>
  </React.Fragment>
);

const AddNewSearch = () => {
  return (
    <div className={styles['ouline-box']}>
      <Form
        className={`${styles['supply-container']} ${styles['form-size']}`}
        style={{ paddingBottom: '80px' }}
      >
        <Grid columns="equal" className="bg-color">
          <Grid.Column width={7} className={`${styles.padding0} ${styles.leftAdjust}`}>
            <div className={styles['form-container']}>
              <Field
                required={true}
                validate={required}
                component={InputField}
                name="searchName"
                label="Search Name"
                placeholder="Search Name"
                maxLength="100"
              />
              <div className={`field ${styles['description-box']}`}>
                <label>Search Description</label>
                <TextArea
                  name="searchDescription"
                  label="Search Description"
                  placeholder="Search Description"
                  style={{ minHeight: 70 }}
                />
              </div>
            </div>
          </Grid.Column>
          {<SupplierDetails />}
        </Grid>
      </Form>
    </div>
  );
};

export default AddNewSearch;
