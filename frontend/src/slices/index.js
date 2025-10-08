import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice.js'
import channelsReducer from './channelsSlice.js'

//общее хранилище сюда все редьюсеры

export default configureStore({
  reducer: {
    'login': loginReducer,
    'channels': channelsReducer,
  },
});
