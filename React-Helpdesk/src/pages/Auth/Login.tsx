
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

interface IFormInput {
  Username: string;
  Password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();


  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      Username: "",
      Password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_API}/users/login`, {
          Username: data.Username,
          Password: data.Password,
        })
        .then(async(response) => {
          if (response.status == 200) {
           
          localStorage.setItem("userinfo", response.data);

          await toast.success(`เข้าสู่ระบบสำเร็จ`);

          await setTimeout(() => navigate("/"), 2000);

          }
        });
    } catch (e) {
      console.log(e);
    }
  };

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="Username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Username
              </label>
              <Controller
                name="Username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    {...field}
                  />
                )}
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
  );
};

export default Login;
