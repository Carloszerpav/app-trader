import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colores } from '../constante/colores';
import { FontAwesome } from '@expo/vector-icons';

export default function Boton({ title, onPress, iconName, iconColor = '#121212', backgroundColor, textColor }) {
  return (
    <TouchableOpacity
      style={[styles.boton, backgroundColor ? { backgroundColor } : { backgroundColor: colores.botonPrincipal }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.contenido}>
        {iconName && (
          <FontAwesome
            name={iconName}
            size={20}
            color={iconColor}
            style={{ marginRight: 10 }}
          />
        )}
        <Text style={[styles.texto, textColor ? { color: textColor } : { color: colores.textoBotonPrincipal }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
  },
});
