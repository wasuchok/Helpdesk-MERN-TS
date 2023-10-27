import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: number[]; 
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const { userinfo } = useSelector((state: RootState) => state.user);

  const isAuthorized = allowedRoles.includes(userinfo.Role);

  useEffect(() => {
    if (!isAuthorized) {
      switch (userinfo.Role) {
        case 1:
          navigate('/admin');
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          navigate('/technician');
          break;
          case 6 :
            navigate('/');
            break;
        default:
          navigate('/login');
      }
    }
  }, [isAuthorized, userinfo.Role, navigate]);

  return isAuthorized ? children : <div>No Access</div>;
};

export default ProtectedRoute;
