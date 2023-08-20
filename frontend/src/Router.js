// import {useSelector} from 'react-redux';
// import {Redirect, Route, Switch} from 'react-router-dom';

// // layouts
// import Admin from './layouts/Admin';
// import Auth from './layouts/Auth';
// // views without layouts
// import Landing from './views/Landing';
// import Profile from './views/Profile';

// function RouterPage() {
//   const state = useSelector(state => state.auth);
//   return (
//     <Switch>
//       {!state.isAuthenticated ? (
//         <>
//           <Redirect from="/" to="/landing" />
//           <Route path="/landing" exact component={Landing} />
//           <Route path="/auth" component={Auth} />
//           <Redirect to="/landing" />
//         </>
//       ) : (
//         <>
//           <Redirect from="/" to="/admin" />
//           <Route path="/admin" component={Admin} />
//           <Route path="/profile" exact component={Profile} />
//           <Redirect to="/admin/dashboard" />
//         </>
//       )}
//     </Switch>
//   );
// }

// export default RouterPage;
