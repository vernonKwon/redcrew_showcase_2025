import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import logger from 'redux-logger'
import createSagaMiddleware, { Task } from 'redux-saga'
import SERVICE_MODE from '@/enum/serviceMode'
import rootReducer from './reducer/rootReducer'
import rootSaga from './saga/rootSaga'

export interface SagaStore extends ReturnType<typeof makeStore> {
  sagaTask?: Task
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false, // saga를 사용하므로 thunk 비활성화
        serializableCheck: {
          // HYDRATE 액션을 위해 직렬화 체크에서 제외
          ignoredActions: ['__NEXT_REDUX_WRAPPER_HYDRATE__'],
        },
      })
        .concat(sagaMiddleware)
        .concat(process.env.NODE_ENV === SERVICE_MODE.DEV ? [logger] : [])
    },
    devTools: process.env.NODE_ENV !== SERVICE_MODE.LIVE,
  })

  ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

// 타입 추론
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === SERVICE_MODE.DEV,
})
