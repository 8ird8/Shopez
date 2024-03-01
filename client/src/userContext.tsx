import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface UserInfo {
  userId: string;
  avatar: string;
  username: string;
  email: string;
  phone: string;
  adresse : string;
}

interface UserContextType {
    TokenInfo: UserInfo;
  currentUserInfo: UserInfo;
  fetchTokenInfo: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
    TokenInfo: { userId: '', avatar: '', username: '', email: '', phone: '', adresse: ''},
  currentUserInfo : { userId: '', avatar: '', username: '', email: '', phone: '', adresse: ''},
  fetchTokenInfo: async () => {},
  fetchCurrentUser: async () => {},
});

export const UserProvider = ({ children }: Props) => {
  const [TokenInfo, setTokenInfo] = useState<UserInfo>({ userId: '', avatar: '', username: '', email: '', phone: '', adresse: ''});
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo>({ userId: '', avatar: '', username: '', email: '', phone: '', adresse: '' });
  // const token = localStorage.getItem('token');

  const fetchTokenInfo = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get("https://shopez-q69l.onrender.com/api/userbytoken", {
          withCredentials: true,
        });
  
        if (res.status === 200) {
          setTokenInfo(res.data.TokenInfo);
  
          // Now that userInfo is set, fetch the currentUserInfo
          await fetchCurrentUser();
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    if (TokenInfo.userId) {
      try {
        const res = await axios.get(`https://shopez-q69l.onrender.com/api/user/${TokenInfo.userId}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setCurrentUserInfo(res.data.currentUserInfo);
        } else {
          console.error("An error occurred while fetching user with that id");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }
  }, [TokenInfo.userId]);

  return (
    <UserContext.Provider value={{ TokenInfo, currentUserInfo, fetchTokenInfo, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};



