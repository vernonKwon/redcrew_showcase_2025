/* eslint-disable @typescript-eslint/indent */
import { combineReducers, UnknownAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import user from '@/redux/reducer/user'
import counterReducer from '@/redux/reducer/counter'
import showcaseReducer from '@/redux/reducer/showcaseSlice'

const combinedReducer = combineReducers({
  user,
  counter: counterReducer,
  showcase: showcaseReducer,
})

export type RootState = ReturnType<typeof combinedReducer>

interface HydrateAction extends UnknownAction {
  type: typeof HYDRATE
  payload: RootState
}

const rootReducer = (
  state: RootState | undefined,
  action: UnknownAction,
): RootState => {
  if (action.type === HYDRATE) {
    const hydrateAction = action as HydrateAction
    // eslint-disable-next-line no-console
    console.log('🔶 HYDRATE 액션 발생!')
    // eslint-disable-next-line no-console
    console.log('  📍 이전 클라이언트 상태:', state)
    // eslint-disable-next-line no-console
    console.log('  📦 서버에서 온 상태:', hydrateAction.payload)

    const nextState = {
      ...state, // 기존 클라이언트 상태
      ...hydrateAction.payload, // 서버에서 온 상태
    }

    // 필요한 경우 특정 상태만 선택적으로 병합
    // 예: 클라이언트 상태를 유지하고 싶은 경우
    // if (state?.user) {
    //   nextState.user = state.user
    // }

    // eslint-disable-next-line no-console
    console.log('  ✅ 병합된 새로운 상태:', nextState)
    // eslint-disable-next-line no-console
    console.log('🔶 HYDRATE 완료!')

    return nextState
  }

  return combinedReducer(state, action)
}

export default rootReducer
