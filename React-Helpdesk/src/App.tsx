
import axios from 'axios'


//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//Admin
import Admin from './pages/Admin/Index';
import ViewTicket from './pages/Admin/ViewTicket'
import HistoryReport from './pages/Admin/HistoryReport';
import Dashboard from './pages/Admin/Dashboard';

//Technician
import Technician from './pages/Technician/Index'
import ViewTicketTechnician from './pages/Technician/ViewTicketTechnician';
import HistoryReportByTechnician from './pages/Technician/HistoryReport';
import TableWorkTechnician from './pages/Admin/TableWorkTechnician';


//User
import Index from "./pages/Home/Index";
import TicketForm from './pages/Home/TicketForm';
import ViewTicketUser from './pages/Home/ViewTicketUser';
import HistoryReportByUser from './pages/Home/HistoryReport';

//Auth
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

//Redux
import { useDispatch } from "react-redux";

//Function Redux
import { userLogin } from "./redux/slices/userSlice";


//utils
import ProtectedRoute from './utils/ProtectedRoute';
import SidebarUser from './components/SidebarUser';
import SidebarAdmin from './components/SidebarAdmin';
import SidebarTechnician from './components/SidebarTechnician';






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
        if (err.response.data == "JWT Expired") {
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
              <ProtectedRoute allowedRoles={[6]}>
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
              <ProtectedRoute allowedRoles={[6]}>
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
              <ProtectedRoute allowedRoles={[6]}>
                <div className="flex">
                <SidebarUser />
                <ViewTicketUser />
                </div>
                
              </ProtectedRoute>
            }
          />

          <Route 
          path="/history_report"
          element={
            <ProtectedRoute allowedRoles={[6]}>
              <div className="flex">
                <SidebarUser />
                <HistoryReportByUser />
              </div>
            </ProtectedRoute>
          }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute allowedRoles={[0]}>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
            <ProtectedRoute allowedRoles={[0]}>
                <Login />
            </ProtectedRoute>
            }
          />

          {/* End Route User */}

          {/* Start Route Admin */}

          <Route
            path="/admin/"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <div className="flex">
                  <SidebarAdmin />
                <Admin />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/view_ticket/:id"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <div className="flex">
                  <SidebarAdmin />
                <ViewTicket />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/history_report"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <div className="flex">
                  <SidebarAdmin />
                <HistoryReport />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/table_work_technician"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <div className="flex">
                  <SidebarAdmin />
                <TableWorkTechnician />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard_admin"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <div className="flex">
                  <SidebarAdmin />
                <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />

          {/* End Route Admin */}

          {/* Start Route Technician */}

          <Route
            path="/technician/"
            element={
              <ProtectedRoute allowedRoles={[2,3,4,5]}>
                <div className="flex">
                  <SidebarTechnician />
                <Technician />
                </div>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/technician/view_ticket/:id"
            element={
              <ProtectedRoute allowedRoles={[2,3,4,5]}>
                <div className="flex">
                  <SidebarTechnician />
                <ViewTicketTechnician />
                </div>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/technician/history_report"
            element={
              <ProtectedRoute allowedRoles={[2,3,4,5]}>
                <div className="flex">
                  <SidebarTechnician />
                <HistoryReportByTechnician />
                </div>
              </ProtectedRoute>
            }
          />

          {/* End Route Technician */}

        </Routes>
      </div>
    </>
  );
};

export default App;