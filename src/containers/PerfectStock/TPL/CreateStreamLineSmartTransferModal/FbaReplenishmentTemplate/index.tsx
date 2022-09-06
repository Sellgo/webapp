import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
import { TplVendor, ReplenishmentFBA } from '../../../../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';

/* Utils */
import { error } from '../../../../../utils/notifications';
import history from '../../../../../history';

/* Apis */
import { fetchReplishmentTemplates } from '../../../../../libs/api/replenishmentTemplates';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  setCreateStreamLinePayload: (payload: any) => void;
  createStreamLinePayload: any;
  tplVendors: TplVendor[];
  createStreamLineStep: number;
}

const SelectFbaReplenishmentTemplate = (props: Props) => {
  const {
    handlePrev,
    handleNext,
    setCreateStreamLinePayload,
    createStreamLinePayload,
    createStreamLineStep,
    tplVendors,
  } = props;

  const [replenishmentTemplatesOptions, setReplenishmentTemplatesOptions] = React.useState([]);
  const [replenishmentTemplatesData, setReplenishmentTemplatesData] = React.useState<
    ReplenishmentFBA[]
  >([]);
  const [currentReplenishmentTemplate, setCurrentReplenishmentTemplate] = React.useState<
    ReplenishmentFBA
  >();
  const [currentTplVendor, setCurrentTplVendor] = React.useState<TplVendor>();

  const handleSubmit = () => {
    /* Handle Error */
    console.log(createStreamLinePayload);
    if (createStreamLinePayload.tpl_replenishment_template_id < 0) {
      error('Please select a template');
      return;
    } else {
      handleNext();
    }
  };

  const setReplenishmentTemplateOptions = async () => {
    const replenishmentTemplates = await fetchReplishmentTemplates();
    if (!replenishmentTemplates?.hasError) {
      setReplenishmentTemplatesData(replenishmentTemplates?.data);
      const tempReplenishmentTemplatesOptions = replenishmentTemplates?.data.map(
        (replenishmentTemplate: any) => ({
          key: replenishmentTemplate.id?.toString() || '',
          value: replenishmentTemplate.id?.toString() || '',
          text: replenishmentTemplate.name,
        })
      );

      tempReplenishmentTemplatesOptions.push({
        key: 'Create new lead time',
        value: 'Create new lead time',
        text: 'Create new lead time',
      });

      setReplenishmentTemplatesOptions(tempReplenishmentTemplatesOptions);
    }
  };

  React.useEffect(() => {
    setReplenishmentTemplateOptions();
  }, []);

  const handleSelectLeadTime = async (replenishmentTemplateId: string) => {
    if (replenishmentTemplateId === 'Create new lead time') {
      localStorage.setItem('createOrderStep', createStreamLineStep.toString());
      localStorage.setItem('createStreamLinePayload', JSON.stringify(createStreamLinePayload));
      history.push('/settings/aistock/lead-time');
      return;
    }
    const replenishmentTemplate = replenishmentTemplatesData.find(
      (replenishmentTemplateData: any) =>
        replenishmentTemplateData?.id?.toString() === replenishmentTemplateId
    );
    const tplVendorId = replenishmentTemplate?.vendor_id?.toString();
    const tempTplVendor = tplVendors.find(tplVendor => tplVendor?.id?.toString() === tplVendorId);
    setCurrentReplenishmentTemplate(replenishmentTemplate);
    setCurrentTplVendor(tempTplVendor);
    setCreateStreamLinePayload({
      ...createStreamLinePayload,
      tpl_replenishment_template_id: parseInt(replenishmentTemplateId),
    });
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h3 className={styles.heading}>Select your FBA replenishment template*</h3>
        <div className={styles.inputBox}>
          <div>
            <SelectionFilter
              filterOptions={replenishmentTemplatesOptions}
              value={createStreamLinePayload.tpl_replenishment_template_id.toString()}
              handleChange={handleSelectLeadTime}
              placeholder="FBA replenishment template name*"
              label=""
              className={styles.selectField}
            />
          </div>
          <div className={styles.contentBox}>
            <div className={styles.contentWrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Ship from</p>
              </div>
              <div>
                <p className={styles.text}>
                  {currentTplVendor?.name}, {currentTplVendor?.address}, {currentTplVendor?.city},{' '}
                  {currentTplVendor?.state}, {currentTplVendor?.zip_code}
                </p>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Marketplace destination</p>
              </div>
              <div>
                <p className={styles.text}>United States</p>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Fulfillment capability</p>
              </div>
              <div>
                <p className={styles.text}>
                  {currentReplenishmentTemplate?.fulfillment === 'amz'
                    ? 'Standard Fulfillment by Amazon'
                    : currentReplenishmentTemplate?.fulfillment === 'blank_box'
                    ? 'Blank Box'
                    : 'Mixture of amazon and blank box'}
                </p>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Shipment Method</p>
              </div>
              <div>
                <p className={styles.text}>
                  {currentReplenishmentTemplate?.method === 'spd'
                    ? 'Small Parcel Delivery (SPD)'
                    : currentReplenishmentTemplate?.method === 'add'
                    ? 'Less than Truckload (LTL)'
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrev}
          variant="reset"
          size="md"
        >
          Back
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={handleSubmit}
          variant="secondary"
          type="purpleGradient"
          size="md"
        >
          Continue
        </ActionButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
  };
};

export default connect(mapStateToProps)(SelectFbaReplenishmentTemplate);
