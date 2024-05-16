import { LoginButton } from '@telegram-auth/react';
import { useEffect } from 'react';

interface ButtonProps {
  botUsername: string;
  authUrl: string;
  handleUserData: (data: any) => void
}

const TelegramLogin = ({ botUsername, authUrl, handleUserData }: ButtonProps) => {
  useEffect(() => {
    // Function to parse and log URL parameters and set login status
    const parseUrlParams = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      // Check if the URL contains the user's ID or a specific token that indicates a successful login
      if (urlParams.has('id')) {
        const userData = {
          id: urlParams.get('id'),
          first_name: urlParams.get('first_name'),
          last_name: urlParams.get('last_name'),
          username: urlParams.get('username'),
          photo_url: urlParams.get('photo_url'),
          auth_date: urlParams.get('auth_date'),
          hash: urlParams.get('hash')
        };

        console.log('Authenticated User Details:', userData);
        handleUserData(userData)
        localStorage.setItem('userDetails', JSON.stringify(userData));
        // Set loginStatus to true in local storage
        localStorage.setItem('loginStatus', 'true');

      } 
    };

    parseUrlParams();
  }, []);

  return (
    <LoginButton
      botUsername={botUsername}
      authCallbackUrl={authUrl}
      buttonSize="large"
      cornerRadius={5}
      showAvatar={true}
      lang="en"
    />
  );
};

export default TelegramLogin;
