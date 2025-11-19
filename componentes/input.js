import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colores } from '../constante/colores';

export default function Input({ value, onChangeText, placeholder, secureTextEntry, keyboardType }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colores.textoSecundario}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: colores.fondoInput,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: colores.textoClaro,
  },
});
