import React from 'react';
import { Icon, Step, Popup, Form } from 'semantic-ui-react';
const StepsInfo = (props: any) => {
  const { onChange } = props;

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
      trigger={<Form.Input required type="password" placeholder="Password" onChange={onChange} />}
      on="focus"
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
