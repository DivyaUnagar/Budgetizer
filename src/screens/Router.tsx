import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Home from './AppStack/Home';
import Graph from './AppStack/Graph';
import AddTransaction from './AppStack/AddTransaction';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS } from '../common/Utils/ScreenName';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../common/Utils/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { height } from '../common/Utils/Constant';
import { IMAGES } from '../common/Utils/Images';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  console.log('CustomTabBar rendered with state:', state);
  console.log('Routes:', state.routes);

  const handleAddPress = () => {
    // Handle the floating action button press
    navigation.navigate(SCREENS.ADD_TRANSACTION);
    console.log('Add button pressed');
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate(state.routes[0].name)}
        >
          <Image source={IMAGES.HOME} style={[styles.homeTabIcon, { tintColor: state.index === 0 ? COLORS.THEME : COLORS.BLACK }]} />
        </TouchableOpacity>

        <View style={styles.centerSpacer} />

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate(state.routes[1].name)}
        >
          <Image source={IMAGES.GRAPH} style={[styles.tabIcon, { tintColor: state.index === 1 ? COLORS.THEME : COLORS.BLACK }]} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tab Navigator Component
const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen 
        name={SCREENS.HOME} 
        component={Home}
      />
      
      <Tab.Screen 
        name={SCREENS.GRAPH} 
        component={Graph}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="TabNavigator" 
            component={TabNavigator}
          />
          <Stack.Screen 
            name={SCREENS.ADD_TRANSACTION} 
            component={AddTransaction}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}

export default Router

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.OFF_WHITE,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: RFValue(15),
    height: Platform.OS === 'ios' ? height * 0.07 : height * 0.06,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(8),
    borderRadius: RFValue(8),
    marginHorizontal: RFValue(5),
  },
  centerSpacer: {
    width: RFValue(56),
    height: RFValue(56),
  },
  tabIcon: {
    height: RFValue(28, height),
    width: RFValue(28, height),
  },
  homeTabIcon: {
    width: RFValue(28, height),
    height: RFValue(28, height),
  },
  tabLabel: {
    fontSize: RFValue(10),
    fontWeight: '500',
    textAlign: 'center',
  },
  fab: {
    width: RFValue(56),
    height: RFValue(56),
    borderRadius: RFValue(28),
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: RFValue(-28),
    left: '50%',
    marginLeft: RFValue(-28),
    elevation: 8,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    color: COLORS.WHITE,
    fontSize: RFValue(28),
    // fontWeight: 'bold',
  },
})