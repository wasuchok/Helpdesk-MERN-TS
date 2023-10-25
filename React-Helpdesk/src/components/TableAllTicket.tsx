
import moment from "moment";
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



interface ITicket {
    id? : number
    TicketID : string
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

const TableAllTicket = () => {
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
    const response = await axios.get(`${import.meta.env.VITE_API}/ticket/all_single`, {
      headers: {
        authtoken,
      },
    });
    // console.log(response)
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
            render: ({ TicketID }) => (
              <div className="text-center">
                <button
                  className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
                >
                <Link to={`/view_ticket/${TicketID}`}>
                  <FontAwesomeIcon icon={faEye} color="white" />
                  </Link>
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


    </>
  );
};

export default TableAllTicket;