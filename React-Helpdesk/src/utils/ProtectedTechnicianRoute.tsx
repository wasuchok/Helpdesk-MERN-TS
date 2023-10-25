import React, { ReactNode } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Redirect from './Redirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedTechnicianRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))


  return userinfo && userinfo.Role != 6 ? children :  <Redirect To="/"  />
}

export default ProtectedTechnicianRoute