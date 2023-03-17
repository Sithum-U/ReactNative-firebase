import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Registration from './screens/Registration';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';
import Dashboard from './screens/Dashboard';
import AddTask from './screens/AddTask';
import GetTasks from './screens/GetTasks';
import UpdateTask from './screens/UpdateTask';

const Stack = createStackNavigator();

function Main() {
  const [initialization, setInitialization] = useState(true);
  const [user, setUser] = useState();

  // handling user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initialization) setInitialization(false);
  }

  useEffect(() => {
    const userStatus = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return userStatus;
  }, [])

  if (initialization) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={headerOptions} />
        <Stack.Screen name='Registration' component={Registration} options={headerOptions} />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name='Dashboard' component={Dashboard} options={headerOptions} />
      <Stack.Screen name='AddTask' component={AddTask} options={headerOptions} />
      <Stack.Screen name='GetTasks' component={GetTasks} options={headerOptions} />
      <Stack.Screen name='UpdateTask' component={UpdateTask} options={headerOptions} />
    </Stack.Navigator>
  )

}

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFD7ED',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const headerOptions = { headerShown: true, headerStyle: { backgroundColor: "#0074B7" }, headerTintColor: "white" }

AppRegistry.registerComponent(appName, () => Main);
