import { createAction, createReducer } from '@reduxjs/toolkit'

export interface UserState {
  name: string
  isLoggedIn: boolean
}
const initialState: UserState = {
  name: 'hyejin',
  isLoggedIn: false,
}

export const changeNickname = createAction<string>('user/changeNickname')

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeNickname, (state, action) => {
    state.name = action.payload
  })
})

export default userReducer
