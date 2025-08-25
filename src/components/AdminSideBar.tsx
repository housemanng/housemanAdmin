


import { FiChevronRight } from "react-icons/fi";
import {
  
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <div>
      {" "}
      <aside className="sidebar">
       

      

        <div className="sidebar-List-Cont">
          <div className="sidebar-List">
            <FaUser className="sidebar-List-Icon" />
            <Link to="/adminusers">Users</Link>
          </div>

          <FiChevronRight className="sidebar-List-Icon" />
        </div>
      
       
  
     



      </aside>
    </div>
  );
}

export default AdminSideBar;
