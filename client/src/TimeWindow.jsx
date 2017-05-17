import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classnames from 'classnames';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fn } from './core/util/function';
import {
  bqLoadSrcMacAddressesAction,
  bqUpdateTimeWindowAction,
  bqUpdateSourceTypeAction,
} from './core/bq.action';
import { $TIME_WIDTH } from './core/data';

export function stateConnector(state) {
  return {
    startTime: _.get(state, 'bq.timeWindow.start', null),
    endTime: _.get(state, 'bq.timeWindow.end', null),
    sourceType: _.get(state, 'bq.type', 'raspi'),
  };
}

export function dispatchConnector(dispatch) {
  return {
    dispatchUpdateTimeWindow: (start, end, callback) => {
      dispatch(bqUpdateTimeWindowAction(start, end, callback));
    },
    dispatchUpdateSourceType: (type, callback) => {
      dispatch(bqUpdateSourceTypeAction(type, callback));
    },
    dispatchLoadSrcMacAddresses: (start, end, callback) => {
      dispatch(bqLoadSrcMacAddressesAction(start, end, callback));
    }
  };
}

export class TimeWindow extends React.Component {
  static propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    sourceType: PropTypes.string,
    onChange: PropTypes.func,
    dispatchLoadSrcMacAddresses: PropTypes.func,
    dispatchUpdateTimeWindow: PropTypes.func,
    dispatchUpdateSourceType: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      type: props.sourceType,
      start: props.startTime,
      end: props.endTime,
    };
  }

  handleChangeTimeWindow(type) {
    return ((_null, date) => {
      logger.debug(date);
      let startDate = new Date(this.state.start * 1000);
      let endDate = new Date(this.state.end * 1000);
      const { start, end } = (() => {
        let startT = Math.floor(startDate.getTime() / 1000);;
        let endT = Math.floor(endDate.getTime() / 1000);;
        switch (type) {
        case 'startDate':
          startDate.setFullYear(date.getFullYear());
          startDate.setMonth(date.getMonth());
          startDate.setDate(date.getDate());
          startT = Math.floor(startDate.getTime() / 1000);
          return { start: startT, end: endT};
        case 'startTime':
          startDate.setHours(date.getHours());
          startDate.setMinutes(date.getMinutes());
          startT = Math.floor(startDate.getTime() / 1000);
          return { start: startT, end: endT };
        case 'endDate':
          endDate.setFullYear(date.getFullYear());
          endDate.setMonth(date.getMonth());
          endDate.setDate(date.getDate());
          endT = Math.floor(endDate.getTime() / 1000);
          return { start: startT, end: endT };
        case 'endTime':
          endDate.setHours(date.getHours());
          endDate.setMinutes(date.getMinutes());
          endT = Math.floor(endDate.getTime() / 1000);
          return { start: startT, end: endT };
        }
      })();
      if (start && end && start < end) {
        this.setState({ start, end });
        // this.props.dispatchLoadSrcMacAddresses(start, end);
      } else {
        logger.error("Invalid time window");
      }
    }).bind(this);
  }

  handleChangeType(event, key, value) {
    this.setState({ type: value });
  }

  handleUpdateTimeWindow() {
    const { start, end, type } = this.state;
    this.props.dispatchUpdateTimeWindow(start, end);
    this.props.dispatchUpdateSourceType(type);
  }

  render() {
    const {
      startTime,
      endTime,
      ...props
    } = this.props;

    const fieldWidth = 80;
    const rootStyle = { width: `${fieldWidth}px`, marginRight: `8px` };
    const fieldStyle = { width: `${fieldWidth}px` };

    const startDate = new Date(this.state.start * 1000);
    const endDate = new Date(this.state.end * 1000);
    logger.debug("time window", startDate, endDate);

    return (
      <section className={ classnames('TimeWindow') }>
        <DatePicker
           value={ startDate }
           maxDate={ endDate }
           onChange={ this.handleChangeTimeWindow('startDate') }
           hintText="Start Date"
           style={ rootStyle }
           textFieldStyle={ fieldStyle } />
        <TimePicker
           value={ startDate }
           onChange={ this.handleChangeTimeWindow('startTime') }
           hintText="Start Time"
           style={ rootStyle }
           textFieldStyle={ fieldStyle } />
        <span className={ classnames('sep') }>-</span>
        <DatePicker
           value={ endDate }
           minDate={ startDate }
           onChange={ this.handleChangeTimeWindow('endDate') }
           hintText="End Date"
           style={ rootStyle }
           textFieldStyle={ fieldStyle } />
        <TimePicker
           value={ endDate }
           onChange={ this.handleChangeTimeWindow('endTime') }
           hintText="End Time"
           style={ rootStyle }
           textFieldStyle={ fieldStyle } />
        <RaisedButton label="OK" onClick={ this.handleUpdateTimeWindow.bind(this) } />
      </section>
    );
  }
}

export default connect(stateConnector, dispatchConnector)(TimeWindow);

/*
        <SelectField
           name="macType"
           value={ this.state.type }
           onChange={ this.handleChangeType.bind(this) }>
          <MenuItem value={ "raspi" } primaryText={ "Raspi" } />
          <MenuItem value={ "src" } primaryText={ "Src" } />
        </SelectField>

*/
