import React, { Component } from 'react'
import _ from 'lodash'
import { Line } from 'react-chartjs-2';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { lightGreen500 } from 'material-ui/styles/colors'
import * as summaryActions from '../actions/summaryActions'
import * as detailActions from '../actions/detailActions'
import { SUMMARY_CHART_AUTO_RELOAD_INTERVAL } from '../const'
import { timestampToDate } from '../utils/index'
import { realPosition } from '../const/position'

class Summary extends Component {
  componentDidMount() {
    this.props.actions.getCountPerRoom()
    this.timer = setInterval(this.tick.bind(this), SUMMARY_CHART_AUTO_RELOAD_INTERVAL)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  onClick(roomNumber, e) {
    this.props.actions.showDetail(roomNumber)
  }
  tick() {
    this.props.actions.getCountPerRoom()
  }
  renderChart(roomNumber) {
    const { room } = this.props.summary
    const src = _.get(room, roomNumber)
    const labels = _.map(src, o => {
      const date = timestampToDate(o.t)
      return `${date.getHours()}:${date.getMinutes()}`
    })
    const nums = _.map(src, 'num')
    const data = {
      labels: labels,
      datasets: [
        {
          data: nums,
          fill: false,
          lineTension: 0.1,
          borderColor: lightGreen500,
          pointRadius: 1,
          pointBackgroundColor: lightGreen500,
          pointBorderColor: lightGreen500,
        }
      ]
    }
    return (
      <Line
        options={{
          maintainAspectRatio: false,
          legend:{
            display: false,
            defaultFontSize: 4,
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                },
              }
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                },
              }
            ]
          },
          tooltips: {
            enabled: false,
          }
        }}
        data={data}
        />
    )
  }
  render() {
    return (
      <div className="summary">
        <table>
          <tbody>
          { _.map(realPosition.rooms, (o, i) => {
            return (
              <tr key={`tr-${i}`}
                onClick={this.onClick.bind(this, o.roomNumber)}>
                <td className="title">{ o.label }</td>
                <td className="chart">{ this.renderChart(o.roomNumber) }</td>
                <td className="time">12:00〜</td>
                <td className="sub">ビッグデータ＆機会学習</td>
                <td className="speaker">株式会社グルーヴノーツ　最首英裕</td>
                <td><i className="material-icons">navigate_next</i></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    summary: state.summary,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(_.assign({}, summaryActions, detailActions), dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)
