import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Container/Home';
import UpdateData from '../Container/UpdateData';

function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UpdateData" component={UpdateData} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
