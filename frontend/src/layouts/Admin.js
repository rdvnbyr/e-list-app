import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
// layouts

import Dashboard from '../views/admin/Dashboard';
import Settings from '../views/admin/Settings';
import Tables from '../views/admin/Tables';
// components

import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import FooterAdmin from '../components/Footers/FooterAdmin';
import Product from '../views/admin/Product';

// views

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/product" exact component={Product} />

            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
