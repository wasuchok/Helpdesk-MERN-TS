import TableAllTicketByTechnician from "../../components/TableAllTicketByTechnician"

const Index = () => {
    return (
      <>
        <div className="w-full p-4">
          <h1 className="text-xl font-bold">ตารางการแจ้งซ่อมที่ดำเนินการอยู่</h1>
          <div className="mx-auto mt-5">
            <TableAllTicketByTechnician />
          </div>
        </div>
      </>
    )
  }
  
  export default Index