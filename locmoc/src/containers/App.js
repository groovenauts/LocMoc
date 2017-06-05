import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/appActions'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navi from '../components/Navi'
import Main from '../components/Main'
import Detail from '../components/Detail'
import Mask from '../components/Mask'

injectTapEventPlugin();

class App extends Component {
  componentWillMount() {
    this.props.actions.init()
  }
  render() {
    const { app, detail } = this.props
    if (detail.isShow) {
      return (
        <div id="app">
          <Detail />
        </div>
      )
    } else {
      return (
        <div id="app">
          <Navi />
          <Main />
          <Mask isShow={app.progress}/>
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    app: state.app,
    detail: state.detail,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
App.PropTypes = {
  app: PropTypes.object.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
