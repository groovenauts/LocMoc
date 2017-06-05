import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/naviActions'
import Heatmap from '../components/Heatmap'
import Summary from '../components/Summary'
import Tracking from '../components/Tracking'

class Main extends Component {
  render() {
    const { index } = this.props.navi
    const component = index === 1 ? <Summary /> : index === 2 ? <Tracking /> : <Heatmap />
    return (
      <div className="col-2">
        { component }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    navi: state.navi,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
