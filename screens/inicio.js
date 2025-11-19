import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';

import Input from '../componentes/input';
import Boton from '../componentes/botones';
import BotonTexto from '../componentes/botonestexto';
import { colores } from '../constante/colores';

export default function InicioSesion({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  const manejarLogin = () => {
    // Navegar al dashboard directamente (solo front-end, sin validación)
    if (navigation && navigation.navigate) {
      navigation.navigate('Dashboard');
    } else {
      console.error('Navigation no está disponible');
    }
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.interno}>
          {/* Logo */}
          <Image
            source={require('../imagenes/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Input
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          <Input
            placeholder="Contraseña"
            value={clave}
            onChangeText={setClave}
            secureTextEntry
          />

          <Boton
            title="Iniciar sesión"
            onPress={manejarLogin}
          />

          <View style={styles.links}>
            <BotonTexto
              title="¿Has olvidado tu contraseña?"
              onPress={() => Alert.alert('Recuperar contraseña')}
            />
            <BotonTexto
              title="Regístrate aquí"
              onPress={() => navigation.navigate('TipoDeUsuario')}
            />
          </View>

          <View style={styles.social}>
            <Boton
              title="Continuar con Google"
              iconName="google"
              onPress={() => Alert.alert('Google Login')}
            />
            <Boton
              title="Continuar con Apple"
              iconName="apple"
              onPress={() => Alert.alert('Apple Login')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  interno: {
    padding: 20,
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  logo: {
    width: 400,
    height: 260,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  links: {
    alignItems: 'center',
    marginTop: 10,
  },
  social: {
    marginTop: 30,
  },
});
