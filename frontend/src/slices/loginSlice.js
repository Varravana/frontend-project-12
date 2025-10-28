import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  username: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, { payload }) {
      const { token, username } = payload
      state.token = token
      state.username = username
    },
  },
})

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer
