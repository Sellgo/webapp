import React from 'react';
import { Icon, Step, Popup, Form } from 'semantic-ui-react';

const StepsInfo = (props: any) => {
  const stepsDisplay = props.stepsData.map((stat: any) => {
    if (stat.stepShow) {
      return (
        <Step className={stat.stepClass} key={stat.id}>
          <Icon name={stat.stepIcon} className={stat.stepClass} />
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
