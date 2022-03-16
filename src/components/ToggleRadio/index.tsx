import React from 'react';
import { Radio } from 'semantic-ui-react';

/* Styling */
import './toggleReset.scss';

interface Props {
  className?: string;
  isToggled: boolean;
  handleChange: () => void;
  label: string;
  isRainbow?: boolean;
}

const ToggleRadio: React.FC<Props> = props => {
  const { className, isToggled, handleChange, label, isRainbow } = props;

  return (
    <span className={isRainbow ? 'toggleRadioRainbow' : 'toggleRadio'}>
      <Radio
        label={label}
        className={`${className}`}
        checked={isToggled}
        onChange={handleChange}
        toggle
      />
    </span>
  );
};
export default ToggleRadio;
