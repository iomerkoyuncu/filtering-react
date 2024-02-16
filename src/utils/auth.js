import cookie from './cookie';

const auth = {
  isLoggedIn() {
    const token = cookie.getCookie('Bearer');
    const user = localStorage.getItem('user');
    const permissions = localStorage.getItem('permissions');

    return !!user && !!token && !!permissions;
  },

  logOut() {
    cookie.removeCookie('Bearer');
    cookie.removeCookie('expiresAt');
    cookie.removeCookie('instanceToken');
    cookie.removeCookie('instanceExpiresAt');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    localStorage.removeItem('appConfig');
    localStorage.removeItem('instance');
    localStorage.removeItem('selectedInstance');
  },

  getObserver() {
    const user_observer = localStorage.getItem('observer');
    return user_observer ? JSON.parse(user_observer) : false;
  },

  getPermissions() {
    const permissions_string = localStorage.getItem('permissions');
    const permissions = permissions_string
      ? JSON.parse(permissions_string)
      : [];
    return permissions?.data?.data?.permissions;
  },
};

export { auth };
