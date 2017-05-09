import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BigQuery from './BigQuery';
import { oauth } from './core/google';
import { googeOAuthAction } from './core/google.action';

export function stateConnector(state) {
  return {
    authorized: _.get(state, 'google.authorized', false),
  };
}

export function dispatchConnector(dispatch) {
  return {
    dispatchAuth: (auth) => { dispatch(googeOAuthAction(auth)) },
  };
}

export class Top extends React.Component {

  static propTypes = {
    dispatchAuth: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
  }

  onAuth() {
    oauth(this.onAuthed.bind(this));
  }

  onAuthed(auth) {
    if (_.isFunction(this.props.dispatchAuth)) {
      this.props.dispatchAuth(auth);
    }
  }


  render() {
    const {
      authorized,
      ...props
    } = this.props;

    return (
      <div className={ classnames('content') }>
        <h1>Data Viewer</h1>
        <div>
          <button onClick={ this.onAuth.bind(this) }>Auth</button>
        </div>
        <BigQuery authorized={ authorized } />
      </div>
    );
  }
}

export default connect(stateConnector, dispatchConnector)(Top);
