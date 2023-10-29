
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import ModalTableWork from "./ModalTable";
import TableTicketTechnicianByAdmin from "./TableTicketTechnicianByAdmin";

interface technicianType {
  id : number
  UserID : number
  Username : string
  Email : string
  role_RoleName : string
}


const PAGE_SIZES = [3, 5, 15];

const TableWorkTechnician = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [show, setShow] = useState<boolean>(false)
  const [userID, setUserID] = useState<number>()

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [data, setData] = useState<technicianType[]>([]);
  let Ticket : technicianType[] = [];

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));


  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize]);

  const FetchAllTechnician = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/users/choose_technician`, {
      headers: {
        authtoken,
      },
    });
    // console.log(response)
    if (response.status == 200) {
      response.data.map((ticket: technicianType, i: number) => {
        Ticket.push({ ...ticket, id: i + 1 });
      });
      setRecords(Ticket);
      setData(Ticket);
    }
  };

  useEffect(() => {
    FetchAllTechnician(localStorage.userinfo);
  }, []);

  const openModal = (UserID : number) => {
    setShow(true)
    setUserID(UserID)
  }




  return (
    <>
      <DataTable
        className="custom-font"
        shadow="xl"
        withBorder
        borderRadius="lg"
        withColumnBorders
        minHeight={150}
        noRecordsText="No data found.."
        striped
        highlightOnHover
        records={records}
        columns={[
          {
            accessor: "UserID",
            title: "#",
            textAlignment: "right",
          },
          {
            accessor: "Username",
            title: "ชื่อผู้ใช้",
          },
          {
            accessor: "Email",
            title: "อีเมล",
          },
          {
            accessor: "role_RoleName",
            title: "แผนก",
          },
          {
            accessor: "Tools",
            title : "เครื่องมือ",
            width: 130,
            render: ({ UserID }) => (
              <div className="">
                <button onClick={() => openModal(UserID)}
                  className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
                >
                  <FontAwesomeIcon icon={faEye} color="white" />
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

<ModalTableWork isVisible={show} onClose={() => setShow(false)}>
    <TableTicketTechnicianByAdmin AssigneeID={userID} />

</ModalTableWork>


    </>
  );
};

export default TableWorkTechnician;