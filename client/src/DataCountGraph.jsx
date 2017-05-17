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
import {
  bqLoadRaspiRequestCountAction,
  bqLoadSrcRequestCountAction,
} from './core/bq.action';

export function stateConnector(state) {
  let type = _.get(state, 'bq.type', 'raspi');
  return {
    startTime: _.get(state, 'bq.timeWindow.start', null),
    endTime: _.get(state, 'bq.timeWindow.end', null),
    sourceType: type,
    data: (() => {
      switch (type) {
      case 'src': return _.get(state, 'data.srcRequestCount', []);
      default: return _.get(state, 'data.raspiRequestCount', []);
      }
    })()
  };
}

export function dispatchConnector(dispatch) {
  return {
    dispatchLoadRequestCount: (type, start, end, callback) => {
      switch (type) {
      case 'src':
        dispatch(bqLoadSrcRequestCountAction(start, end, callback));
        break;
      default:
        dispatch(bqLoadRaspiRequestCountAction(start, end, callback));
        break;
      }
    },
  };
}

export class DataCountGraph extends React.Component {

  static propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    sourceType: PropTypes.string,
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
    this.handleLoadRequestCount({ start: this.props.startTime, end: this.props.endTime }, this.props.sourceType);
  }

  componentDidMount() {
    this.genC3();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime !== this.props.startTime
        || nextProps.endTime !== this.props.endTime
        || nextProps.sourceType !== this.props.sourceType) {
      this.handleLoadRequestCount({ start: nextProps.startTime, end: nextProps.endTime }, nextProps.sourceType);
    }
  }

  handleLoadRequestCount(win, type) {
    const { start, end } = win;
    fn(this.props.dispatchLoadRequestCount)(type, start, end, this.handleLoadedRequestCount.bind(this));
  }

  handleLoadedRequestCount(success, data) {
    logger.debug("handleLoadedRequestCount");
    if (success) {
      const { startTime: start, endTime: end, sourceType, data } = this.props;
      let { columns, groups } = reshapeDataRequestCount(data, start, end, sourceType);
      if (!this.c3) {
        this.genC3();
      }

      this.c3.load({ columns: columns });
      this.c3.groups(groups);
      this.setState({ columns: columns, groups: groups });
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

  render() {
    return (
      <section>
        <div id="requestCountBarChart"></div>
      </section>
    )
  }
}

export default connect(stateConnector, dispatchConnector)(DataCountGraph);
