import React, { ReactNode } from 'react'




import LoadingToRedirect from './LoadingToRedirect'
import { useUserStore } from '../store/userStore'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedLogin : React.FC<ProtectedTypes> = ({ children }) => {
    const {userinfo} = useUserStore()

    return userinfo && userinfo.Email ? <LoadingToRedirect To="/" Msg="คุณล็อกอินไปแล้วรู้มั้ย " /> : children 
}

export default ProtectedLogin