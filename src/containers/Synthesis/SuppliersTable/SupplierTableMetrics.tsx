import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { supplierMetricsSelector } from '../../../selectors/Supplier';
import { TimeEfficiency } from '../../../interfaces/Metrics';
import { getTimeEfficiency } from '../../../actions/Suppliers';

interface SupplierTableMetricsProps {
  timeEfficiency: TimeEfficiency[];
  getTimeEfficiency: () => void;
}
class SupplierTableMetrics extends Component<SupplierTableMetricsProps> {
  componentDidMount() {
    const { getTimeEfficiency } = this.props;
    getTimeEfficiency();
  }
  render() {
    return (
      <div>
        <Card raised={true} style={{ borderRadius: 10, width: 290 }}>
          <Card.Content
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '11px',
                // width: '100%',
              }}
            >
              <span>
                Time Saved
                <h2>
                  {this.props.timeEfficiency.length > 0
                    ? Number(this.props.timeEfficiency[0].saved_time).toFixed(0) + ' hrs'
                    : '0 hrs'}
                </h2>
              </span>
              <span style={{ marginLeft: 15, flex: 'right' }}>
                Efficiency
                <h2>
                  {this.props.timeEfficiency.length > 0
                    ? Number(this.props.timeEfficiency[0].efficiency).toFixed(0) + ' %'
                    : '0 %'}
                </h2>
              </span>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  timeEfficiency: supplierMetricsSelector(state),
});

const mapDispatchToProps = {
  getTimeEfficiency: () => getTimeEfficiency(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierTableMetrics);
