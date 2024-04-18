import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/SignIn';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import FileScreen from './screens/File';
import { AuthProvider, AuthContext } from './AuthContext';
import Intro from './screens/Intro';
import FirstScan from './screens/Firstscan';
import Home from './screens/Home';
import Share from './screens/Share';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
   
    <Stack.Screen name="Intro" component={Intro} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Share" component={Share} />
    
    <Stack.Screen name="FirstScan" component={FirstScan} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="File" component={FileScreen} />
  </Tab.Navigator>
);

export default App;