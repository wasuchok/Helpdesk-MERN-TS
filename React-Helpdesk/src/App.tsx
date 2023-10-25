
import axios from 'axios'


//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//Admin
import Admin from './pages/Admin/Index';
import ViewTicket from './pages/Admin/ViewTicket'

//Technician
import Technician from './pages/Technician/Index'


//User
import Index from "./pages/Home/Index";
import TicketForm from './pages/Home/TicketForm';
import ViewTicketUser from './pages/Home/ViewTicketUser';

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
import ProtectedAdminRoute from './utils/ProtectedAdminRoute';
import SidebarAdmin from './components/SidebarAdmin';
import SidebarTechnician from './components/SidebarTechnician';
import ProtectedTechnicianRoute from './utils/ProtectedTechnicianRoute';


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
        if (err.response.data == "JWT Expire") {
          localStorage.removeItem("userinfo");
          dispatch(
            userLogin({
              Username: "",
              Role: 0,
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
            path="/view_ticket/:id"
            element={
              <ProtectedRoute>
                <div className="flex">
                <SidebarUser />
                <ViewTicketUser />
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

          {/* Start Route Admin */}

          <Route
            path="/admin/"
            element={
              <ProtectedAdminRoute>
                <div className="flex">
                  <SidebarAdmin />
                <Admin />
                </div>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/view_ticket/:id"
            element={
              <ProtectedAdminRoute>
                <div className="flex">
                  <SidebarAdmin />
                <ViewTicket />
                </div>
              </ProtectedAdminRoute>
            }
          />

          {/* End Route Admin */}

          {/* Start Route Technician */}

          <Route
            path="/technician/"
            element={
              <ProtectedTechnicianRoute>
                <div className="flex">
                  <SidebarTechnician />
                <Technician />
                </div>
              </ProtectedTechnicianRoute>
            }
          />

          {/* End Route Technician */}

        </Routes>
      </div>
    </>
  );
};

export default App;