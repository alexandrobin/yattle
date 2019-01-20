import React from 'react'
import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import './pomodoro.scss'

const STATE = {
  init: {
    name: 'INIT',
  },
  ongoing: {
    name: 'ONGOING',
  },
  paused: {
    name: 'PAUSED',
  },
}

class Pomodoro extends React.Component {
	state={
	  length: 25 * 60,
	  session: {
	    min: 25,
	    sec: 0,
	  },
	  step: STATE.init,
	  interval: null,
	  counter: 0,
	}

	clock = (length) => {
	  length--
	  const sec = length % 60
	  const min = Math.floor(length / 60)
	  this.setState({
	    length,
	    session: { min, sec },
	  })
	}

  tick = () => {
    const interval = setInterval(() => this.clock(this.state.length), 1000)
    this.setState({
      interval,
    })
  }

	toggle = () => {
	  let { interval, step } = this.state
	  if (step === STATE.init) {
	    step = STATE.ongoing
	    this.tick()
	  } else if (step === STATE.ongoing) {
	    step = STATE.paused
	    clearInterval(interval)
	  } else if (step === STATE.paused) {
	    step = STATE.ongoing
	    this.tick(step)
	  }
	  this.setState({ step })
	}

	pad = (t) => {
	  t = `${t}`
	  return (t.length < 2 ? '0' : '') + t
	}

	render() {
	  return (
  <React.Fragment>
    <div className="clock">
      {this.pad(this.state.session.min)}
          :
      {this.pad(this.state.session.sec)}
      <FontAwesomeIcon
        icon={
        this.state.step === STATE.ongoing ? ['fas', 'pause'] : ['fas', 'play']
      }
        onClick={
        this.toggle
      }
        className="icon"
      />

    </div>
  </React.Fragment>
	  )
	}
}


export default Pomodoro
