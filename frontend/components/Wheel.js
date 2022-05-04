import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props
  const totalWheels = 6
  const clockwiseHandler = () => {
    moveClockwise()
  }
  const counterClockwiseHandler = () =>{
    moveCounterClockwise()
  }

  return (
    <div id="wrapper">
      <div id="wheel">
      {[...Array(totalWheels)].map((_, i) =>
          <div key={i} className={i === wheel ? "cog active" : "cog"} style={{ "--i": i }}>{i === wheel ? "B" : null}</div>
        )}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockwiseHandler}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clockwiseHandler}>Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}
export default connect(mapStateToProps, actionCreators)(Wheel)