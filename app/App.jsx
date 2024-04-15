import { StatusBar } from 'expo-status-bar';
import { MD2LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import * as NavigationBar from 'expo-navigation-bar';
import AuthNavigator from './src/navigator/AuthNavigator';
import StackNavigator from './src/navigator/StackNavigator';
import { useAuthentication } from './src/utils/useAuthentication';
import { Provider } from 'react-redux';
import store from './src/Store';
import { useEffect, useRef, useState } from 'react';
import Splash from './src/components/layouts/Splash';
import { setBackgroundColorAsync, setVisibilityAsync } from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { Vibration } from 'react-native';
import { getTokenforNotification } from './src/utils/notification/getToken';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const myTheme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    secondary: '#24A6C6',
    primary: '#003BA0',
    primaryLight: '#DEE1E6',
    primaryDark: '#003BA0',
    background: 'white',
  },
};

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    getTokenforNotification().then(token => {});

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
      Vibration.vibrate();
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  NavigationBar.setBackgroundColorAsync(myTheme.colors.background);
  NavigationBar.setButtonStyleAsync("dark");


  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}



function Main() {
  const [  isClothFetch, setIsCloth ] = useState(false);
  const [dbPath, setDbPath] = useState(false);
  const { liveUser } = useAuthentication();


  if (!dbPath || !isClothFetch) {
    return <Splash setDbPath={() => setDbPath(true)} setIsCloth={() => setIsCloth(true)} bg={myTheme.colors.primaryDark} />
  }

  setVisibilityAsync('visible');
  setBackgroundColorAsync('white');

  return (
    <PaperProvider theme={myTheme}>
      <StatusBar backgroundColor={myTheme.colors.background} style='dark' />
      {liveUser ? <StackNavigator /> : <AuthNavigator />}
    </PaperProvider>
  )
}