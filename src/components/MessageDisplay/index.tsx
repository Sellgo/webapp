import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import './index.scss';

interface State {
  setMessageContent: any;
}
interface Props {
  header: string;
  content: string;
  time: number;
}

export default class MessageDisplay extends React.Component<any> {
  // setMessage = (header:string, content:string) => {
  //     return(
  //         <Message
  //         success={true}
  //         header={header}
  //         content={content}
  //     />
  //     )
  // }
  render() {
    // const { header, content, time } = this.props;
    return (
      <Rail internal={true} position="left">
        <Segment>
          <Message
            success={true}
            header={'Account Created'}
            content={'A link to verify your email has been sent to'}
          />
        </Segment>
      </Rail>
    );
  }
}

//  export function setMessage () {
//     return(
//         <Message
//             success={true}
//             header={header}
//             content={content}
//         />
//     )
// }
