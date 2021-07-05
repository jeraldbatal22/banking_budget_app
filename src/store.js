import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './redux-slice/UserSlice'
import AuthSlice from './redux-slice/AuthSlice'

const store = configureStore({
  reducer: {
    users: UserSlice,
    auth: AuthSlice
  },
})

export default store
