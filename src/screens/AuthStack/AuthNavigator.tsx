import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Welcome from './Welcome';
import Wellness from './Wellness';
import Login from './Login';
import Register from './Register';
import { COLORS } from '../../common/Utils/Colors';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const handleSplashComplete = () => {
    setIsSplashComplete(true);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.WHITE },
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Welcome" 
        component={Welcome}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Wellness" 
        component={Wellness}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator; 