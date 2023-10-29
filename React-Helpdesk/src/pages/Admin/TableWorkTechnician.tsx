import TableWorkTechnicianComponents from "../../components/TableWorkTechnician"



const TableWorkTechnician = () => {
  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-xl font-bold">ตารางงานของช่าง</h1>
        <div className="mx-auto mt-5">
            <TableWorkTechnicianComponents />
        </div>
    </div>
    </>
  )
}

export default TableWorkTechnician