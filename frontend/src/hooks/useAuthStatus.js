import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setCheckingAuthStatus(false);
  }, [user]);

  const loggedIn = useMemo(() => Boolean(user), [user]);

  return { loggedIn, checkingAuthStatus };
};
