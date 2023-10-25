import React, { ReactNode } from 'react'



import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Redirect from './Redirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedLogin : React.FC<ProtectedTypes> = ({ children }) => {
    const { userinfo } = useSelector((state : RootState) => state.user)

    return userinfo && userinfo.Role != 0 ? <Redirect To="/" /> : children 
}

export default ProtectedLogin