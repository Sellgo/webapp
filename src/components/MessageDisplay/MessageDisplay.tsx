import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import './index.scss';
import { MessageDetails } from '../../interfaces/MessageDisplay';

interface State {
  hidden: boolean;
}
interface Props {
  messageDetails: MessageDetails;
}

class MessageDisplay extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hidden: true,
    };
  }
  UNSAFE_componentWillReceiveProps(prevProps: any) {
    if (prevProps.messageDetails.key !== this.props.messageDetails.key) {
      this.showMessage();
    }
  }
  showMessage() {
    this.setState({
      hidden: false,
    });
    if (this.props.messageDetails.time !== 0) {
      console.log('this.props.messageDetails.time: ', this.props.messageDetails.time);
      setTimeout(() => {
        this.setState({
          hidden: true,
        });
      }, this.props.messageDetails.time);
    }
  }

  render() {
    const { key, header, content, isSuccess, isError } = this.props.messageDetails;
    const { hidden } = this.state;
    return (
      <Rail internal={true} position="left">
        <Segment>
          {header ? (
            <Message
              key={key}
              hidden={hidden}
              success={isSuccess}
              error={isError}
              header={header}
              content={content}
            />
          ) : null}
        </Segment>
      </Rail>
    );
  }
}

export default MessageDisplay;
