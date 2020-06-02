import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Progress, Button } from 'semantic-ui-react';
import { getSellerQuota } from '../../actions/Settings';
import './index.scss';

interface QuotaMeterProps {
  sellerQuota: any;
  getSellerQuota: any;
  subscriptionType: string;
}

class QuotaMeter extends React.Component<QuotaMeterProps> {
  componentDidMount() {
    const { getSellerQuota } = this.props;
    getSellerQuota();
  }

  render() {
    const { sellerQuota, subscriptionType } = this.props;

    // Don't render until data is fetched
    if (!sellerQuota) {
      return null;
    }

    const percent = (sellerQuota.used / sellerQuota.available) * 100;

    return (
      <div className="quota-meter">
        <Progress percent={percent} size="tiny" color="blue">
          {subscriptionType === 'free'
            ? `0 tracked out of 0`
            : `${sellerQuota.used} tracked out of ${sellerQuota.available}`}
        </Progress>
        <Button as={Link} to="/settings/pricing" primary={true} className="add-new-supplier">
          Upgrade Now
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerQuota: get(state, 'settings.sellerQuota'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
});

const mapDispatchToProps = {
  getSellerQuota: () => getSellerQuota(),
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotaMeter);
