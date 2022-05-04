import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const {form, inputChange, postQuiz } = props
  
  const onChange = evt => {
    const {id, value} = evt.target
    inputChange({id, value})
  }
  const formValid = () => {
    return Object.values(form).every(inputValues => inputValues.trim().length > 0)
  }
  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={form.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!formValid()}>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
