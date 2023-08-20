import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SignupPage from './pages/SignupPage';
import Dashboard from './views/admin/Dashboard';
import Product from './views/admin/product/Product';
import Settings from './views/admin/Settings';
import Tables from './views/admin/Tables';
// import RouterPage from './Router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index={true} element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tables" element={<Tables />} />
          <Route path="product/*" element={<Product />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {/* <RouterPage /> */}
    </BrowserRouter>
  );
}

export default App;
