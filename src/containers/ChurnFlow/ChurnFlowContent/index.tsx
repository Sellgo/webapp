import React from 'react';

/* Styling */
import './index.scss';

import OrangeButton from '../../../components/OrangeButton';

interface Props {
  onClick: () => any;
  title: string;
  desc: string;
  buttonText: string;
  img: string;
  isButtonGrey?: boolean;
}

class ChurnFlowContent extends React.Component<Props> {
  render() {
    const { title, desc, buttonText, onClick, img, isButtonGrey } = this.props;
    const buttonType = isButtonGrey ? 'grey' : 'primary';

    return (
      <div className="churnFlowContent">
        <img className="churnFlowContent__img" src={img} />
        <h2 className="churnFlowContent__title">{title}</h2>
        <p className="churnFlowContent__desc">{desc}</p>
        <OrangeButton type={buttonType} size="medium" onClick={onClick}>
          {buttonText}
        </OrangeButton>
      </div>
    );
  }
}

export default ChurnFlowContent;
