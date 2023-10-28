import { faCircleExclamation, faGear, faGears, faLightbulb, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';

interface TicketType {
    TicketID : number
    Title : string
    Image : string
    Description : string
    Status : string
    Priority : string
    Requester_Username? : string
    Assignee_Username? : string
    Requester_Email? : string
}

interface CommentType {
    CommentText? : String
    user_Username? : String
    user_Email? : String

}
  

const ViewTicketTechnician = () => {
    const [show, setShow] = useState<boolean>(false)

    const [data, setData] = useState<TicketType>({
        TicketID : 0,
        Title : "",
        Image : "",
        Description : "",
        Status : "",
        Priority : ""
      })
      const [comment, setComment] = useState<CommentType> ({
        CommentText : ""
      })
      let { id } = useParams()

      const fetchTicket = async (authtoken : string) => {
        await axios.get(`${import.meta.env.VITE_API}/ticket/read_ticket_single/${id}` , {
            headers : {
                authtoken
            }
        }).then((response) => {
            if(response.status == 200) {
                setData(response.data)
            }
        })
      }

      const fetchComment = async (authtoken : string) => {
        await axios.get(`${import.meta.env.VITE_API}/ticket/read_comment_by_technician/${id}` , {
            headers : {
                authtoken
            }
        }).then((response) => {
            
            if(response.status == 200) {
                console.log(response)
                setComment(response.data)
            }
        })
      }

      useEffect(() => {
        fetchTicket(localStorage.userinfo)
        fetchComment(localStorage.userinfo)
      },[])

      const changeStatusTicketByTechnician = async (authtoken : string) => {
        await axios.post(`${import.meta.env.VITE_API}/ticket/update_ticket`,{ 
            "Status" : `${data.Status == "Open" ? 'In Progress' : data.Status == "In Progress" ? 'Wait' : 'Wait'}`,
            "TicketID" : data.TicketID
            },{
                headers: {
                    authtoken
            },
        }).then((response) => {
            console.log(response)
            fetchTicket(localStorage.userinfo)
            fetchComment(localStorage.userinfo)
            setShow(false)
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
            <h2 className="text-xl font-semibold text-sky-700">ข้อมูลผู้ใช้</h2>
            <div className="flex justify-between my-10">
                <h2 className="text-lg p-1">ชื่อผู้ใช้</h2>
                <h2 className="text-lg bg-violet-600 text-white rounded-lg p-1 cursor-pointer hover:bg-violet-700">{data.Requester_Username}</h2>
            </div>
            <div className="flex justify-between my-10">
                <h2 className="text-lg p-1">อีเมล</h2>
                <h2 className="text-lg bg-violet-600 text-white rounded-lg p-1 cursor-pointer hover:bg-violet-700">{data.Requester_Email}</h2>
            </div>
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
                    <button className="bg-slate-600 rounded-lg w-10 ml-2 hover:bg-slate-700" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={faGear} color="white" />
                    </button>
                </div>
                <h2 className={`text-lg text-white rounded-lg p-1 cursor-pointer
                ${data.Status == "Open" ? "bg-indigo-500 hover:bg-indigo-600"
                : data.Status == "In Progress" ? "bg-orange-500 hover:bg-orange-600"
                : data.Status == "Wait" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>{data.Status}</h2>
            </div>
            <div className="flex justify-between my-10">
                <h2 className="text-lg p-1">ลำดับความสำคัญ</h2>
                <h2 className={`text-lg text-white rounded-lg p-1 cursor-pointer
                ${data.Priority == "high" ? 'bg-red-600 hover:bg-red-700' : data.Priority == "medium" ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'}
                `}>{data.Priority}</h2>
            </div>
            <div className="flex flex-col my-10">
                <h2 className="text-lg p-1">รายละเอียด</h2>
                <p className="mt-5 w-auto p-1 rounded-lg text-lg text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer">{data.Description}</p>
            </div>
        </div>
        

    </div>
    

    <div className="m-10 max-w-lg">
            <h2 className="text-xl font-semibold text-sky-700">การให้คำแนะนำของหัวหน้างาน</h2>
            <div className="flex my-5">
               <p className="text-lg">
                    {comment.CommentText}
               </p>
            </div>
            <p className="text-lg font-semibold">จากผู้ใช้งาน : {comment.user_Username}</p>
    </div>
    
    <Modal  isVisible={show} onClose={() => setShow(false)}>
        <div className="my-5">
        <h3 className="text-xl text-center font-semibold">อัพเดทสถานะแจ้งซ่อม</h3>
        </div>
        
        <div className="flex justify-center">
            <ul className="steps w-full">
                <li className="step step-primary">Open</li>
                <li className={`step ${data.Status == "In Progress" || data.Status == "Wait" ? 'step-primary' : ''}`}>In Progress</li>
                <li className={`step ${data.Status == "Wait" ? 'step-primary' : ''}`}>Wait</li>
                <li className={`step ${data.Status == "Conplete" ? 'step-primary' : ''}`}>Complete</li>
            </ul>
        </div>

        <div className="my-8 text-center">
            <h4 className="font-semibold text-lg">
                {data.Status == "Open" ? 
                "สถานะ Open คือ รอช่างยืนยันเพื่อเริ่มทำงานในขั้นตอนถัดไป"
                : data.Status == "In Progress" ? 
                "สถานะ In Progress คือ กำลังดำเนินการ"
                : data.Status == "Wait" ?
                "สถานะ Wait คือ รอการยืนยันจากผู้แจ้งว่าเสร็จสิ้นหรือไม่"
                : "สถานะ Complete คือ เสร็จสิ้นสมบูรณ์"}
            </h4>
        </div>

        <div className={`m-8 ${data.Status == "Wait" ? "hidden" : ''}`}>
            <button className="font-semibold text-lg bg-green-600 text-white rounded-xl w-full text-center h-8 hover:bg-green-700"
            onClick={() => changeStatusTicketByTechnician(localStorage.userinfo)}
            >อัพเดทสถานะ</button>
        </div>

    </Modal>
    </div>
    </>
  )
}

export default ViewTicketTechnician