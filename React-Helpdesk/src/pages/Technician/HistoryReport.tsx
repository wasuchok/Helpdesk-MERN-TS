import TableHistoryReportByTechnician from "../../components/TableHistoryReportByTechnician"



const HistoryReport = () => {
  return (
    <>
    <div className="w-full p-4">
      <h1 className="text-xl font-bold">ประวัติการแจ้งซ่อมที่สำเร็จ</h1>
      <div className="mx-auto mt-5">
      <TableHistoryReportByTechnician />
      </div>
  </div>
  </>
  )
}

export default HistoryReport