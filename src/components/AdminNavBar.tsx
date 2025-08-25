import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiList, FiX, FiSettings } from "react-icons/fi";

interface Admin {
  _id: string;
  first_name: string;
  middle_name: string;
  surname: string;
  isSuperAdmin: boolean;
}

//

function AdminNavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //

  useEffect(() => {
    // Retrieve token and admin data from localStorage
    const token = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("admin") || "{}") as Admin;

    if (token && admin && admin._id) {
      setIsAuthenticated(true);

      // Construct the full name from first_name, middle_name, and surname
      const fullName = `${admin.first_name} ${admin.middle_name} ${admin.surname}`;
      setAdminName(fullName);

      // Determine the role based on isSuperAdmin
      const role = admin.isSuperAdmin ? "Super Admin" : "Admin";
      setAdminRole(role);

      //
    } else {
      setIsAuthenticated(false);
    }

    // Set greeting based on the time of day
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);



  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    navigate("/adminlogin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    if (option === "Logout") {
      handleLogout();
    }
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container navbar-container">
      <div className="navbar-logo">
        <img src="/assets/hman.png" alt="Logo" className="HeadingLogo" />
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FiX size={24} /> : <FiList size={24} />}
      </div>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            
            <div className="">
              <span className="nav-List-greetings">{greeting},</span>&nbsp;
              {adminName.split(" ").pop()}
            </div>
           
            <div className="nav-List-Items">Logged in as: {adminRole}</div> 
            <img src="/assets/ava.png" alt="Logo" className="avater-Display" />
            <div>
              <FiSettings className="settings-icon" onClick={toggleDropdown} />
              {isOpen && (
                <div className="settings-container" ref={dropdownRef}>
                  <ul className="settings-Ul">
                    <li
                      className="settings-li"
                      onClick={() => handleOptionClick("Profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="settings-li"
                      onClick={() => handleOptionClick("Account Settings")}
                    >
                      Account Settings
                    </li>
                    <li
                      className="settings-li"
                      onClick={() => handleOptionClick("Logout")}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button className="Auth-Auth-Btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="Auth-Auth-Btn"
              style={{ marginRight: "10px" }}
            >
              Signup
            </Link>
            <Link to="/adminlogin" className="Auth-Auth-Btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminNavBar;
