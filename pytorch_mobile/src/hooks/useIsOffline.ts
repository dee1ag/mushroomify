import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useIsOffline = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      ({ isConnected, isInternetReachable }) => {
        if (isConnected !== null && isInternetReachable !== null) {
          setIsOffline(!(isConnected && isInternetReachable));
        }
      },
    );

    return () => removeNetInfoSubscription();
  }, []);

  return { isOffline };
};
