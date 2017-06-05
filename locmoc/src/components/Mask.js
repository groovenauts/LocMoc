import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { blueA200 } from 'material-ui/styles/colors'

export default class Mask extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isShow !== nextProps.isShow
  }
  render() {
    const { isShow } = this.props
    const size = 80
    if  (isShow) {
      return (
        <div className="mask">
          <CircularProgress
            style={{
              top: `calc(50% - ${size/2}px`
            }}
            size={size}
            color={blueA200}
            />
        </div>
      )
    }
    return null
  }
}
