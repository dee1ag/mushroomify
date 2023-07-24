import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { CameraScreen } from '../screens/CameraScreen/CameraScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { RootStackParamList, ScreenNames } from '../types/navigation';
import { ImageOverlayScreen } from '../screens/ImageOverlayScreen/ImageOverlayScreen';
import WebViewScreen from '../screens/WebViewScreen/WebViewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'slide_from_right',
  };

  const overlayOption: NativeStackNavigationOptions = {
    presentation: 'transparentModal',
    animation: 'fade',
  };

  return (
    <Stack.Navigator initialRouteName={ScreenNames.HomeScreen} screenOptions={screenOptions}>
      <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.CameraScreen} component={CameraScreen} />
      <Stack.Screen
        name={ScreenNames.ImageOverlayScreen}
        component={ImageOverlayScreen}
        options={overlayOption}
      />
      <Stack.Screen name={ScreenNames.WebViewScreen} component={WebViewScreen} />
    </Stack.Navigator>
  );
};
