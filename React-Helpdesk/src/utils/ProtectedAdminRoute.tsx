import React, { ReactNode } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Redirect from './Redirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedAdminRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))


  return userinfo && userinfo.Role == 1 ? children : userinfo.Role != 1 && userinfo.Role != 6 ? <Redirect To="/technician" /> : <Redirect To="/" />
}

export default ProtectedAdminRoute