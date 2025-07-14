/**
 * Utility functions for extracting tokens from verification URLs
 */

/**
 * Extracts token from a verification URL
 * Supports multiple formats:
 * 1. /verify-email/{token}
 * 2. /verify-email?token={token}&uid={uid}
 * 3. /users/activate/{token}/
 * 
 * @param {string} url - The verification URL
 * @returns {object} - Object containing token and uid (if available)
 */
export const extractTokenFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    // Format 1: /verify-email/{token}
    const pathTokenMatch = pathname.match(/\/verify-email\/([^\/\?]+)/);
    if (pathTokenMatch) {
      return {
        token: pathTokenMatch[1],
        uid: searchParams.get('uid') || null,
        email: searchParams.get('email') || null
      };
    }

    // Format 2: /verify-email?token={token}&uid={uid}
    const queryToken = searchParams.get('token');
    if (queryToken) {
      return {
        token: queryToken,
        uid: searchParams.get('uid') || null,
        email: searchParams.get('email') || null
      };
    }

    // Format 3: /users/activate/{token}/
    const activateTokenMatch = pathname.match(/\/users\/activate\/([^\/\?]+)/);
    if (activateTokenMatch) {
      return {
        token: activateTokenMatch[1],
        uid: null,
        email: searchParams.get('email') || null
      };
    }

    return null;
  } catch (error) {
    console.error('Error extracting token from URL:', error);
    return null;
  }
};

/**
 * Decodes a JWT token to extract payload information
 * @param {string} token - The JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Validates if a token is expired
 * @param {string} token - The JWT token
 * @returns {boolean} - True if token is expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
}; 