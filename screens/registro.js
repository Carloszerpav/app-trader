import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Input from '../componentes/input';
import Boton from '../componentes/botones';
import { colores } from '../constante/colores';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Registro({ route, navigation }) {
  const { tipo } = route.params || {};  
  const [nombres, setNombres] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const crearCuenta = () => {
    if (!nombres || !correo || !telefono || !clave || !confirmarClave) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (clave !== confirmarClave) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (!aceptaTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }

    Alert.alert(
      'Cuenta creada', 
      `¡Bienvenido, ${nombres}!`,
      [
        {
          text: 'Continuar',
          onPress: () => navigation.navigate('Dashboard')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.interno}>
          <Image
            source={require('../imagenes/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

        <Text style={styles.subtitulo}>
          Registro para: {tipo === 'Trader' ? 'Trader' : 'Inversionista'}
        </Text>


          <View style={styles.formulario}>
            <Input
              placeholder="Nombres"
              value={nombres}
              onChangeText={setNombres}
            />
            <Input
              placeholder="Correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            <Input
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Contraseña"
              value={clave}
              onChangeText={setClave}
              secureTextEntry
            />
            <Input
              placeholder="Confirmar contraseña"
              value={confirmarClave}
              onChangeText={setConfirmarClave}
              secureTextEntry
            />

            {/* Checkbox de términos */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAceptaTerminos(!aceptaTerminos)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={aceptaTerminos ? 'check-square' : 'square-o'}
                size={20}
                color="#fff"
              />
              <Text style={styles.checkboxTexto}>
                Acepto los términos y condiciones
              </Text>
            </TouchableOpacity>

            <Boton title="Crear cuenta" onPress={crearCuenta} />
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
    flexGrow: 1,
  },
  logo: {
    width: 400,
    height: 240,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: colores.textoClaro,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  formulario: {
    backgroundColor: '#242323',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  checkboxTexto: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
});
