import React, { useEffect, useState } from 'react';
import Footer from './Footer';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const username = 'ReyhanZidany';

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!window.caches) {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setProfileData(data);
        return;
      }

      const cache = await caches.open('profile-cache');
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const clonedResponse = response.clone();
        const data = await response.json();
        setProfileData(data);

        cache.put(`https://api.github.com/users/${username}`, clonedResponse);
      } catch (error) {
        console.error("Error fetching profile:", error);

        if (isOffline) {
          const cachedResponse = await cache.match(`https://api.github.com/users/${username}`);
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setProfileData(cachedData);
          }
        }
      }
    };

    fetchProfile();
  }, [username, isOffline]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-md mx-auto p-6 text-center flex flex-col items-center justify-center flex-grow">
        <img 
          src={profileData.avatar_url} 
          alt={profileData.name} 
          className="rounded-full mb-4 w-32 h-32" 
        />
        <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
        <a 
          href={profileData.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          Visit GitHub Profile
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
