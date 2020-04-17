import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { Field } from 'redux-form';
import { InputField, SelectField, TextAreaField } from '../../../components/ReduxFormFields';
import { marketPlace } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';

const AddNewSearch = () => {
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
                validate={isRequired()}
                component={InputField}
                name="search"
                label="Search Name"
                placeholder="Search Name"
                maxLength="100"
              />
              <div className={`field ${styles['description-box']}`}>
                <Field
                  component={TextAreaField}
                  label="Search Description"
                  className="AddNewSearch__description-field"
                  name="description"
                  placeholder="Search Description"
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.rightAdjust} width={7}>
            <div className={`AddNewSearch__second-column field`}>
              <Field
                required={true}
                validate={isRequired()}
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

export default AddNewSearch;
