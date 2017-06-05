import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import ReactHeatmap from 'react-heatmap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/mapActions'
import { HEATMAP_MAX_INTENSITY, HEATMAP_INTENSITY, HEATMAP_AUTO_RELOAD_INTERVAL } from '../const'
import Slider from './Slider'

class Heatmap extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.props.actions.check2ndDay()
    if (this._content) {
      this.props.actions.resizeContent(this._content.offsetWidth, this._content.offsetHeight)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { timeMap, limitIndex } = nextProps.map
    if (!this.props.map.timeMap && timeMap && limitIndex !== -1) {
      this.props.actions.getPredictionsPerHours(timeMap[limitIndex].date)
      this.timer = setInterval(this.tick.bind(this), HEATMAP_AUTO_RELOAD_INTERVAL)
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize(e) {
    if (this._content) {
      this.props.actions.resizeContent(this._content.offsetWidth, this._content.offsetHeight)
    }
  }
  tick() {
    const { timeMap, currentIndex, limitIndex } = this.props.map
    if (currentIndex === limitIndex) {
      this.props.actions.getPredictionsPerHours(timeMap[currentIndex].date)
    }
  }
  onChange(value) {
    const { timeMap, limitIndex } = this.props.map
    this.props.actions.getPredictionsPerHours(timeMap[value].date)
    if (value === limitIndex) {
      // start auto reload
      clearInterval(this.timer)
      this.timer = setInterval(this.tick.bind(this), HEATMAP_AUTO_RELOAD_INTERVAL)
    } else {
      // stop auto reload
      clearInterval(this.timer)
    }
  }
  render() {
    const { map, predictions, timeMap, currentIndex, limitIndex } = this.props.map
    return (
      <div>
        <header></header>
        <main className="content-wrap" ref={c => this._content = c}>
          <div className="content"
              style={{
                width: _.get(map, 'width', 0),
              }}>
            <div
              className="heatmap"
              style={{
                height: _.get(map, 'height', 0),
                width: _.get(map, 'width', 0),
              }} />
            <div style={{
              height: _.get(map, 'height', 0),
              width: _.get(map, 'width', 0),
            }}>
              { _.size(predictions) > 0 ? 
                <ReactHeatmap
                  max={HEATMAP_MAX_INTENSITY}
                  data={_.map(predictions, o => _.defaults(_.pick(o, ['x', 'y']), {value: HEATMAP_INTENSITY}))}
                  unit='pixels'
                  />
                : null
              }
            </div>
          </div>
        </main>
        <footer>
          <div className="box">
            <div className="box-left"/>
            <div className="box-center">
              <Slider
                min={0}
                max={_.size(timeMap) > 0 ? _.size(timeMap)-1 : 1}
                step={1}
                current={currentIndex}
                limit={limitIndex}
                axisLabels={_.map(timeMap, o => o.date.getHours())}
                onChange={this.onChange.bind(this)}
                />
            </div>
            <div className="box-right"/>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    map: state.map,
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
)(Heatmap)
