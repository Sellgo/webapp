import React, { useState } from 'react';
import { Confirm, Icon } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import InputTable from '../../../../../components/SettingsInputTable/InputTable';
import ActionButton from '../../../../../components/ActionButton';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import Placeholder from '../../../../../components/Placeholder';

/* Assets */
import { ReactComponent as ExclaimationIcon } from '../../../../../assets/images/exclamation-triangle-solid.svg';

/* Interfaces */
import { PaymentTerm } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import { sellerIDSelector } from '../../../../../selectors/Seller';

/* Constants */
import { PAYMENT_TERMS_COLUMNS } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  initialPaymentTerm: PaymentTerm;
  handleDeletePaymentTermGroup: (indexIdentifier: string) => void;
  fetchPaymentTermGroups: () => void;
  setInitialPaymentTermGroup: (value: PaymentTerm) => void;
  cashflowOnboardingStatus: any;
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const PaymentTermsGroup: React.FC<Props> = props => {
  const {
    initialPaymentTerm,
    handleDeletePaymentTermGroup,
    fetchPaymentTermGroups,
    setInitialPaymentTermGroup,
    cashflowOnboardingStatus,
    updateCashflowOnboardingStatus,
  } = props;

  /* Set modal to open by default if its an new payment term */
  const [isOpen, setOpen] = useState<boolean>(initialPaymentTerm.id ? false : true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showEmptyError, setShowEmptyError] = useState<boolean>(false);
  const [isEditingName, setEditingName] = useState<boolean>(false);
  const [newPaymentTerm, setNewPaymentTerm] = useState<PaymentTerm>(initialPaymentTerm);
  const [showErrorColumn, setShowErrorColumn] = useState<string[]>([]);

  const doesPaymentTermsAddUpToTotalHundredPercent = () => {
    if (
      newPaymentTerm.deposit_perc &&
      newPaymentTerm.mid_pay_perc &&
      newPaymentTerm.paid_full_perc
    ) {
      if (
        parseInt(newPaymentTerm.deposit_perc) +
          parseInt(newPaymentTerm.mid_pay_perc) +
          parseInt(newPaymentTerm.paid_full_perc) ===
        100
      ) {
        setShowErrorColumn([]);
        return true;
      }
    }

    setShowErrorColumn(['deposit_perc', 'mid_pay_perc', 'paid_full_perc']);
    return false;
  };

  /* Save all changes in the payment term group */
  const handleSave = async (refreshUponSave?: boolean) => {
    /* Check for any empty entries */
    let hasError = false;
    const paymentTermsPayload: any = newPaymentTerm;
    paymentTermsPayload.indexIdentifier = undefined;

    PAYMENT_TERMS_COLUMNS.forEach(column => {
      const key = column.dataKey;
      if (
        newPaymentTerm.status !== 'inactive' &&
        (paymentTermsPayload[key] === null ||
          paymentTermsPayload[key] === '' ||
          paymentTermsPayload[key] === undefined) &&
        !column.optional
      ) {
        hasError = true;
        return;
      }
    });

    /* Make sure it sums up to 100% */
    if (!doesPaymentTermsAddUpToTotalHundredPercent()) {
      error('Please ensure payment terms add up to a 100% total.');
      return;
    }

    if (hasError) {
      error('Please fill in all the fields');
      setShowEmptyError(true);
      return;
    }

    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/order-payment-terms`;
      let res;

      if (newPaymentTerm.id) {
        res = await axios.patch(url, { payment_terms: [paymentTermsPayload] });
      } else {
        res = await axios.post(url, { payment_terms: [paymentTermsPayload] });
      }

      if (res.status === 200 || res.status === 201) {
        if (cashflowOnboardingStatus) {
          updateCashflowOnboardingStatus(cashflowOnboardingStatus.id, true);
        }
        success('Successfully updated payment terms.');
        const savedLeadTimeGroup = {
          ...newPaymentTerm,
          id: res.data.id,
        };
        setNewPaymentTerm(savedLeadTimeGroup);
        setInitialPaymentTermGroup(savedLeadTimeGroup);

        if (refreshUponSave) {
          fetchPaymentTermGroups();
        }
      }
    } catch (err) {
      console.error('Failed to save updates.');
    }
  };

  /* Save changes when editting payment term group name */
  const handleSaveName = (isSaved: boolean) => {
    if (isSaved) {
      setEditingName(false);
    } else {
      handlePaymentTermGroupNameEdit(initialPaymentTerm.name);
      setEditingName(false);
    }
  };

  const handleCancel = () => {
    setNewPaymentTerm(initialPaymentTerm);
    setOpen(false);
  };

  /* Hook called upon editing name of payment term group */
  const handlePaymentTermGroupNameEdit = (value: string) => {
    setNewPaymentTerm({
      ...newPaymentTerm,
      name: value,
    });
  };

  const handleEditRow = (key: string, value: any, id: number) => {
    if (newPaymentTerm.id === id) {
      const updatedPaymentTerm: any = newPaymentTerm;
      updatedPaymentTerm[key] = value;
      setNewPaymentTerm(updatedPaymentTerm);
    }
  };

  const handleSaveAsDefault = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/order-payment-terms`;
      const payload = {
        ...newPaymentTerm,
        is_default: true,
      };
      const res = await axios.patch(url, { payment_terms: [payload] });
      if (res.status === 200) {
        setNewPaymentTerm({
          ...newPaymentTerm,
          is_default: true,
        });
        success('Successfully updated payment terms.');
        fetchPaymentTermGroups();
      }
    } catch (err) {
      error('Failed to save updates.');
    }
  };

  return (
    <div className={styles.leadTimeGroupWrapper}>
      <div className={styles.leadTimeGroup}>
        {/* TRIGGER HEADER */}
        <BoxHeader
          className={`${styles.leadTimeGroupHeader} ${
            !isOpen ? styles.leadTimeGroupHeader__closed : ''
          }`}
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {showEmptyError && <ExclaimationIcon className={styles.exclaimationIcon} />}
          {/* EDITTING NAME SECTION */}
          {!isEditingName ? (
            <div className={styles.editName}>
              {newPaymentTerm.name}
              {newPaymentTerm.is_default ? ' (Default)' : ''}
              {isOpen && (
                <Icon
                  onClick={(event: any) => {
                    event.stopPropagation();
                    setEditingName(true);
                  }}
                  name="pencil"
                  className={styles.editIcon}
                />
              )}
            </div>
          ) : (
            <div
              className={styles.editName}
              onClick={(event: any) => {
                event.stopPropagation();
              }}
            >
              <InputFilter
                label=""
                placeholder="Enter or select value..."
                value={newPaymentTerm.name}
                handleChange={handlePaymentTermGroupNameEdit}
              />
              <Icon
                name="check"
                className={styles.checkIcon}
                onClick={(event: any) => {
                  event.stopPropagation();
                  handleSaveName(true);
                }}
              />
              <Icon
                name="close"
                className={styles.closeIcon}
                onClick={(event: any) => {
                  event.stopPropagation();
                  handleSaveName(false);
                }}
              />
            </div>
          )}

          {/* DELETE ICON */}
          <div>
            {!newPaymentTerm?.is_default && newPaymentTerm.id && (
              <button className={styles.defaultButton} onClick={handleSaveAsDefault}>
                Set as default
              </button>
            )}
            <Icon
              name="trash alternate"
              className={styles.deleteTriggerIcon}
              onClick={(event: any) => {
                event.stopPropagation();
                setIsDeleting(true);
              }}
            />
          </div>
        </BoxHeader>

        {/* PLACEHOLDER FOR LOADING STATE */}
        {false && (
          <BoxContainer>
            <Placeholder numberRows={5} numberParagraphs={3} />
          </BoxContainer>
        )}

        {isOpen && (
          <BoxContainer>
            <InputTable
              tableColumns={PAYMENT_TERMS_COLUMNS}
              data={[newPaymentTerm]}
              handleEditRow={handleEditRow}
              disableDelete
              showError={showEmptyError}
              errorColumns={showErrorColumn}
            />
            <div className={styles.buttonsRow}>
              <ActionButton
                variant="reset"
                size="md"
                className={styles.resetButton}
                onClick={handleCancel}
              >
                Cancel
              </ActionButton>
              <ActionButton
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={() => handleSave(true)}
              >
                Save
              </ActionButton>
            </div>
          </BoxContainer>
        )}
      </div>

      <Confirm
        content={'Delete your payment term?'}
        open={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          setIsDeleting(false);
          handleDeletePaymentTermGroup(initialPaymentTerm.indexIdentifier || '');
        }}
      />
    </div>
  );
};

export default PaymentTermsGroup;
