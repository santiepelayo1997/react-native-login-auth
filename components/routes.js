import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './dashboardScreen.js'
import Login from './loginScreen.js'
import ActivityScreen from './authLoading.js'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ActivityScreen" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} headerMode="none"/>
        <Stack.Screen name="Dashboard" component={Dashboard} headerMode="none"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
