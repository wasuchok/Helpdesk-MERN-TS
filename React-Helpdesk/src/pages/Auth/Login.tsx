import { useState, ChangeEvent } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

interface loginUser {
    Username : string
    Password : string
}


const Login = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState<loginUser>({
        Username : '',
        Password : ''
    })
  
    const handleLogin = (event : ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [event.target.name] : event.target.value})
    }

    const onSubmit = async (event : ChangeEvent<HTMLFormElement>) => {
      try {
        event.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}/users/login`, {...login})
        .then((response) => {
          
          if(response.status == 200) {

            localStorage.setItem("userinfo", response.data)

            toast.success(`เข้าสู่ระบบสำเร็จ`)
            
            setTimeout((() => navigate('/')), 2000)
          }
        })
        
      } catch (e) {
        console.log(e)
      }
    }


  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          alt="Registration Image"
          className="mb-6 w-48 mx-auto rounded-lg"
        />
  
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              onChange={handleLogin}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              onChange={handleLogin}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
  
          <button className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </button>
          <ToastContainer />
        </form>
  
      </div>
    </div>
    </>
  )
}

export default Login