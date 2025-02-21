import { useState } from 'react';
import UserAccount from './UserAccount';
import { useNavigate } from 'react-router-dom';

export default function UserAccountProvider({ children }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    username: 'tickle122',
    name: 'Tom Tickle',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
  });

  // const [loggedUser, setLoggedUser] = useState(null);

  return (
    <UserAccount.Provider
      value={{
        loggedUser,
        setLoggedUser,
        error,
        setError,
        loading,
        setLoading,
        isErrorPopupOpen,
        setIsErrorPopupOpen,
        navigate,
      }}
    >
      {children}
    </UserAccount.Provider>
  );
}
