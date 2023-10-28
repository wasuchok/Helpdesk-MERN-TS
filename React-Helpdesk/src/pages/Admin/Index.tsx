import TableAllTicketByAdmin from "../../components/TableAllTicketByAdmin"



const Index = () => {
  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-xl font-bold">รายการแจ้งซ่อมทั้งหมดที่ดำเนินการอยู่</h1>
        <div className="mx-auto mt-5">
        <TableAllTicketByAdmin />
        </div>
    </div>
    </>
  )
}

export default Index