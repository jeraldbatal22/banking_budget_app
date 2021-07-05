import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    errorMessage: false,
    authId: null
  },
  reducers: {
    loginUser: (state, { payload }) => {
      const isSuccess = payload.isSuccess
      if(isSuccess) {
        state.isAuth = true
        state.authId = payload.authId
        state.errorMessage = false
      } else {
        state.errorMessage = true
        state.isAuth = false
      }
    },
  },
})

export const { loginUser } = AuthSlice.actions
export default AuthSlice.reducer
