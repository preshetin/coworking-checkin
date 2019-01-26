import React from 'react'
import { getHumanReadableDuration } from '../../utils'
import moment from 'moment'

class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      elapsed: 0
    }
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick = () => {
    this.setState({ elapsed: new Date() - this.props.start })
  }

  render () {
    // Calculate elapsed to tenth of a second:
    var elapsed = Math.round(this.state.elapsed / 100)
    // This will give a number with one digit after the decimal dot (xx.x):
    var seconds = (elapsed / 10).toFixed(0)

    const duration = moment.duration(parseInt(seconds), 'seconds')

    return <b>{getHumanReadableDuration(duration)}</b>
  }
};

export default Timer
