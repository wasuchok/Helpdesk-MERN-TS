import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);



const StatusChart = () => {

    let AllStatus = [
        {
            "Status" : "Open",
            "Count" : 0
        },
        {
            "Status" : "In Progress",
            "Count" : 0
        },
        {
            "Status" : "Wait",
            "Count" : 0
        },
        {
            "Status" : "Complete",
            "Count" : 0
        }
      ]

      const [data, setData] = useState<number[]>([])

      const FetchTicketToday = async (authtoken: string) => {
        const response = await axios.get(`${import.meta.env.VITE_API}/ticket/read_ticket_today_by_admin`, {
          headers: {
            authtoken,
          },
        });
        if(response.status == 200) {
            response.data.map((item : any) => {
                if(item.ticket_Status == "Open") {
                    AllStatus[0].Count = item.StatusCount
                } else if(item.ticket_Status == "In Progress") {
                    AllStatus[1].Count = item.StatusCount
                } else if(item.ticket_Status == "Wait") {
                    AllStatus[2].Count = item.StatusCount
                } else if(item.ticket_Status == "Complete") {
                    AllStatus[3].Count = item.StatusCount
                }
                setData(AllStatus.map((item : any) => item.Count))
        })
        }
      };

      const labels = AllStatus.map((item : any) => item.Status)
      
      
      const pieChartData = {
        labels,
        datasets: [
          {
            data : [...data],
            backgroundColor: ['#F44336', '#2196F3', '#FF9800', '#4CAF50'],
          },
        ],
      };
      

      useEffect(() => {
        FetchTicketToday(localStorage.userinfo)
      }, [])


  const options = {
    responsive: true,
  };


  return (
    <div className="">
      <Pie data={pieChartData} options={options} />
    </div>
  );
};

export default StatusChart;
