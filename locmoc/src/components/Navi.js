import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/naviActions'

class Navi extends Component {
  onClick(i, e) {
    this.props.actions.select(i)
  }
  render() {
    const { index } = this.props.navi
    const menuItems = ["ヒートマップを見る", "エリア毎の人の流れを見る", "人の動きを見る"]
    return (
      <nav className="col-1">
        <div className="next-icon"></div>
        <ui>
          { _.map(menuItems, (item, i) => {
            return (
              <li key={`item-${i}`}
                onClick={this.onClick.bind(this, i)}
                className={`${index === i ? 'is-select':''}`}
                >
                { item }
              </li>
            )
          }) }
        </ui>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
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
)(Navi)
