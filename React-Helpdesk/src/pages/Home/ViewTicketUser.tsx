import { faCircleExclamation, faGear, faLightbulb, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface TicketType {
  TicketID : number
  Title : string
  Image : string
  Description : string
  Status : string
  Priority : string
  Requester_Username? : string
  Assignee_Username? : string
}



const ViewTicketUser = () => {
    const [data, setData] = useState<TicketType>({
        TicketID : 0,
        Title : "",
        Image : "",
        Description : "",
        Status : "",
        Priority : ""
      })
      let { id } = useParams()
  
      const fetchTicket = async (authtoken : string) => {
          await axios.get(`${import.meta.env.VITE_API}/ticket/read_ticket_single/${id}`, {
              headers: {
                  authtoken
              },
          })
          .then((response) => {
            if(response.status == 200) {
                console.log(response)
              setData(response.data)
            }
            
          })
      }

      useEffect(() => {
        fetchTicket(localStorage.userinfo)
      } ,[])

      const statusComplete = async (authtoken : string) => {
            await axios.post(`${import.meta.env.VITE_API}/ticket/update_ticket`,{ 
                "Status" : `Complete`,
                "TicketID" : data.TicketID
                },{
                    headers: {
                        authtoken
                },
            }).then((response) => {
                fetchTicket(localStorage.userinfo)
            })
      }

  return (
    <>
    <div className="grid grid-cols-1 xl:grid-cols-2">
    <div className="mx-5">
        <div className="my-2 flex">
            <h1 className="text-2xl font-semibold text-sky-700 mr-5">Ticket ID : {data.TicketID}</h1>
            <h1 className="text-2xl font-semibold text-slate-600">{data.Title}</h1>
        </div>

        <hr />

        <div className="m-10">
            <h2 className="text-xl font-semibold text-sky-700">รายละเอียดการแจ้งซ่อม</h2>
            <div className="mt-3">
                <img className="w-auto xl:max-w-xl rounded-xl" src={data.Image} alt="" />
            </div>
            <div className="flex justify-between my-10">
                <h2 className="text-lg p-1">หัวข้อปัญหา</h2>
                <h2 className="text-lg bg-emerald-600 text-white rounded-lg p-1 cursor-pointer hover:bg-emerald-700">{data.Title}</h2>
            </div>
            <div className="flex justify-between my-10">
                <div className="flex">
                    <h2 className="text-lg p-1">สถานะแจ้งซ่อม</h2>
                </div>
                <h2 className={`text-lg text-white rounded-lg p-1 cursor-pointer
                ${data.Status == "Open" ? "bg-indigo-500 hover:bg-indigo-600"
                : data.Status == "In Progress" ? "bg-orange-500 hover:bg-orange-600"
                : data.Status == "Wait" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>{data.Status}</h2>
            </div>
            <div className="flex justify-between my-10">
                <h2 className="text-lg p-1">ลำดับความสำคัญ</h2>
                <h2 className={`text-lg text-white rounded-lg p-1 cursor-pointer
                ${data.Priority == "high" ? 'bg-red-600 hover:bg-red-700' : data.Priority == "medium" ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}
                `}>{data.Priority}</h2>
            </div>
            <div className="flex flex-col my-10">
                <h2 className="text-lg p-1">รายละเอียด</h2>
                <p className="mt-5 w-auto p-1 rounded-lg text-lg text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer">{data.Description}</p>
            </div>
        </div>
        

    </div>

    <div className="m-10 max-w-lg">
        <div className="flex mb-5">
            <h2 className="text-xl font-semibold text-sky-700">ผู้รับผิดชอบ</h2>
            <h3 className="text-lg ml-4 font-semibold">{!!data.Assignee_Username ? data.Assignee_Username : 'ยังไม่มีผู้รับผิดชอบ'}</h3>
        </div>

        <hr />

        <div className={` flex-col text-center w-auto ${data.Status == "Wait" ? "flex" : "hidden"}`}>
            <img src="https://img.freepik.com/free-photo/smiling-auto-mechanic-with-wrench-standing-hands-folded-white-background_662251-2939.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697846400&semt=ais" alt="" />
            <h2 className="text-xl font-semibold text-green-600 my-5">กรุณายืนยันว่า Ticket นี้ได้แก้ปัญหาเสร็จสิ้นสมบูรณ์แล้ว</h2>
            <button onClick={() => statusComplete(localStorage.userinfo)} className="text-xl bg-green-600 text-white rounded-lg w-auto p-1 h-10  hover:bg-green-700">ยืนยัน</button>
        </div>
    </div>
  

    </div>
    </>
  )
}

export default ViewTicketUser