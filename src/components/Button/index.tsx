import React from 'react';
import { Button } from 'semantic-ui-react';
import './index.scss';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  isClickable?: boolean;
  onClick?: () => void;
  content: string;
  isLink?: boolean;
  toLink?: string;
}

const GenericButton = (props: ButtonProps) => {
  const { isClickable, onClick, content, isLink, toLink } = props;
  return (
    <Button
      className="generic-button"
      as={isLink ? Link : ''}
      to={isLink ? toLink : ''}
      onClick={isClickable ? onClick : () => {}}
      content={content}
    />
  );
};

export default GenericButton;
