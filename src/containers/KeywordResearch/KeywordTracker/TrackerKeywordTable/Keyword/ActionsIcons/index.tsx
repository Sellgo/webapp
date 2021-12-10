import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup, Checkbox } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Placeholder from '../../../../../../components/Placeholder';

/* Actions */
import { trackBoostProductTableKeyword } from '../../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackBoostProductsTableKeyword } from '../../../../../../interfaces/KeywordResearch/KeywordTracker';
import { TriggerMetaData } from '../../../../../../interfaces/KeywordResearch/Zapier';

/* Icons */
import KeywordBoostTrackIcon from '../../../../../../components/Icons/KeywordResearch/KeywordBoostTrack';
import ZapierIcon from '../../../../../../components/Icons/KeywordResearch/Zapier';

/* Utils */
import { AppConfig } from '../../../../../../config';
import { sellerIDSelector } from '../../../../../../selectors/Seller';
import { success } from '../../../../../../utils/notifications';

interface Props {
  trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) => void;
  keywordTrackId: number;
  isBoostTracked: boolean;
  boostExpiryDate: string;
  triggers: TriggerMetaData[];
}

const ActionsIconCell = (props: Props) => {
  const {
    trackBoostProductTableKeyword,
    keywordTrackId,
    isBoostTracked,
    boostExpiryDate,
    triggers,
  } = props;
  const [availableTriggers, setAvailableTriggers] = React.useState<TriggerMetaData[]>([]);
  const [isLoadingAvailableTriggers, setIsLoadingAvailableTriggers] = React.useState<boolean>(
    false
  );
  const assignedTriggers = availableTriggers.filter(
    (trigger: TriggerMetaData) => trigger.is_assigned
  );

  React.useEffect(() => {
    if (triggers.length > 0) {
      setAvailableTriggers(triggers);
    }
  }, [triggers]);

  const handleTrackUntrackBoostKeyword = () => {
    trackBoostProductTableKeyword({
      keywordTrackId: keywordTrackId,
      is_boost: isBoostTracked ? 'false' : 'true',
    });
  };

  const getAvailableTriggers = async () => {
    setIsLoadingAvailableTriggers(true);
    try {
      const sellerId = sellerIDSelector();
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/track/${keywordTrackId}/triggers`;
      const res = await axios.get(url);
      const { data } = res;
      setAvailableTriggers(data);
    } catch (error) {
      console.error(error);
      setAvailableTriggers([]);
    }
    setIsLoadingAvailableTriggers(false);
  };

  const handleAssignToTrigger = async (triggerId: number, triggerName: string) => {
    try {
      setIsLoadingAvailableTriggers(true);
      const sellerId = sellerIDSelector();
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerId}/keywords/trigger/add-assignments`;
      const payload = {
        keyword_trigger_id: triggerId,
        keyword_track_id: keywordTrackId,
      };
      const { status } = await axios.post(url, payload);
      if (status === 201) {
        success(`Keyword added to ${triggerName} successfully.`);
      }
      getAvailableTriggers();
    } catch (error) {
      setIsLoadingAvailableTriggers(false);
      console.error(error);
    }
  };

  const handleDeleteKeyword = async (triggerId: number, triggerName: string) => {
    try {
      setIsLoadingAvailableTriggers(true);
      const sellerID = localStorage.getItem('userId');
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/delete-assignments`,
        {
          keyword_trigger_id: triggerId,
          keyword_track_id: keywordTrackId,
        }
      );
      if (status === 200) {
        success(`Keyword removed from ${triggerName} successfully.`);
      }
      getAvailableTriggers();
    } catch (err) {
      setIsLoadingAvailableTriggers(false);
      console.error(err);
    }
  };

  const handleAssignmentChange = (triggerId: number, triggerName: string, isAssigned?: boolean) => {
    if (isAssigned) {
      handleDeleteKeyword(triggerId, triggerName);
    } else {
      handleAssignToTrigger(triggerId, triggerName);
    }
  };

  return (
    <>
      <div className={styles.actionIconCellWrapper}>
        <button onClick={handleTrackUntrackBoostKeyword} className={styles.boost}>
          <KeywordBoostTrackIcon fill={isBoostTracked ? '#FC7900' : '#636d76'} />
          &nbsp;{boostExpiryDate ? `${boostExpiryDate} hours` : ''}
        </button>
        <Popup
          on="click"
          position="bottom left"
          offset="0"
          closeOnDocumentClick
          closeOnEscape
          className={styles.actionsPopover}
          content={
            <>
              <div className={styles.actionOptions}>
                {isLoadingAvailableTriggers ? (
                  <Placeholder numberRows={0} numberParagraphs={0} />
                ) : (
                  <>
                    <p>ADD TRIGGER RULE</p>
                    {availableTriggers.map((trigger: TriggerMetaData) => (
                      <div key={trigger.id} className={styles.actionOption}>
                        <Checkbox
                          className={styles.triggerInput}
                          type="checkbox"
                          checked={trigger.is_assigned}
                          label={trigger.name}
                          onChange={() =>
                            handleAssignmentChange(trigger.id, trigger.name, trigger.is_assigned)
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          }
          trigger={
            <button className={styles.zapier}>
              <ZapierIcon fill={`${assignedTriggers.length > 0 ? '#FC7900' : '#636d76'}`} />
              <Icon name="chevron down" />
              {assignedTriggers.length > 0 && (
                <span className={styles.triggerNames}>
                  {assignedTriggers.map((trigger: TriggerMetaData) => trigger.name).join(', ')}
                </span>
              )}
            </button>
          }
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) =>
      dispatch(trackBoostProductTableKeyword(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ActionsIconCell);
