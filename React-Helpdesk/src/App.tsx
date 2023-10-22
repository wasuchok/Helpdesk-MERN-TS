
import axios from 'axios'
import { useEffect } from 'react';


//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";


//Home
import Index from "./pages/Home/Index";
import TicketForm from './pages/Home/TicketForm';

//Auth
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

//Redux
import { useDispatch } from "react-redux";

//Function Redux
import { userLogin } from "./redux/slices/userSlice";


//utils
import ProtectedLogin from './utils/ProtectedLogin';
import ProtectedRoute from './utils/ProtectedRoute';
import SidebarUser from './components/SidebarUser';



const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
    const currentUser = async (authtoken: string) => {
      try {
        await axios
          .get(`${import.meta.env.VITE_API}/users/curent_user`, {
            headers: {
              authtoken,
            }, 
          })
          .then((response) => {
            
            if(response.status == 200) {
              dispatch(userLogin({...response.data}))
            }
          });
      } catch (err : any) {
        if (err.response.data == "JWT Expired" || err.response.status == 500) {
          localStorage.removeItem("userinfo");
          dispatch(
            userLogin({
              Username: "",
              Role: 6,
              isLogin: false,
            })
          );
          navigate("/login");
        }
      }
    };
  
      if (localStorage.userinfo) {
        currentUser(localStorage.userinfo);
      }



  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>

        <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="flex">
                <SidebarUser />
                <Index />
                </div>
              </ProtectedRoute>
            }
          />

        <Route
            path="/ticket_form"
            element={
              <ProtectedRoute>
                <div className="flex">
                <SidebarUser />
                <TicketForm />
                </div>
                
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedLogin>
                <Register />
              </ProtectedLogin>
            }
          />

          <Route
            path="/login"
            element={
            <ProtectedLogin>
                <Login />
            </ProtectedLogin>
            }
          />

          {/* End Route User */}

        </Routes>
      </div>
    </>
  );
};

export default App;