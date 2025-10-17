import { all, fork } from 'redux-saga/effects'
import { watchDecrement, watchIncrement } from './counter'

export default function* rootSaga() {
  yield all([fork(watchIncrement), fork(watchDecrement)])
}
