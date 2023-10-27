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
      <div className="container mx-2 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">{data.Title}</h1>
          {!data.Assignee_Username && (
            <button
              className="bg-blue-600 text-white font-bold w-20 h-7 rounded-lg hover:bg-blue-500 mb-3"
              onClick={() => setShow(true)}
            >
              เลือกช่าง
            </button>
          )}

          <img
            src={`${data.Image}`}
            className="w-1/2 mb-4 object-cover rounded-lg"
          />

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure bg-purple-600 w-10 text-center h-10 rounded-lg">
                <FontAwesomeIcon
                  icon={faLightbulb}
                  color="white"
                  className="my-3"
                />
              </div>
              <div className="stat-title">รหัสการแจ้งซ่อม</div>
              <div className="stat-value text-primary">{data.TicketID}</div>
            </div>

            <div className="stat">
              <div className="stat-figure bg-pink-500 w-10 text-center h-10 rounded-lg">
                <FontAwesomeIcon
                  icon={faSmile}
                  color="white"
                  className="my-3"
                />
              </div>
              <div className="stat-title">สถานะ</div>
              <div className="stat-value text-secondary">{data.Status}</div>
            </div>

            <div className="stat">
              <div className="stat-figure bg-orange-600 w-10 text-center h-10 rounded-lg">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  color="white"
                  className="my-3"
                />
              </div>
              <div className="stat-title">ความสำคัญ</div>
              <div className="stat-value">{data.Priority}</div>
              <div className="stat-desc text-secondary">ลำดับความสำคัญ</div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">ผู้แจ้ง:</h2>
            <p className="mt-2 text-lg bg-gray-100 p-2 rounded-md">
              {data.Requester_Username}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">ผู้รับผิดชอบ:</h2>
            <p className="mt-2 text-lg bg-gray-100 p-2 rounded-md">
              {data.Assignee_Username}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">รายละเอียด:</h2>
            <ul className="mt-2">
              <li className="mb-2">
                <div className="bg-gray-100 p-2 rounded-md">
                  {data.Description}
                </div>
              </li>
            </ul>
          </div>
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
    </>
  );
};

export default ViewTicket;
