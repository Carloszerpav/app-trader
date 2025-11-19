import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import Boton from '../componentes/botones';
import BotonTexto from '../componentes/botonestexto';
import { colores } from '../constante/colores';

export default function TipoDeUsuario({ navigation }) {
const seleccionarTipo = (tipo) => {
  navigation.navigate('Registro', { tipo });
};


  const irAInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.contenido}>
          {/* Logo */}
          <Image
            source={require('../imagenes/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Boton
            title="Soy Inversionista"
            onPress={() => seleccionarTipo('Inversionista')}
            backgroundColor="#191919"
            textColor="#ffffff"
          />

          <Boton
            title="Soy Trader"
            onPress={() => seleccionarTipo('Trader')}
            backgroundColor="#191919"
            textColor="#ffffff"
          />

          <View style={styles.links}>
            <BotonTexto title="¿Ya tienes cuenta?" onPress={irAInicio} />
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
  contenido: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 400,
    height: 260,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 30,
    textAlign: 'center',
  },
  links: {
    alignItems: 'center',
    marginTop: 20,
  },
  social: {
    marginTop: 40,
  },
});