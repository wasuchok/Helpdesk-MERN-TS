import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
    UserID? : number
    Username: string;
    Email? : string
    Role : number
}

interface UserState {
  userinfo: UserInfo;
}

const initialState: UserState = {
  userinfo : {
    Username : "",
    Role : 0,
  }
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userLogin: (state : UserState, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload
    },
    logOut : (state : UserState) => {
      localStorage.removeItem('userinfo')
      state.userinfo = {
        Username : "",
        Role : 0,
      }
    }
  },
})


export const { userLogin, logOut } = userSlice.actions

export default userSlice.reducer