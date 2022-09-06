import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
// import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { TplVendor, ReplenishmentFBA } from '../../../../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';

/* Utils */
import { error } from '../../../../../utils/notifications';
import history from '../../../../../history';

/* Apis */
import { fetchReplishmentTemplates } from '../../../../../libs/api/replenishmentTemplates';
// import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

export const COLUMNS_DATA = [
  {
    key: 'productDetail',
    label: '',
    width: '260',
    align: '',
  },
  {
    key: 'UnitsPerCartoon',
    label: 'Units per cartoon',
    width: '80',
    align: 'center',
  },
  {
    key: 'CartoonDimension',
    label: 'Cartoon dimension (in)',
    width: '120',
    align: 'center',
  },
  {
    key: 'CartoonWeight',
    label: 'Cartoon weight (lb)',
    width: '100',
    align: 'center',
  },
  {
    key: 'PrepGuidance',
    label: 'Prep  guidance',
    width: '250',
    align: 'center',
  },
  {
    key: 'labels',
    label: 'Who label units?',
    width: '250',
    align: 'center',
  },
];

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
  console.log(currentReplenishmentTemplate, currentTplVendor);
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
            <div className={styles.columnWrapper}>
              {COLUMNS_DATA &&
                COLUMNS_DATA.map(columnData => {
                  const { key, label, width } = columnData;
                  return (
                    <div
                      key={key}
                      style={{
                        width: `${width}px`,
                        marginRight: '40px',
                      }}
                    >
                      <p
                        className={styles.columnLabel}
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          margin: '0 auto',
                        }}
                      >
                        {label}
                      </p>
                    </div>
                  );
                })}
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
