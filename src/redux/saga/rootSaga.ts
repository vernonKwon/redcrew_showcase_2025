import { all, fork } from 'redux-saga/effects'
import { watchDecrement, watchIncrement } from './counter'
import { showcaseSaga } from './showcaseSaga'

export default function* rootSaga() {
  yield all([
    fork(watchIncrement), 
    fork(watchDecrement),
    fork(showcaseSaga)
  ])
}
