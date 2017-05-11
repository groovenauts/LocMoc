import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import strftime from 'strftime';
// import { Chart } from 'react-google-charts';
import C3Chart from 'react-c3js';
import c3 from 'c3';
import 'c3/c3.css'
import { fn } from './core/util/function';
import { reshapeDataRequestCount } from './core/data';
import { bqLoadRequestCountAction } from './core/bq.action';

export function stateConnector(state) {
  return {
    startTime: _.get(state, 'bq.timeWindow.start', null),
    endTime: _.get(state, 'bq.timeWindow.end', null),
    data: _.get(state, 'data.requestCount', []),
  };
}

export function dispatchConnector(dispatch) {
  return {
    dispatchLoadRequestCount: (start, end, callback) => {
      dispatch(bqLoadRequestCountAction(start, end, callback));
    },
  };
}

export class DataCountGraph extends React.Component {

  static propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    data: PropTypes.shape({
      schema: PropTypes.array,
      rows: PropTypes.array,
    }),
    dispatchLoadRequestCount: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      columns: [['x']],
      groups: [],
    };

    this.c3 = null;
  }

  componentWillMount() {
    this.handleLoadRequestCount({ start: this.props.startTime, end: this.props.endTime });
  }

  componentDidMount() {
    this.genC3();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime !== this.props.startTime
        || nextProps.endTime !== this.props.endTime) {
      this.handleLoadRequestCount({ start: nextProps.startTime, end: nextProps.endTime });
    }
  }

  genC3() {
    this.c3 = c3.generate({
      bindto: "#requestCountBarChart",
      data: {
        x: 'x',
        columns: this.state.columns,
        type: "bar",
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: (x) => { return strftime("%m/%d %H:%M:%S", x) },
            rotate: 60,
          }
        }
      },
    });
  }

  handleLoadRequestCount(win) {
    const { start, end } = win;
    fn(this.props.dispatchLoadRequestCount)(start, end, this.handleLoadedRequestCount.bind(this));
  }

  handleLoadedRequestCount(success, data) {
    if (success) {
      const { startTime: start, endTime: end, data } = this.props;
      let { columns, groups } = reshapeDataRequestCount(data, start, end);
      if (!this.c3) {
        this.genC3();
      }

      this.c3.load({ columns: columns });
      this.c3.groups(groups);
      this.setState({ columns: columns, groups: groups });
    }
  }

  render() {
    return (
      <section>
        <div id="requestCountBarChart"></div>
      </section>
    )
  }
}

export default connect(stateConnector, dispatchConnector)(DataCountGraph);
