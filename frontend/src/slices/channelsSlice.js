import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChanals(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
})

export const { actions } = channelsSlice.actions
export default channelsSlice.reducer