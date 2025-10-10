import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '1',
}

const curentChannelSlice = createSlice({
  name: 'curentChannel',
  initialState,
  reducers: {
    setcurentChannel (state, { payload }) {
        const { id } = payload;
      state.id = id
    },
  },
})

export const { setcurentChannel } = curentChannelSlice.actions
export default curentChannelSlice.reducer