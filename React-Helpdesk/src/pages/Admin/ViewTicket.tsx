import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ModalChooseTechnician from "../../components/Modal";
import ModalComment from "../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faCheck,
  faCircleExclamation,
  faGear,
  faLightbulb,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../redux/store";

interface TicketType {
  TicketID: number;
  Title: string;
  Image: string;
  Description: string;
  Status: string;
  Priority: string;
  Requester_Username?: string;
  Assignee_Username?: string;
  Requester_Email? : string
}

interface technicianType {
  UserID: number;
  Username: string;
  Email: string;
  role_RoleName: string;
}

const ViewTicket = () => {
  const { userinfo } = useSelector((state : RootState) => state.user)


  const [data, setData] = useState<TicketType>({
    TicketID: 0,
    Title: "",
    Image: "",
    Description: "",
    Status: "",
    Priority: "",
  });
  let { id } = useParams();

  const [show, setShow] = useState<boolean>(false);
  const [show1, setShow1] = useState<boolean>(false);

  const fetchTicket = async (authtoken: string) => {
    await axios
      .get(`${import.meta.env.VITE_API}/ticket/read_ticket_single/${id}`, {
        headers: {
          authtoken,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setData(response.data);
        }
      });
  };

  useEffect(() => {
    fetchTicket(localStorage.userinfo);
    fetchTechnician(localStorage.userinfo);
  }, []);

  const [technician, setTechnician] = useState<technicianType[]>([]);

  const fetchTechnician = async (authtoken: string) => {
    await axios
      .get(`${import.meta.env.VITE_API}/users/choose_technician`, {
        headers: {
          authtoken,
        },
      })
      .then((response) => {
        if (response.status) {
          setTechnician(response.data);
        }
      });
  };

  const [idtechnician, setIdTechnician] = useState<number>(0);
  const commentText = useRef<any>("");

  const sendUserIDModalShow1 = async (UserID: number) => {
    setShow1(true);
    setIdTechnician(UserID);
  };

  const OnFinish = async (authtoken: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/ticket/comment`,
        {
          TicketID: data.TicketID,
          UserID: userinfo.UserID,
          CommentText: commentText.current.value,
          AssigneeID : idtechnician
        },
        {
          headers: {
            authtoken,
          },
        }
      );
      console.log(response);
      fetchTicket(localStorage.userinfo);
      setShow1(false);
      setShow(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className="grid grid-cols-1 xl:grid-cols-2">
    <div className="mx-5">
        <div className="my-2 flex">
            <h1 className="text-2xl font-semibold text-sky-700 mr-5">Ticket ID : {data.TicketID}</h1>
            <h1 className="text-2xl font-semibold text-slate-600">{data.Title}</h1>
            {!data.Assignee_Username && (
            <button
              className="bg-blue-600 text-white font-bold w-20 h-7 rounded-lg hover:bg-blue-500 mb-3 ml-3"
              onClick={() => setShow(true)}
            >
              เลือกช่าง
            </button>
          )}
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
        <div className="flex">
            <h2 className="text-xl font-semibold text-sky-700">ผู้รับผิดชอบ</h2>
            <h3 className="text-lg ml-4 font-semibold">{!!data.Assignee_Username ? data.Assignee_Username : 'ยังไม่มีผู้รับผิดชอบ'}</h3>
        </div>
    </div>

    <ModalChooseTechnician isVisible={show} onClose={() => setShow(false)}>
        <h1 className="text-lg font-bold text-center">เลือกช่าง</h1>
        <hr />

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>รหัสผู้ใช้</th>
                <th>ชื่อผู้ใช้</th>
                <th>อีเมล</th>
                <th>แผนก</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {technician.map((tech, i) => (
                <tr key={i}>
                  <th>{tech.UserID}</th>
                  <td>{tech.Username}</td>
                  <td>{tech.Email}</td>
                  <td>{tech.role_RoleName}</td>
                  <td>
                    <button
                      className="bg-emerald-600 w-8 h-8 rounded-xl hover:bg-emerald-700"
                      onClick={() => sendUserIDModalShow1(tech.UserID)}
                    >
                      <FontAwesomeIcon icon={faCheck} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalChooseTechnician>

      <ModalComment isVisible={show1} onClose={() => setShow1(false)}>
        <div>
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Helpdesk Comment
          </h2>
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-xl font-medium text-gray-700"
          >
            ให้คำแนะนำเพิ่มเติม
          </label>
          <div className="mt-1">
            <textarea
              className="textarea textarea-primary w-full"
              ref={commentText}
              placeholder="...."
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => OnFinish(localStorage.userinfo)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Confirm
          </button>
        </div>
      </ModalComment>
    


    </div>
    </>
  );
};

export default ViewTicket;
