import React, { useState } from 'react';
import { Icon, Step, Popup } from 'semantic-ui-react';
import { Steps } from '../../interfaces/StepsInfo';

interface Props {
  stepsData: Steps[];
  onChange: any;
  isFocusPW: boolean;
  focusInput: any;
  blurInput: any;
}

const StepsInfo = (props: Props) => {
  const { stepsData, onChange, isFocusPW, focusInput, blurInput } = props;
  const [isPassword, setPassword] = useState(true);
  const stepsDisplay = stepsData.map((stat: Steps) => {
    if (stat.stepShow) {
      return (
        <Step className={stat.stepClass} key={stat.id}>
          <Icon className={stat.stepClass + ' ' + stat.stepIcon} />
          <Step.Content>
            <Step.Title className={stat.stepClass}>{stat.stepTitle} </Step.Title>
            <Step.Description className={stat.stepClass}>{stat.stepDescription}</Step.Description>
          </Step.Content>
        </Step>
      );
    }
  });
  const handleClickPassword = () => {
    if (isPassword) {
      setPassword(false);
    } else {
      setPassword(true);
    }
  };
  return (
    <Popup
      open={isFocusPW}
      trigger={
        <div className="ui icon input field">
          <input
            autoFocus={isFocusPW}
            onBlur={blurInput}
            onFocus={focusInput}
            required
            type={isPassword ? 'password' : 'text'}
            minLength={8}
            placeholder="Password"
            onChange={onChange}
          />
          <i
            className={isPassword ? 'eye icon' : 'eye icon active'}
            onClick={handleClickPassword}
          />
        </div>
      }
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
