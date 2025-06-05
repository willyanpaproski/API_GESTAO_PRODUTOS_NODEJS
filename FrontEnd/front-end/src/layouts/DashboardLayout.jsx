import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ Menu
        </button>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;