import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface CreateTicket {
  Title: string;
  Description: string;
  Priority: string;
  Image: File | null | any;
  Status : string
}

const TicketForm = () => {
  const navigate = useNavigate()
    const user = useSelector((state : RootState) => state.user)
    const { userinfo } = user

    const [loading , setLoading] = useState<boolean>(false)
    const [msg , setMsg] = useState<string>("สร้างใบแจ้งซ่อม")

  const { control, handleSubmit, reset, setValue } = useForm<CreateTicket>({
    defaultValues: {
        Title: "",
        Description: "",
        Priority : "",
        Image : null,
        Status : "Open"
    },
  });

  const onSubmit: SubmitHandler<CreateTicket> = async (data) => {
    setLoading(true)
    setMsg("กำลังโหลด")
    
    const formData = new FormData();
    formData.append('file', data.Image);
    formData.append('upload_preset', `${import.meta.env.VITE_PRESET}`);
    formData.append('folder', "helpdesk");

   await axios.post(`https://api.cloudinary.com/v1_1/dcq3ijz0g/image/upload`, formData)
    .then(async (response) => {
        data.Image = response.data.secure_url
        await axios.post(`${import.meta.env.VITE_API}/ticket`,{ ...data,
        "RequesterID" : userinfo.UserID
        },{
            headers: {
                authtoken : localStorage.userinfo
            },
        })
        .then(async(response) => {
            if(response.status == 200) {
                reset();
                setValue('Image', null);
                 setLoading(false)
                 setMsg("สร้างใบเสร็จ")
                 toast.success(`สร้างใบเสร็จสำเร็จแล้ว`);
                 navigate('/')
            }
        })
       
    })
  };

  return (
    <div className="max-w-md mt-6 p-4 bg-white rounded-lg shadow-md flex flex-wrap justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center w-full">ใบแจ้งซ่อม</h2>
      <div className="w-full text-center mb-4">
        <img src="https://support.cc/images/blog/benefits-of-helpdesk-software.png" className="rounded-xl" alt="" />
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-4">
          <label className="block text-lg font-medium text-gray-700">หัวข้อ</label>
          <Controller
                name="Title"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md shadow-md focus:ring focus:ring-indigo-400"
                    {...field}
                  />
                )}
            />
        </div>
        <div className="w-full mb-4">
          <label className="block text-lg font-medium text-gray-700">รายละเอียด</label>
          <Controller
                name="Description"
                control={control}
                render={({ field }) => (
                  <textarea
                    className="w-full px-4 py-2 border rounded-md shadow-md focus:ring focus:ring-indigo-400"
                    {...field}
                  />
                )}
            />
        </div>
        <div className="w-full mb-4">
          <label className="block text-lg font-medium text-gray-700">ลำดับความสำคัญ</label>
          <Controller
          name="Priority" 
          control={control} 
          rules={{ required: 'Priority is required' }}
          defaultValue="" 
          render={({ field }) => (
            <select {...field} className="w-full px-4 py-2 border rounded-md shadow-md focus:ring focus:ring-indigo-400">
              <option value="" disabled>
                เลือกลำดับความสำคัญ
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          )}
        />
        </div>
        <div className="w-full mb-4">
          <label className="block text-lg font-medium text-gray-700">รูปรายละเอียด</label>
          
          <Controller
          name="Image"
          control={control}
          rules={{ required: 'Image is required' }}
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e : any) => field.onChange(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-md shadow-md focus:ring focus:ring-indigo-400"
            />
          )}
        />

        </div>
        <div className="w-full mb-4">
          <button
            type="submit"
            className={`${loading ? "bg-slate-600" : "bg-indigo-500"} text-white py-3 px-4 rounded-md
            hover:bg-indigo-600 focus:ring focus:ring-indigo-400 w-full`}
            disabled={loading ? true : false}
          >
            {msg}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
