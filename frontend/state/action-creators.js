// ❗ You don't need to add extra action creators to achieve MVP
import{
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types"

import axios from "axios"
import { createResponseComposition } from "msw"

const URL = 'http://localhost:9000/api/quiz'

export function moveClockwise() { 
  return { 
    type: MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() {  
  return { 
    type: MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer(answerId) { 
  return { 
    type: SET_SELECTED_ANSWER, 
    payload: answerId
  }
 }

export function setMessage(message) { 
  return {
    type: SET_INFO_MESSAGE, 
    payload: message
  }
 }

export function setQuiz(quiz) { 
  return {
    type: SET_QUIZ_INTO_STATE, 
    payload: quiz
  }
}

export function inputChange({id, value}) {
  return { 
    type: INPUT_CHANGE, 
    payload: {id, value}
  }
 }

export function resetForm() {
  return {
    type: RESET_FORM
  }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null))
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`${URL}/next`)
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err=>{
      console.error(err)
      dispatch(setMessage(err.message))
    })
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    axios.post(`${URL}/answer`, {quiz_id, answer_id})
    .then(res=>{
      dispatch(selectAnswer(null))
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err=>{
      console.error(err)
      dispatch(setMessage(err.message))
    })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    const payload = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
    }
    axios.post(`${URL}/new`, payload)
    // On successful POST:
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err =>{
      console.error(err)
      dispatch(setMessage(err.message))
    })
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
