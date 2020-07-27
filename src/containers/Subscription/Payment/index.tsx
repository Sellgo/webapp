import React from 'react';
import './index.scss';
import { Container } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';
import StepsContent from '../StepsContent';

interface Props {
  auth: Auth;
  setSignup: () => void;
}
export default function Payment() {
  // const handleSubmit = () => {

  //     console.log('handleSubmit: ');
  // };

  return (
    <Container text className="payment-container">
      <StepsContent contentType={'register'} />
    </Container>
  );
}
