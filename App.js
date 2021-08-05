import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Login from './screens/Login';
import Register from './screens/Register';
import UserList from './screens/UserList';
import CreationScreen from './screens/CreationScreen';

function MyStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Iniciar Sesión"
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Regístrate"
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          title: "Lista de citas"
        }}
      />
      <Stack.Screen
        name="CreationScreen"
        component={CreationScreen}
        options={{
          title: "Registro de citas"
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}