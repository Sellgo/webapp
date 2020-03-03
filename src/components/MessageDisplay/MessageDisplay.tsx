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
  componentWillReceiveProps(prevProps: any) {
    if (prevProps.messageDetails.key != this.props.messageDetails.key) {
      this.showMessage();
    }
  }
  showMessage() {
    this.setState({
      hidden: false,
    });
    setTimeout(() => {
      this.setState({
        hidden: true,
      });
    }, 4000);
  }

  render() {
    const { key, header, content, isSuccess, isError } = this.props.messageDetails;
    const { hidden } = this.state;
    return (
      <Rail internal={true} position="left">
        <Segment>
          <Message
            key={key}
            hidden={hidden}
            success={isSuccess}
            error={isError}
            header={header}
            content={content}
          />
        </Segment>
      </Rail>
    );
  }
}

export default MessageDisplay;
