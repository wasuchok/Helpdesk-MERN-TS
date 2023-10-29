import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClockRotateLeft,
    faHouse,
    faRightFromBracket
 } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const SidebarTechnician = () => {
  return (
    <>
<aside className="hidden xl:flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 " style={{height: '90.5vh'}} x-show="asideOpen">
  <Link to="/technician/" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-home" /></span>
    <FontAwesomeIcon icon={faHouse} />
    <span className="pl-2">ตารางการแจ้งซ่อม</span>
  </Link>
  <Link to="/technician/history_report" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-home" /></span>
    <FontAwesomeIcon icon={faClockRotateLeft} />
    <span className="pl-2">ประวัติการแจ้งซ่อมที่สำเร็จ</span>
  </Link>
  <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-user" /></span>
    <FontAwesomeIcon icon={faRightFromBracket} />
    <span className="pl-2">ออกจากระบบ</span>
  </a>
</aside>

    </>
  )
}

export default SidebarTechnician