import { delay, put, takeLatest } from 'redux-saga/effects'
import {
  decrement,
  decrementFailure,
  decrementSuccess,
  increment,
  incrementFailure,
  incrementSuccess,
} from '@/redux/reducer/counter'

function* incrementSaga() {
  try {
    yield delay(1000)
    yield put(incrementSuccess())
  } catch (err) {
    if (err instanceof Error) {
      yield put(incrementFailure(err))
    }
  }
}

export function* watchIncrement() {
  yield takeLatest(increment, incrementSaga)
}

function* decrementSaga() {
  try {
    yield put(decrementSuccess())
  } catch (err) {
    if (err instanceof Error) {
      yield put(decrementFailure(err))
    }
  }
}

export function* watchDecrement() {
  yield takeLatest(decrement, decrementSaga)
}
