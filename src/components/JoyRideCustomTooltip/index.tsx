import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';

interface Props {
  tooltipMessage: string;
}

const JoyRideCustomTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  isLastStep,
}: any) => (
  <div {...tooltipProps} className="react-joyride__tooltip" style={step?.styles?.tooltip}>
    {console.log(
      'step',
      step,
      '\n',
      'backProps',
      backProps,
      '\n',
      tooltipProps,
      '\n primary pros',
      primaryProps
    )}
    <div style={step?.styles?.tooltipContainer}>
      {step.title && <div>{step.title}</div>}

      <div style={step?.styles?.tooltipContent}>
        <p>{step.content}</p>
        {step.image && <Image src={step.image} alt="tooltip Image" />}
        {step.link && (
          <Link
            to={{ pathname: `${step.link}` }}
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <p>{step.linkText}</p>
          </Link>
        )}
      </div>

      <div style={{ ...step?.styles?.tooltipFooter, ...step?.styles?.tooltipFooterSpacer }}>
        {index > 0 && (
          <Button {...backProps} style={step?.styles?.buttonBack}>
            <p id="back">Back</p>
          </Button>
        )}
        {continuous && (
          <Button {...primaryProps} style={step?.styles?.buttonNext}>
            <p id="next">{isLastStep ? <span>Close</span> : <span>Next</span>}</p>
          </Button>
        )}
        {!continuous && (
          <Button {...closeProps}>
            <p id="close">Close</p>
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default memo(JoyRideCustomTooltip);
