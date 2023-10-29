
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import dayjs from 'dayjs';



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



const PAGE_SIZES = [3, 5, 15];

const TableHistoryReportByAdmin = () => {
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
    const response = await axios.get(`${import.meta.env.VITE_API}/ticket/read_history_report_ticket_by_admin`, {
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
          accessor: "TicketID",
          title: "#",
          textAlignment: "right",
        },
        {
          accessor: "Image",
          title: "รูป",
          render: ({ Image }) => (
              <img src={Image} className="w-36 mx-auto" />
          )
        },
        {
          accessor: "Title",
          title: "หัวข้อปัญหา",
        },
        {
          accessor: "Status",
          title: "สถานะการแจ้งซ่อม",
          render: ({ Status }) => (
             <button className={`text-white font-bold w-24 h-8 rounded-lg
             ${Status == "Open" ? "bg-indigo-500 hover:bg-indigo-600"
            : Status == "In Progress" ? "bg-orange-500 hover:bg-orange-600"
            : Status == "Wait" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
             `
            }>{Status}</button>
          )
        },
        {
          accessor: "Priority",
          title: "ลำดับความสำคัญ",
          render: ({ Priority }) => (
            <button className={`text-white w-20 font-bold h-8 rounded-lg capitalize
            ${Priority == "high" ? 'bg-red-600 hover:bg-red-700'
            : Priority == "medium" ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700'  }
            `}>{Priority}</button>
          )
        },
        {
          accessor: "Description",
          title: "รายละเอียด",
          render: ({ Description }) => (
            <p className="truncate">{Description}</p>
          )
        },
        {
          accessor: "createdAt",
          title: "วันที่สร้าง",
          render: ({ CreatedDate }) => dayjs(CreatedDate).format('D MMMM YYYY เวลา HH:mm')
        },
        {
          accessor: "updatedAt",
          title: "อัพเดท",
          render: ({ UpdatedDate }) => (
            dayjs(UpdatedDate).fromNow()
          ),
        },
        {
          accessor: "Tools",
          width: 130,
          render: ({ TicketID }) => (
            <div>
              <Link to={`/admin/view_ticket/${TicketID}`}>
              <button
                className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
              > 
                <FontAwesomeIcon icon={faEye} color="white" />
              </button>
              </Link>

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


  </>
  );
};

export default TableHistoryReportByAdmin;