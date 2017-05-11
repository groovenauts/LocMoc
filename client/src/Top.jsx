import logger from 'js-logger';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import { fn } from './core/util/function';
import { oauthInit, oauth } from './core/google';
import { googeOAuthAction } from './core/google.action';
import TimeWindow from './TimeWindow';
import DataCountGraph from './DataCountGraph';


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

  componentWillMount() {
    oauthInit((authorized) => {
      this.props.dispatchAuth(authorized);
    })
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

    if (authorized) {
      return (
        <div className={ classnames('content') }>
          <h1>Data Viewer</h1>
          <TimeWindow />
          <DataCountGraph />
        </div>
      );
    } else {
      logger.debug(global.gapi.auth);
      return (
        <div className={ classnames('content') }>
          <h1>Data Viewer</h1>
          <div>
            <RaisedButton
               primary={ true }
               onClick={ this.onAuth.bind(this) }>
              <span style={{ color: white }}>Auth</span>
            </RaisedButton>
          </div>
        </div>
      );
    }
  }
}

export default connect(stateConnector, dispatchConnector)(Top);
