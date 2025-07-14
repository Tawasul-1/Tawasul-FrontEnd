export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
    console.error('Status Code:', error.response.status);
    console.error('Headers:', error.response.headers);
    
    if (error.response.status === 404) {
      throw new Error('Resource not found');
    }
    if (error.response.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response.status === 500) {
      throw new Error('Server error');
    }
    
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('API Request Error:', error.request);
    throw new Error('No response received from server');
  } else {
    console.error('API Setup Error:', error.message);
    throw new Error('Error setting up request');
  }
};