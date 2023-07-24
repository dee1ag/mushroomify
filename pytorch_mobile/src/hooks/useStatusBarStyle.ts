import React from 'react';
import { InteractionManager, StatusBar, StatusBarStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';

export const useStatusBarStyle = (style: StatusBarStyle) => {
  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        StatusBar.setBarStyle(style, true);
      });

      return () => task.cancel();
    }, [style]),
  );
};
