import { SavedResult, ScanningResult } from './types';

export enum ScreenNames {
  HomeScreen = 'HomeScreen',
  CameraScreen = 'CameraScreen',
  ImageOverlayScreen = 'ImageOverlayScreen',
  WebViewScreen = 'WebViewScreen',
}

export type RootStackParamList = {
  [ScreenNames.HomeScreen]: undefined;
  [ScreenNames.CameraScreen]: undefined;
  [ScreenNames.ImageOverlayScreen]: { result: ScanningResult | SavedResult; fromHome: boolean };
  [ScreenNames.WebViewScreen]: { name: string };
};
