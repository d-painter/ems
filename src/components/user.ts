type authProps = {
  isLoggedIn: true | false;
  loginFunc: () => void;
  logoutFunc: () => void;
  isAuthenticated: () => boolean;
};

export const auth: authProps = {
  isLoggedIn: true,
  loginFunc() {
    this.isLoggedIn = true;
  },
  logoutFunc() {
    this.isLoggedIn = false;
  },
  isAuthenticated() {
    return this.isLoggedIn;
  },
};
