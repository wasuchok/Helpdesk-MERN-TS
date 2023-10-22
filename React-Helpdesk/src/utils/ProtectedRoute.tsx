import React, { ReactNode } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import LoadingToRedirect from './LoadingToRedirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))


  return userinfo && userinfo.Username ? children : <LoadingToRedirect To="/login" Msg="คุณไม่มีสิทธิ์เข้าถึง" />
}

export default ProtectedRoute