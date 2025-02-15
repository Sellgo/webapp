import React from 'react';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import { updateSeller } from '../../actions/Settings/Subscription';
import { connect } from 'react-redux';

interface Props {
  updateSeller: (payload: any) => void;
  youtubeLink: string;
}

const YoutubeVideo = (props: Props) => {
  const { updateSeller, youtubeLink } = props;
  const [isModalOpen, setModalOpen] = React.useState<boolean>(true);
  const handleCloseVideo = () => {
    updateSeller({ is_first_time_logged_in: false, doNotRefresh: false });
    setModalOpen(false);
  };

  if (!youtubeLink) {
    return null;
  }

  return (
    <Modal
      open={isModalOpen}
      className={styles.videoModal}
      onClose={handleCloseVideo}
      content={
        <div className={styles.borderWrapper}>
          <div className={styles.youtubeEmbedContainer}>
            <iframe
              title="SellGo Demo Video"
              width="860"
              height="500"
              src={youtubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; 
								encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      }
    />
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSeller: (payload: any) => {
      dispatch(updateSeller(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(YoutubeVideo);
