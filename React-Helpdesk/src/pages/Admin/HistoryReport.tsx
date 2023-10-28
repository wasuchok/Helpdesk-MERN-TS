
import TableHistoryReportByAdmin from '../../components/TableHistoryReportByAdmin'

const HistoryReport = () => {
  return (
    <>
    <div className="w-full p-4">
      <h1 className="text-xl font-bold">ประวัติการแจ้งซ่อมที่สำเร็จ</h1>
      <div className="mx-auto mt-5">
      <TableHistoryReportByAdmin />
      </div>
  </div>
  </>
  )
}

export default HistoryReport