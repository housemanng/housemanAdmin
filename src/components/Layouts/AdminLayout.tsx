// adminfrontend/src/components/Layouts/AdminLayout.tsx

import { Outlet } from 'react-router-dom';
import AdminNavBar from '../AdminNavBar';
import AdminSideBar from '../AdminSideBar';

function AdminLayout() {
  return (
          <div>
          <header className="sticky-navbar">
           <AdminNavBar />
          </header>
          <article>
          
          <div className="home">
             <div className="container">
               <div className="layout-container">
               <AdminSideBar />
                 <div className="main-container">
                 <Outlet />
                </div>
             </div>
               </div>
            </div>
          </article>
          </div>
  );
}

export default AdminLayout;








