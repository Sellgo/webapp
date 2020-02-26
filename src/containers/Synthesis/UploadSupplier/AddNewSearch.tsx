import React from 'react';
import { Form, Grid, TextArea } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { Field } from 'redux-form';
import { InputField, SelectField } from '../../../components/ReduxFormFields';
import { defaultSelect } from '../../../constants';
// import timezones from '../../../constants/UploadSupplier/timezones';
// import { accountStatus } from '../../../constants/UploadSupplier';
import { marketPlace } from '../../../constants/UploadSupplier';
// import { terms } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';
// import { isNumber } from '../../../utils/validations/isPhone';
// import isName from '../../../utils/validations/isName.js';
import { onlyNumber } from '../../../utils/validations/isOnlyNumber';
// import { webUrl } from '../../../utils/validations/isUrl';

const required = isRequired();

const SupplierDetails = () => (
  <React.Fragment>
    <Grid.Column className={styles['rightAdjust']} width={7}>
      <Field
        className={styles['dropdwn-wdth']}
        component={SelectField}
        name="marketPlace"
        label="Market Place"
        placeholder="Amazon.com"
        options={[defaultSelect, ...marketPlace]}
      />
      {/* <Grid columns="equal">
        <Grid.Column className={styles['taxAlign']}>
          <Field
            component={InputField}
            name="salesTax"
            label="Sales Tax (%)"
            placeholder="%"
            className={styles['field-width']}
            type="number"
            min="0"
            validate={onlyNumber}
          />
        </Grid.Column>
        <Grid.Column>
          <Field
            component={InputField}
            name="prepUnit"
            label="Prep $/Unit ($)"
            placeholder="$"
            className={styles['field-width']}
            type="number"
            min="0"
            validate={onlyNumber}
          />
        </Grid.Column>
      </Grid> */}
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
          <Grid.Column width={7} className={`${styles.padding0} ${styles['leftAdjust']}`}>
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
