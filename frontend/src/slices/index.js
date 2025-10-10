import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import curentChannelReduser from './curentChannelSlice.js'

//общее хранилище сюда все редьюсеры

export default configureStore({
  reducer: {
    'login': loginReducer,
    'channels': channelsReducer,
    'messages': messagesReducer ,
    'curentChannel': curentChannelReduser
  },
});
