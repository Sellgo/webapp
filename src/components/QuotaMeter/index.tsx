import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Progress } from 'semantic-ui-react';
import { getSellerQuota } from '../../actions/Settings';
import './index.scss';

interface QuotaMeterProps {
  sellerQuota: any;
  getSellerQuota: any;
}

class QuotaMeter extends React.Component<QuotaMeterProps> {
  componentDidMount() {
    const { getSellerQuota } = this.props;
    getSellerQuota();
  }

  render() {
    const { sellerQuota } = this.props;
    // Don't render until data is fetched
    if (!sellerQuota) {
      return null;
    }
    const used = sellerQuota.seller_research.used;
    const available = sellerQuota.seller_research.available;
    const percent = (used / available) * 100;

    return (
      <div className="quota-meter">
        <Progress percent={percent} size="tiny" color="blue">
          {`${used} used out of ${available}`}
        </Progress>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerQuota: get(state, 'settings.sellerQuota'),
});

const mapDispatchToProps = {
  getSellerQuota: () => getSellerQuota(),
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotaMeter);
