import React, { Component } from 'react'
import _ from 'lodash'
import { lightGreen500, lightGreen600 } from 'material-ui/styles/colors'
import { Bar } from 'react-chartjs-2';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/detailActions'
import { DETAIL_CHART_AUTO_RELOAD_INTERVAL } from '../const'
import { timestampToDate, toDoubleDigits } from '../utils/index'


class Detail extends Component {
  componentDidMount() {
    this.props.actions.getCountPerHours()
    this.timer = setInterval(this.tick.bind(this), DETAIL_CHART_AUTO_RELOAD_INTERVAL)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  onClick() {
    this.props.actions.hiddenDetail();
  }
  tick() {
    this.props.actions.getCountPerHours()
  }
  renderChart() {
    const { roomNumber, room } = this.props.detail
    const src = _.get(room, roomNumber)
    const labels = _.map(src, o => {
      const date = timestampToDate(o.t)
      return `${toDoubleDigits(date.getHours())}:${toDoubleDigits(date.getMinutes())}`
    })
    const nums = _.map(src, 'num')
    const data = {
      labels: labels,
      datasets: [
        {
          label: '来場者数',
          data: nums,
          backgroundColor: lightGreen500,
          borderWidth: 0,
          borderColor: lightGreen500,
          pointBorderColor: lightGreen500,
          pointBackgroundColor: lightGreen500,
          hoverBackgroundColor: lightGreen600,
        }
      ]
    }
    return (
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          title: {
            text: 'セッションルームC - 来場者数の遷移',
            display: true,
            fontSize: 40,
            fontFamily: "'Roboto', sans-serif",
            fontColor: 'white',
            fontStyle: 'normal',
            padding: 40,
          },
          legend:{
            display: false,
            defaultFontSize: 6,
            labels: {
              fontColor: 'white',
            }
          },
          tooltips: {
            mode: 'point',
            titleFontSize: 18,
            titleFontStyle: 'normal',
            bodyFontSize: 22,
            bodyFontFamily: "'Roboto', sans-serif",
            bodySpacing: 4,
            displayColors: false,
            cornerRadius: 2,
            xPadding: 10,
            yPadding: 10,
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                },
                ticks: {
                  fontColor: 'black',
                  fontFamily: "'Roboto', sans-serif",
                },
              }
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  drawBorder: false,
                  drawTicks: false,
                  color: 'rgba(255, 255, 255, 0.5)',
                },
                ticks: {
                  fontColor: 'black',
                  fontFamily: "'Roboto', sans-serif",
                },
              }
            ]
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 0
            }
          },
        }}
        />
    )
  }
  render() {
    return (
      <div id="detail">
        <div className="main">
          <div className="header">
            <div className="header-navi"
              onClick={this.onClick.bind(this)}>
              <i className="material-icons">navigate_before</i>
              <span>戻る</span>
            </div>
          </div>
          <div className="content">
            {this.renderChart()}
          </div>
          <div className="footer" />
        </div>
        <div className="sub" style={{display: 'none'}}></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    detail: state.detail,
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
)(Detail)
