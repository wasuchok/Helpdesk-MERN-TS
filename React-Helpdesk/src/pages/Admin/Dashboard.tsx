
import StatusChart from "../../components/charts/StatusChart"
const Dashboard : React.FC = () => {

  return (
    <>
     <div className=" p-8">
      <header className="bg-white shadow-md p-4 mb-4">
        <h1 className="text-2xl font-semibold">แดชบอร์ด</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-center font-semibold">กราฟแสดงสถานะของการร้องทั้งหมด</h2>
          <StatusChart />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          {/* Dashboard content */}
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          {/* Dashboard content */}
        </div>
      </div>
    </div>

    </>
  )
}

export default Dashboard