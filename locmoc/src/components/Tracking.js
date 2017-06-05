import React, { Component } from 'react'
import { blueA200, blue900 } from 'material-ui/styles/colors'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/trackingActions'
import Slider from './Slider'
import { dateToTimestamp } from '../utils/index'

const lowerCase = macAddr => _.replace(macAddr, /[A-Z]/g, ch => String.fromCharCode(ch.charCodeAt(0) | 32));
const validation = macAddr => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(macAddr);
const POINTER_SIZE = 12
const POINTER_SIZE_ACTIVE = 20

class Tracking extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
    if (this._content) {
      this.props.actions.resizeContent(this._content.offsetWidth, this._content.offsetHeight)
    }
    if (this._header) {
      this.props.actions.resizeHeader(this._header.offsetWidth, this._header.offsetHeight)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize(e) {
    if (this._content) {
      this.props.actions.resizeContent(this._content.offsetWidth, this._content.offsetHeight)
    }
    if (this._header) {
      this.props.actions.resizeHeader(this._header.offsetWidth, this._header.offsetHeight)
    }
  }
  onChangeSlider(value) {
    this.props.actions.changeSlider(value)
  }
  onPointSelect(value) {
    this.props.actions.selectPoint(value)
  }
  onChangeText(e) {
    this.props.actions.changeText(lowerCase(e.target.value))
  }
  onSearch() {
    const { macAddr } = this.props.tracking
    this.props.actions.search(macAddr)
  }
  render() {
    const { map, timeMap, sliderMap, limitIndex, header, macAddr, currentIndex, predictions, isProgress } = this.props.tracking
    const validMacAddr = validation(macAddr)
    let activeIndex = -1
    const point = _.find(sliderMap, o => o.sliderStart <= currentIndex && o.sliderEnd > currentIndex)
    if (point) {
      activeIndex = point.predictionIndex
    }
    return (
      <div>
        <header ref={c => this._header = c}>
          <div className="header-wrap">
            <input
              className="input"
              type="text"
              value={macAddr || ''}
              placeholder="Wi-Fi mac address"
              onChange={this.onChangeText.bind(this)}
            />
            <button className="button" type="button" onClick={this.onSearch.bind(this)}>
              Search
            </button>
          </div>
        </header>
        <main className="content-wrap" ref={c => this._content = c}>
          <div className="content"
            style={{
              width: map.width,
            }}>
            <div className="overallmap"
              style={{
                height: map.height,
                width: map.width,
              }} />
            { _.map(predictions, (o, i) => {
              const active = activeIndex === i
              const size = active ? POINTER_SIZE_ACTIVE : POINTER_SIZE
              const zIndex = i + (active ? 1000 : 0)
              return (
                <div key={`point-${i}`}
                  onClick={this.onPointSelect.bind(this, i)}
                  style={{
                    zIndex: zIndex,
                    position: 'absolute',
                    height: size,
                    width: size,
                    borderRadius: size/2,
                    backgroundColor: active ? blue900 : blueA200,
                    left: o.x - (size/2),
                    top: o.y - (size/2),
                  }}
                />
              )
            }) }
          </div>
        </main>
        <footer>
          <div className="box">
            <div className="box-left"/>
            <div className="box-center">
              <Slider
                min={0}
                max={_.size(timeMap) > 0 ? _.size(timeMap)-1 : 1}
                current={currentIndex}
                limit={limitIndex}
                axisLabels={_.map(timeMap, o => o.date.getHours())}
                onChange={this.onChangeSlider.bind(this)}
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
    tracking: state.tracking,
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
)(Tracking)
