import React, { Component } from 'react'
import _ from 'lodash'
import MuiSlider from 'material-ui/Slider'

const style = {
  paddingRight: 20,
  paddingLeft: 20,
}

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragStartIndex: 0,
      tmpIndex: 0,
    }
  }
  onDragStartSlider() {
    this.setState({dragStartIndex: this.props.current})
  }
  onChangeSlider(e, value) {
    const { limit, onChange, realTime } = this.props
    this.setState({tmpIndex: value})
    if (value <= limit) {
      if (realTime) {
        onChange(value)
      }
    }
  }
  onDragStopSlider() {
    const { dragStartIndex, tmpIndex } = this.state
    const { limit, onChange } = this.props
    if (tmpIndex !== dragStartIndex) {
      if (tmpIndex <= limit) {
        onChange(tmpIndex)
      } else {
        this.setState({tmpIndex: dragStartIndex})
      }
    }
  }
  render() {
    const { min, max, current, limit, axisLabels, step } = this.props
    return (
      <div>
        <MuiSlider
          min={min}
          max={max}
          value={current}
          step={step}
          style={style}
          onDragStart={this.onDragStartSlider.bind(this)}
          onDragStop={this.onDragStopSlider.bind(this)}
          onChange={this.onChangeSlider.bind(this)}
          />
        <div className="slider-footer">
          { _.map(axisLabels, (label, i) => {
            let className = "item"
            if (limit < i) {
              className = `${className} is-disable`
            }
            return (
              <div key={`item-${i}`} className={className}>
                { label }
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}
