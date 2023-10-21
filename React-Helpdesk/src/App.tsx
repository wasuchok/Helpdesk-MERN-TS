import { useEffect } from 'react'
//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//store
import { useUserStore } from './store/userStore'

//Home
import Index from "./pages/Home/Index";

//Auth
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ProtectedLogin from './utils/ProtectedLogin';


//utils



const App = () => {
  const { user_login } = useUserStore()

    
      if (localStorage.userinfo) {
        user_login(localStorage.userinfo);
      }
   


  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>

        <Route
            path="/"
            element={
                <Index />
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
                <Login />
            }
          />

          {/* End Route User */}

        </Routes>
      </div>
    </>
  );
};

export default App;