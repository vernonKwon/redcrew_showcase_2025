import { call, put, takeEvery } from 'redux-saga/effects'
import { submitContactStart, submitContactSuccess, submitContactFailure } from '@/redux/reducer/showcaseSlice'

// API 호출 함수
async function submitContactAPI(): Promise<void> {
  // 실제 API 호출을 시뮬레이션
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% 확률로 성공
      if (Math.random() > 0.1) {
        resolve()
      } else {
        reject(new Error('서버 오류가 발생했습니다.'))
      }
    }, 1000)
  })
}

function* submitContactSaga(_action: ReturnType<typeof submitContactStart>) {
  try {
    yield call(submitContactAPI)
    yield put(submitContactSuccess())
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    yield put(submitContactFailure(errorMessage))
  }
}

export function* showcaseSaga() {
  yield takeEvery(submitContactStart.type, submitContactSaga)
}

export default showcaseSaga