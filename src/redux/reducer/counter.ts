import { createAction, createReducer } from '@reduxjs/toolkit'

export interface CounterState {
  isLoading: boolean
  isDone: boolean
  number: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error | null
}

export const initialState: CounterState = {
  isLoading: false,
  isDone: false,
  number: 0,
  error: null,
}

export const increment = createAction<undefined>('counter/increment')
export const incrementSuccess = createAction<undefined>(
  'counter/incrementSuccess',
)
export const incrementFailure = createAction<Error>('counter/incrementFailure')
export const decrement = createAction<undefined>('counter/decrement')
export const decrementSuccess = createAction<undefined>(
  'counter/decrementSuccess',
)
export const decrementFailure = createAction<Error>('counter/decrementFailure')

const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state) => {
    state.isLoading = true
    state.isDone = false
    state.error = null
  })
  builder.addCase(incrementSuccess, (state) => {
    state.isLoading = false
    state.isDone = true
    state.number += 1
  })
  builder.addCase(incrementFailure, (state, action) => {
    state.isLoading = false
    state.isDone = false
    state.error = action.payload
  })
  builder.addCase(decrement, (state) => {
    state.isLoading = true
    state.isDone = false
    state.error = null
  })
  builder.addCase(decrementSuccess, (state) => {
    state.isLoading = false
    state.isDone = true
    state.number -= 1
  })
  builder.addCase(decrementFailure, (state, action) => {
    state.isLoading = false
    state.isDone = false
    state.error = action.payload
  })
})

export default counterReducer
