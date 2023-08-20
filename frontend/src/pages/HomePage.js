import React, {useEffect} from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import {Outlet, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Homepage = () => {
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <Outlet />
        {/* degisecek componentler outlet yazdigim yere gelecek */}
      </div>
    </>
  );
};

export default Homepage;
