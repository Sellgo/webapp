import React from 'react';
import styles from './UploadSupplierFiles.module.css';
import { Segment, Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import UploadSteps from './UploadSteps';
import SupplierInformation from './SupplierInformation';
import Actions from './Actions';
import SelectFile from './SelectFile';
import DataMapping from './DataMapping';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';

interface Props {
  match: any;
  sellerData: any;
  currentStep: number;
}

const Steps = [SupplierInformation, SelectFile, DataMapping];

export const UploadSupplierFiles = (props: Props) => {
  const { currentStep } = props;
  const StepComponent = Steps[currentStep];

  return (
    <AdminLayout
      auth={props.match.params.auth}
      sellerData={props.sellerData}
      title={'Upload Supplier Files'}
    >
      <Segment className={styles.container}>
        <UploadSteps />
        <Grid stackable={true} columns={2}>
          <Grid.Column stretched={false} style={{ width: 'initial' }}>
            <video height="240" controls={true}>
              <source
                // change with real video
                src="https://r1---sn-h0jeen76.googlevideo.com/videoplayback?expire=1565733585&ei=cd5SXYOrIJDE-gbx5aTICQ&ip=37.48.106.215&id=o-AP7PMMaw3AuVWHmszTCFWzBwQ-GHGZ0cAFwbXZZTtEf5&itag=18&source=youtube&requiressl=yes&mime=video%2Fmp4&gir=yes&clen=25860606&ratebypass=yes&dur=477.170&lmt=1553861545906390&fvip=8&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIgZHvy1G1MtEa8M6xQQ0baxpJ45PT8qpAsypsDu-lKMmQCIQDmUIWg27GXTkYKntnWqkY3P2HpXN9uYN3Lbg-26_wSeg%3D%3D&title=Unboxing+The+%243000+Bluetooth+Speaker&redirect_counter=1&rm=sn-f5fe7d&req_id=a1095d31210da3ee&cms_redirect=yes&ipbypass=yes&mip=2a02:810d:4440:1584:5dab:868b:b433:c356&mm=31&mn=sn-h0jeen76&ms=au&mt=1565711867&mv=m&mvi=0&pl=33&lsparams=ipbypass,mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIgBQElDu1uS1Hz8Drf616J3pyOBMGXo5qvzQC5VsvdBSoCIQC0CsGtYflKDswFgMAmVvloVsv7O6CR9JKKCwm5eOHpBQ=="
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Grid.Column>
          <Grid.Column className={styles.flex}>
            <StepComponent />
          </Grid.Column>
        </Grid>
        <Actions />
      </Segment>
    </AdminLayout>
  );
};

const mapStateToProps = (state: any) => ({
  sellerData: state.settings.profile,
  currentStep: currentStepSelector(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSupplierFiles);
