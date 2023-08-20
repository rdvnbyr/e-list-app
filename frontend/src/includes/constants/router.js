// Router constants for aplicattion
const app_prefix = '/v1';
export const routes = {
  auth: {
    login: app_prefix + '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  admin: {
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings',
    tables: '/tables',
    maps: '/maps',
  },
};
