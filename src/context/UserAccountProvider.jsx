import { useState } from 'react';
import UserAccount from './UserAccount';

export default function UserAccountProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({
    username: 'tickle122',
    name: 'Tom Tickle',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
  });

  // const [loggedUser, setLoggedUser] = useState(null);

  return (
    <UserAccount.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserAccount.Provider>
  );
}
