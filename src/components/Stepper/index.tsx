import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import React, { ReactNode } from 'react';
import Steps, { Step } from 'rc-steps';

export type StepComponent = React.FunctionComponent<{
  title: string | ReactNode;
  icon?: string | ReactNode;
  disabled?: boolean;
  description?: string;
}>;

export interface StepperProps {
  value?: number;
  onChange: (newValue: number) => void;
  children: (args: { Step: StepComponent }) => React.ReactNode[];
  className?: string;
}

export { Step };

export default (props: StepperProps) => {
  const { value = 0, onChange, children, className } = props;

  return (
    <Steps labelPlacement="vertical" className={className} current={value} onChange={onChange}>
      {children({ Step })}
    </Steps>
  );
};
