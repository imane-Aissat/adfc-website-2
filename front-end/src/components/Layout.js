// Layout.jsx
import Topbar from './Topbar';
import HRSidebar from './HRSidebar';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;