import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { runQuery } from './core/bigquery';
import TimeWindow from './TimeWindow';
import {
  $BQ_TEST_QUERY,
  $BQ_SRC_MAC_ADDRESS_LIST_QUERY,
} from './core/queries';

export default class BigQuery extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  runQuery() {
    runQuery($BQ_TEST_QUERY)
      .then(([success, data]) => {
        if (success) {
          this.setState({ data });
        }
      })
  }

  renderData(data) {
    if (_.isEmpty(data)) return null;

    const tableHeader = _.map(data.schema, (field) => {
      return (<th key={ `field-${field.name}` }>{ field.name }</th>);
    });
    const tableRows = _.map(data.rows, (row, i) => {
      return (
        <tr key={ `row-${i}` }>
          <td>{ _.get(row, 'timestamp', "N/A") }</td>
          <td>{ _.get(row, 'raspi_mac', "N/A") }</td>
          <td>{ _.get(row, 'src_mac', "N/A") }</td>
          <td>{ _.get(row, 'rssi', "N/A") }</td>
        </tr>
      );
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              { tableHeader }
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </table>
      </div>
    );
  }

  renderMacAddressList(macAddresses) {

  }

  render() {
    const { authorized, ...props } = this.props;
    if (!authorized) return null;

    const { data, macAddresses } = this.state;

    return (
      <div>
        <h2>BigQuery</h2>
        <TimeWindow />
        <div>
          <button onClick={ this.runQuery.bind(this) }>run query</button>
        </div>
        { this.renderData(data) }
        { this.renderMacAddressList(macAddresses) }
      </div>
    );
  }
}
