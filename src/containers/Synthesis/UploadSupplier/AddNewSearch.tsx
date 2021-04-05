import React, { useEffect, useRef } from 'react';
import { Form, Grid, Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.scss';
import { Field } from 'redux-form';
import { InputField, SelectField, ToggleField } from '../../../components/ReduxFormFields';
import { marketPlace } from '../../../constants/UploadSupplier';
import isRequired from '../../../utils/validations/isRequired';
import {
  fileDetailsSelector,
  fileNameSelector,
  variationsSelector,
} from '../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import { getVariations, updateFileName } from '../../../actions/UploadSupplier';

const required = isRequired();

const AddNewSearch = (props: any) => {
  const { fileDetails, setFileName, fileName, setVariations } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const name =
      fileDetails && fileDetails.name
        ? fileDetails.name.substring(0, fileDetails.name.lastIndexOf('.'))
        : '';
    if (!fileName) {
      setFileName(name);
    }
    if (inputRef && inputRef.current && !!name) {
      inputRef.current.focus();
      const select = () => {
        if (inputRef && inputRef.current) inputRef.current.select();
      };
      setTimeout(select, 50);
    }
  }, [fileDetails]);

  return (
    <div className={`AddNewSearch__new-search ${styles['ouline-box']}`}>
      <Form className={`${styles['supply-container']} ${styles['form-size']}`}>
        <Grid columns="equal" className="AddNewSearch__container bg-color">
          <Grid.Column
            width={5}
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
          <Grid.Column className={'AddNewSearch__second-column'} width={5}>
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
          <Grid.Column className={'AddNewSearch__second-column'} width={4}>
            <div>
              <label>
                All Variations
                <Icon name="info circle" color="orange" />
              </label>
              <div className="AddNewSearch__checkbox">
                <Field
                  component={ToggleField}
                  name="get_variations"
                  type="checkbox"
                  onChange={(value: any) => setVariations(value)}
                />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  fileDetails: fileDetailsSelector(state),
  fileName: fileNameSelector(state),
  variations: variationsSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setFileName: (fileName: string) => dispatch(updateFileName(fileName)),
  setVariations: (variations: boolean) => dispatch(getVariations(variations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSearch);
