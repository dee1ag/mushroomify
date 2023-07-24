import React, { useState } from 'react';
import { InteractionManager } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';

export const useIsTransitionEnded = () => {
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const timeout = setTimeout(() => setIsTransitionEnded(true), 0);
      // const task = InteractionManager.runAfterInteractions(() => {
      //   setIsTransitionEnded(true);
      // });

      // return () => task.cancel();
      return () => clearTimeout(timeout);
    }, []),
  );

  return isTransitionEnded;
};
