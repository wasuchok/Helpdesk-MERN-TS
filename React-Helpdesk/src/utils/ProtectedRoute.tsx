import React, { ReactNode } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Redirect from './Redirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))

  return userinfo && userinfo.Role == 6 ? children : userinfo && userinfo.Role != 0 && userinfo.Role == 1 ? <Redirect To="/admin"  /> : userinfo.Role != 1 && userinfo.Role != 0 && userinfo.Role != 6 ? <Redirect To="/technician"  /> : <Redirect To="/login"  />
}

export default ProtectedRoute