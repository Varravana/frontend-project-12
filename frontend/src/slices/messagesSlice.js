import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      const { entities, ids } = payload
      state.entities = entities
      state.ids = ids
    },
    addMessage(state, { payload }) {
      state.ids.push(payload.id)
      state.entities[payload.id] = payload
    },
  },
})

export const { setMessages, addMessage } = messagesSlice.actions
export default messagesSlice.reducer
