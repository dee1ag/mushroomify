import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { COLORS } from '../../utils/constants';
import { styles } from './styles';

type TProps = NativeStackScreenProps<RootStackParamList, ScreenNames.WebViewScreen>;

const WebViewScreen = ({ navigation, route }: TProps) => {
  const { name } = route.params;
  const webWiew = useRef<WebView | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { top } = useSafeAreaInsets();

  const onBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={isLoading} color={COLORS.black} size="large" />
        </View>
      )}
      <View style={[styles.header, { height: 56 + (top || 8), paddingTop: top || 8 }]}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" size={28} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webWiew}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        source={{ uri: `https://en.wikipedia.org/wiki/${name}` }}
      />
    </View>
  );
};

export default WebViewScreen;
