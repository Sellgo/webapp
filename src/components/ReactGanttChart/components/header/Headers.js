import React, { PureComponent } from 'react';
import moment from 'moment';
import { BUFFER_DAYS, DATA_CONTAINER_WIDTH } from '../../Const';
import { VIEW_MODE_DAY, VIEW_MODE_WEEK, VIEW_MODE_MONTH, VIEW_MODE_YEAR } from '../../Const';
import Config from '../../helpers/config/Config';
import DateHelper from '../../helpers/DateHelper';
import './Header.scss';

export class HeaderItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          height: '48px',
          left: this.props.left,
          width: this.props.width,
        }}
        className="header-item"
      >
        {this.props.label}
      </div>
    );
  }
}

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.setBoundaries();
  }

  getModeIncrement(date, mode) {
    switch (mode) {
      case 'year':
        return DateHelper.daysInYear(date.year());
      case 'month':
        return date.daysInMonth();
      case 'week':
        return 7;
      default:
        return 1;
    }
  }

  getStartDate = (date, mode) => {
    let year = null;
    switch (mode) {
      case 'year':
        year = date.year();
        return moment([year, 0, 1]);
      case 'month':
        year = date.year();
        let month = date.month();
        return moment([year, month, 1]);
      case 'week':
        return date.subtract(date.day(), 'days');
      default:
        return date;
    }
  };

  renderTime = (left, width, mode, key) => {
    let result = [];
    let hourWidth = width / 24;
    let iterLeft = 0;
    for (let i = 0; i < 24; i++) {
      result.push(
        <HeaderItem
          key={i}
          left={iterLeft}
          width={hourWidth}
          label={mode == 'shorttime' ? i : `${i}:00`}
        />
      );
      iterLeft = iterLeft + hourWidth;
    }
    return (
      <div key={key} style={{ position: 'absolute', height: 20, left: left, width: width }}>
        {' '}
        {result}
      </div>
    );
  };
  getBox(date, mode, lastLeft) {
    let increment = this.getModeIncrement(date, mode) * this.props.dayWidth;
    if (!lastLeft) {
      let starDate = this.getStartDate(date, mode);
      starDate = starDate.startOf('day');
      let now = moment().startOf('day');
      let daysInBetween = starDate.diff(now, 'days');
      lastLeft = DateHelper.dayToPosition(
        daysInBetween,
        this.props.nowposition,
        this.props.dayWidth
      );
    }

    return { left: lastLeft, width: increment };
  }

  renderHeaderRows = perDayMode => {
    let result = { top: [], middle: [], bottom: [] };
    let lastLeft = {};
    let currentMiddle = '';
    let currentDate = null;
    let box = null;

    let start = this.props.currentday;
    let end = this.props.currentday + this.props.numVisibleDays;
    for (let i = start - BUFFER_DAYS; i < end + BUFFER_DAYS; i++) {
      //The unit of iteration is day
      currentDate = moment().add(i, 'days');
      let adjustedDate;
      if (perDayMode === 'week') {
        adjustedDate = currentDate.startOf('week');
      } else {
        adjustedDate = currentDate.startOf('day');
      }
      if (currentMiddle != adjustedDate.format('MM/DD/YY')) {
        currentMiddle = adjustedDate.format('MM/DD/YY');
        box = this.getBox(adjustedDate, perDayMode, lastLeft.middle);
        lastLeft.middle = box.left + box.width;
        result.middle.push(
          <HeaderItem key={i} left={box.left} width={box.width} label={currentMiddle} />
        );
      }
    }

    return (
      <div
        className="timeLine-main-header-container"
        style={{ width: DATA_CONTAINER_WIDTH, maxWidth: DATA_CONTAINER_WIDTH }}
      >
        <div className="header-middle">{result.middle}</div>
      </div>
    );
  };

  renderHeader = () => {
    switch (this.props.mode) {
      case VIEW_MODE_DAY:
        return this.renderHeaderRows(this.props.mode);
      case VIEW_MODE_WEEK:
        return this.renderHeaderRows('week', 'dayweek', 'shorttime');
      case VIEW_MODE_MONTH:
        return this.renderHeaderRows('day');
      case VIEW_MODE_YEAR:
        return this.renderHeaderRows('week');
    }
  };

  setBoundaries = () => {
    this.start = this.props.currentday - BUFFER_DAYS;
    this.end = this.props.currentday + this.props.numVisibleDays + BUFFER_DAYS;
  };

  needToRender = () => {
    return (
      this.props.currentday < this.start ||
      this.props.currentday + this.props.numVisibleDays > this.end
    );
  };

  render() {
    if (this.refs.Header) this.refs.Header.scrollLeft = this.props.scrollLeft;
    //Check boundaries to see if wee need to recalcualte header
    // if (this.needToRender()|| !this.cache){
    //     this.cache=this.renderHeader();
    //     this.setBoundaries();
    // }
    return (
      <div id="timeline-header" ref="Header" className="timeLine-main-header-viewPort">
        {this.renderHeader()}
      </div>
    );
  }
}
