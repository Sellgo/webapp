import React from 'react';
import { Icon, Step, Popup, Form } from 'semantic-ui-react';
import { Steps } from '../../interfaces/StepsInfo';

interface Props {
  stepsData: Steps[];
}

const StepsInfo = (props: Props) => {
  const { stepsData } = props;
  const stepsDisplay = stepsData.map((stat: Steps) => {
    if (stat.stepShow) {
      return (
        <Step className={stat.stepClass} key={stat.id}>
          <Icon className={stat.stepClass + ' ' + stat.stepIcon} />
          <Step.Content>
            <Step.Title className={stat.stepClass}>{stat.stepTitle}</Step.Title>
            <Step.Description className={stat.stepClass}>{stat.stepDescription}</Step.Description>
          </Step.Content>
        </Step>
      );
    }
  });

  return (
    <Popup
      trigger={<Form.Input type="password" placeholder="Password" />}
      on="click"
      size="huge"
      position="left center"
      wide="very"
    >
      <Step.Group size="mini" vertical={true}>
        {stepsDisplay}
      </Step.Group>
    </Popup>
  );
};

export default StepsInfo;
