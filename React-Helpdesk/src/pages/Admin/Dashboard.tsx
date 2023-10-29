import StatusChartDay from "../../components/charts/StatusChartDay"
const Dashboard : React.FC = () => {

  return (
    <>
     <h1 className="text-xl font-bold p-4">แดชบอร์ด</h1>
      <div className="w-[800px] p-4 mx-auto">
        <div className="mt-5 grid grid-cols-1">
            <StatusChartDay />
            <hr className="mt-5" />
        </div>
    </div>
    </>
  )
}

export default Dashboard