import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export function stateConnector(state) {
  return {
  };
}

export function dispatchConnector(dispatch) {
  return {
  };
}

export class Root extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const {
      children,
      ...props
    } = this.props;
    return (
      <div id="wrapper">
        <main>
          { children }
        </main>
      </div>
    );
  }
}

export default connect(stateConnector, dispatchConnector)(Root);
