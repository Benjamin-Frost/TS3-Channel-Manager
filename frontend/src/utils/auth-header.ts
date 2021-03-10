import AuthService from '../Auth/services/auth';

const authHeader = () => {
  const user = AuthService.getCurrentUser();

  return user && user.accessToken
    ? { Authorization: 'Bearer ' + user.accessToken }
    : {};
};

export default authHeader;
