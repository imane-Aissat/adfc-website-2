// Layout.jsx
import Header from './ChefDepart/Header';
import HRSidebar from './HRSidebar';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;