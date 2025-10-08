import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  username: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin (state) {
      state.token = localStorage.getItem('token')
      state.username = localStorage.getItem('username')
    },
  },
})

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer