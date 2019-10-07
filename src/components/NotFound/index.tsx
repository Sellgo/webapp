import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// TODO: Remove style once we have a layout component for non-logged in pages
const NotFound = () => {
  return (
    <Segment
      basic={true}
      style={{
        height: '100%',
        minHeight: '100vh',
        marginTop: 0,
        paddingTop: 20,
        transition: 'width 0.8s,padding 0.8s',
        backgroundColor: '#f3f3f3f3',
      }}
    >
      Page not found. <Link to="/">Return home</Link>
    </Segment>
  );
};

export default NotFound;
