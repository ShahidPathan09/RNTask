/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import MainNavigator from './src/Navigator/MainNavigator';

import {store} from './src/Store/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
