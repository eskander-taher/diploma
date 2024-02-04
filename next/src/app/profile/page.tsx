import { useState, useEffect } from 'react';
import axios from 'axios'; // Or use `fetch` directly

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Or retrieve from server-side storage
    if (token) {
      setIsLoggedIn(true);
      fetchData(token);
    }
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle errors gracefully (e.g., retry, redirect to login)
    }
  };

  return (
    <div>
      {isLoggedIn && profileData ? (
        <div>
          <h1>Welcome, {profileData.name}</h1>
          <p>Email: {profileData.email}</p>
          {/* Display other profile information */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}
