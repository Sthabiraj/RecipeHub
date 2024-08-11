import Cookies from 'js-cookie';

// Function to get the token from cookies and attach it to request headers
const getAuthHeaders = () => {
  const token = Cookies.get('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default getAuthHeaders;
