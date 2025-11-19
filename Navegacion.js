import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioSesion from './screens/inicio';
import TipoDeUsuario from './screens/tipodeusuario';
import Registro from './screens/registro';
import Dashboard from './screens/dashboard';
import Traders from './screens/traders';
import DetalleTrader from './screens/detalletrader';
import Negociacion from './screens/negociacion';

const Stack = createNativeStackNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicio" component={InicioSesion} />
        <Stack.Screen name="TipoDeUsuario" component={TipoDeUsuario} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Traders" component={Traders} />
        <Stack.Screen name="DetalleTrader" component={DetalleTrader} />
        <Stack.Screen name="Negociacion" component={Negociacion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
