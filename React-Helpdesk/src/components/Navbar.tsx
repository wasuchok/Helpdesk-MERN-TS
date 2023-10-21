import { useNavigate, Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div className="navbar bg-blue-600 fixed top-0 w-full drop-shadow-lg z-10">
      <div className="flex-1 text-base-100">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Help Desk</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        {/* {!!userinfo.email ? ( */}
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/SF_Cinema_logo.jpg" />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link to="/edituser">
            Edit User
          </Link>
          </li>
          {/* <li className={`${userinfo.isAdmin ? "" : "hidden"}`}> */}
          <li className="">
            <Link to="/admin">
            Admin
          </Link>
          </li>
    
          <li><button>Logout</button></li>
        </ul>
      </div>
          <div className="mx-3">
          <Link to="/login"><button className="bg-blue-400 rounded-lg text-base-100 w-24 h-10 hover:bg-blue-500 mx-2">Login</button></Link>
          <Link to="/register"><button className="bg-blue-400 rounded-lg text-base-100 w-24 h-10 hover:bg-blue-500">Register</button></Link>
        </div>
    
    
      </div>
    </div>
      )
    }


export default Navbar