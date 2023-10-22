import { TextInput } from "@mantine/core";
import moment from "moment";
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";



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


const PAGE_SIZES = [5, 10, 15];

const TableAllTicket = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [data, setData] = useState<ITicket[]>([]);
  let Ticket : ITicket[] = [];

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));


  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize]);

  const FetchAllTicket = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/ticket/single`, {
      headers: {
        authtoken,
      },
    });
    console.log(response)
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
              <div>
                <button
                  className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
                //   onClick={() => ViewUser(_id, localStorage.userinfo)}
                >
                  <FontAwesomeIcon icon={faEye} color="white" />
                </button>

                  <FontAwesomeIcon icon={faTrash} color="white" />
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
      {/* <ModalEditUser isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">View User</h3>

          <form onSubmit={onSubmit}>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={userSingle.email}
              required
              className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={userSingle.username}
              className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              required
            />
          </div>

          <div className="my-4">
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={userSingle.isAdmin}
                onChange={(e : ChangeEvent<HTMLInputElement>) => ChangeIsAdmin(userSingle._id, localStorage.userinfo, e.target.checked)}
                
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Admin
              </span>
            </label>
          </div>

          <button className="bg-blue-600 text-base-100 font-semibold w-full h-10 rounded-lg hover:bg-blue-700 focus:bg-blue-400">
            Save
          </button>

          </form>
        </div>
      </ModalEditUser> */}
    </>
  );
};

export default TableAllTicket;