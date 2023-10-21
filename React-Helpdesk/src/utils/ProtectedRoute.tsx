import React, { ReactNode } from 'react'

import LoadingToRedirect from './LoadingToRedirect'

import { useUserStore } from '../store/userStore'

interface ProtectedTypes {
    children : ReactNode
}

const UserRoute : React.FC<ProtectedTypes> = ({ children }) => {
    const { userinfo } = useUserStore();


  return userinfo && userinfo.Email ? children : <LoadingToRedirect To="/login" Msg="คุณไม่มีสิทธิ์เข้าถึง" />
}

export default UserRoute