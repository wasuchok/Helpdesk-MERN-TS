import { faCircleExclamation, faLightbulb, faSmile } from '@fortawesome/free-solid-svg-icons';
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
          await axios.get(`${import.meta.env.VITE_API}/ticket/${id}`, {
              headers: {
                  authtoken
              },
          })
          .then((response) => {
            if(response.status == 200) {
              setData(response.data)
            }
            
          })
      }

      useEffect(() => {
        fetchTicket(localStorage.userinfo)
      } ,[])

  return (
    <div className="container mx-2 p-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">{data.Title}</h1>
        
        <img
          src={`${data.Image}`}
          className="w-1/2 mb-4 object-cover rounded-lg"
        />

        <div className="stats shadow">
  
  <div className="stat">
  <div className="stat-figure bg-purple-600 w-10 text-center h-10 rounded-lg">
      <FontAwesomeIcon icon={faLightbulb} color="white" className="my-3" />
    </div>
    <div className="stat-title">รหัสการแจ้งซ่อม</div>
    <div className="stat-value text-primary">{data.TicketID}</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure bg-pink-500 w-10 text-center h-10 rounded-lg">
      <FontAwesomeIcon icon={faSmile} color="white" className="my-3" />
    </div>
    <div className="stat-title">สถานะ</div>
    <div className="stat-value text-secondary">{data.Status}</div>
  </div>
  
  <div className="stat">
  <div className="stat-figure bg-orange-600 w-10 text-center h-10 rounded-lg">
      <FontAwesomeIcon icon={faCircleExclamation} color="white" className="my-3" />
    </div>
  <div className="stat-title">ความสำคัญ</div>
    <div className="stat-value">{data.Priority}</div>
    <div className="stat-desc text-secondary">ลำดับความสำคัญ</div>
  </div>
  
</div>

<div className="mt-8">
                <h2 className="text-xl font-semibold">ผู้แจ้ง:</h2>
                <p className="mt-2 text-lg bg-gray-100 p-2 rounded-md">{data.Requester_Username}</p>
  </div>
  <div className="mt-8">
                <h2 className="text-xl font-semibold">ผู้รับผิดชอบ:</h2>
                <p className="mt-2 text-lg bg-gray-100 p-2 rounded-md">{data.Assignee_Username}</p>
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
  )
}

export default ViewTicketUser