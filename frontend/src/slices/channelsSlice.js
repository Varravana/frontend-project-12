import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {1:{ id: '1', name: 'general', removable: false }},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addChannel(state, {payload}) {
      state.ids.push(payload.id)
      state.entities[payload.id] = payload
    }
  },
})

export const { setChannels, addChannel } = channelsSlice.actions
export default channelsSlice.reducer