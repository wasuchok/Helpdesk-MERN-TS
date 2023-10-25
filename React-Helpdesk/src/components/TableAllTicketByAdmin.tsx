import ModalChooseTechnician from '../components/Modal'
import ModalComment from '../components/Modal'
import moment from "moment";
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck, faEye,faUserGear} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



interface ITicket {
    id? : number
    TicketID : number
    Title : string
    Description : string
    Status? : string
    Priority : string
    Image : string
    RequesterID : number
    AssigneeID : number
    CreatedDate? : any
    UpdatedDate? : any
}

interface technicianType {
  UserID : number
  Username : string
  Email : string
  role_RoleName : string
}


const PAGE_SIZES = [3, 5, 15];

const TableAllTicketByAdmin = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [data, setData] = useState<ITicket[]>([]);
  let Ticket : ITicket[] = [];

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));


  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize]);

  const FetchAllTicket = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/ticket`, {
      headers: {
        authtoken,
      },
    });
    if (response.status == 200) {
      response.data.map((ticket: ITicket, i: number) => {
        Ticket.push({ ...ticket, id: i + 1 });
      });
      setRecords(Ticket);
      setData(Ticket);
    }
  };

  useEffect(() => {
    FetchAllTicket(localStorage.userinfo);
  }, []);


  const [show, setShow] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)

  const [technician, setTechnician] = useState<technicianType[]>([])

  const fetchTechnician = async (authtoken : string) => {
    await axios.get(`${import.meta.env.VITE_API}/users/choose_technician`, {
      headers: {
          authtoken
      },
  })
  .then((response) => {
    if(response.status == 200) {
      setTechnician(response.data)
    }
  })
  }

  useEffect(() => {
    fetchTechnician(localStorage.userinfo)
  },[])

  const [idtechnician, setIdTechnician] = useState<number>(0);
  const [ticketID, setTicketID] = useState<number>(0)
  const commentText = useRef<any>("")

  const sendUserIDModalShow1 = async (UserID : number) => {
    setShow1(true)
    setIdTechnician(UserID)
  }

  const sendTicketIDModalShow = async (TicketID : number) => {
    setShow(true)
    setTicketID(TicketID)
  }

  const OnFinish = async (authtoken: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/ticket/comment`, {
        "TicketID": ticketID,
        "UserID": idtechnician,
        "CommentText": commentText.current.value,
      }, {
        headers: {
          authtoken
        },
      });
      console.log(response);
      FetchAllTicket(localStorage.userinfo)
      setShow1(false);
      setShow(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={records}
        columns={[
          {
            accessor: "TicketID",
            title: "#",
            textAlignment: "right",
          },
          {
            accessor: "Image",
            title: "Image",
            render: ({ Image }) => (
                <img src={Image} className="w-36 mx-auto" />
            )
          },
          {
            accessor: "Title",
            title: "Title",
          },
          {
            accessor: "Status",
            title: "Status",
          },
          {
            accessor: "Priority",
            title: "Priority",
          },
          {
            accessor: "Description",
            title: "Description",
          },
          {
            accessor: "createdAt",
            title: "Create",
            render: ({ CreatedDate }) => moment(CreatedDate).format("ll"),
          },
          {
            accessor: "updatedAt",
            title: "Update",
            render: ({ UpdatedDate }) => moment(UpdatedDate).fromNow(),
          },
          {
            accessor: "Tools",
            width: 130,
            render: ({ TicketID, AssigneeID }) => (
              <div>
                <Link to={`/admin/view_ticket/${TicketID}`}>
                <button
                  className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
                > 
                  <FontAwesomeIcon icon={faEye} color="white" />
                </button>
                </Link>

                <button onClick={() => !AssigneeID ? sendTicketIDModalShow(TicketID) : null}
                  className="bg-green-600 w-10 h-10 rounded-xl hover:bg-green-700 mx-1 my-1"
                >
                  <FontAwesomeIcon icon={!AssigneeID ? faUserGear : faCheck} color="white" />
                </button>

                  
              </div>
            ),
          },
        ]}
        totalRecords={data.length}
        paginationColor="grape"
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />

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
      {
        technician.map((tech,i) => 
        <tr key={i}>
        <th>{tech.UserID}</th>
        <td>{tech.Username}</td>
        <td>{tech.Email}</td>
        <td>{tech.role_RoleName}</td>
        <td><button className="bg-emerald-600 w-8 h-8 rounded-xl hover:bg-emerald-700" onClick={() => sendUserIDModalShow1(tech.UserID)}><FontAwesomeIcon icon={faCheck} color="white" /></button></td>
      </tr>
        )
      }

    </tbody>
  </table>
</div>


    </ModalChooseTechnician>

    <ModalComment isVisible={show1} onClose={() => setShow1(false)}>

  
        <div>
          <h2 className="text-center text-2xl font-semibold text-gray-900">Helpdesk Comment</h2>
        </div>
          <div>
            <label htmlFor="comment" className="block text-xl font-medium text-gray-700">
              ให้คำแนะนำเพิ่มเติม
            </label>
            <div className="mt-1">
            <textarea className="textarea textarea-primary w-full" ref={commentText} placeholder="...."></textarea>
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

export default TableAllTicketByAdmin;