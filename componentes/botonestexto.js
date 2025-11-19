import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colores } from '../constante/colores';

export default function BotonTexto({ title, onPress }) {
  return (
    <View style={styles.contenedor}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.texto}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  texto: {
    color: colores.textoSecundario,
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
});
