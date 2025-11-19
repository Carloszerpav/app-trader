import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Boton from '../componentes/botones';
import Input from '../componentes/input';
import { colores } from '../constante/colores';

export default function Negociacion({ route, navigation }) {
  const { trader } = route.params || {};
  const [monto, setMonto] = useState('');
  const [tipoInversion, setTipoInversion] = useState('Copiar operaciones');
  const [plazo, setPlazo] = useState('1 mes');

  const tiposInversion = [
    { id: 1, nombre: 'Copiar operaciones', descripcion: 'Copia automática de todas las operaciones del trader' },
    { id: 2, nombre: 'Inversión fija', descripcion: 'Inversión con retorno fijo mensual' },
    { id: 3, nombre: 'Portafolio personalizado', descripcion: 'Estrategia personalizada según tus objetivos' },
  ];

  const plazos = ['1 mes', '3 meses', '6 meses', '12 meses'];

  const iniciarNegociacion = () => {
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }

    Alert.alert(
      'Negociación Iniciada',
      `Has iniciado una negociación con ${trader?.nombre || 'el trader'} por $${parseFloat(monto).toLocaleString('es-ES')}`,
      [
        {
          text: 'Ver detalles',
          onPress: () => navigation.navigate('Dashboard'),
        },
        {
          text: 'Continuar explorando',
          style: 'cancel',
          onPress: () => navigation.navigate('Traders'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colores.textoClaro} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Iniciar Negociación</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        {/* Información del Trader */}
        <View style={styles.traderInfo}>
          <View style={styles.avatarContainer}>
            <FontAwesome name={trader?.avatar || 'user-circle'} size={50} color={colores.textoSecundario} />
            {trader?.activo && <View style={styles.indicadorActivo} />}
          </View>
          <View style={styles.traderDetalle}>
            <Text style={styles.traderNombre}>{trader?.nombre || 'Trader'}</Text>
            <Text style={styles.traderEspecialidad}>{trader?.especialidad || 'Especialidad'}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{trader?.rating || '0.0'}</Text>
            </View>
          </View>
        </View>

        {/* Monto de Inversión */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Monto de Inversión</Text>
          <Input
            placeholder="Ingresa el monto"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />
          <View style={styles.montosRapidos}>
            <TouchableOpacity style={styles.montoRapido} onPress={() => setMonto('500')}>
              <Text style={styles.montoRapidoTexto}>$500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.montoRapido} onPress={() => setMonto('1000')}>
              <Text style={styles.montoRapidoTexto}>$1,000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.montoRapido} onPress={() => setMonto('5000')}>
              <Text style={styles.montoRapidoTexto}>$5,000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.montoRapido} onPress={() => setMonto('10000')}>
              <Text style={styles.montoRapidoTexto}>$10,000</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tipo de Inversión */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Tipo de Inversión</Text>
          {tiposInversion.map((tipo) => (
            <TouchableOpacity
              key={tipo.id}
              style={[
                styles.tipoInversionItem,
                tipoInversion === tipo.nombre && styles.tipoInversionActivo,
              ]}
              onPress={() => setTipoInversion(tipo.nombre)}
            >
              <View style={styles.tipoInversionInfo}>
                <Text style={styles.tipoInversionNombre}>{tipo.nombre}</Text>
                <Text style={styles.tipoInversionDescripcion}>{tipo.descripcion}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  tipoInversion === tipo.nombre && styles.radioActivo,
                ]}
              >
                {tipoInversion === tipo.nombre && (
                  <View style={styles.radioInterno} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plazo */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Plazo de Inversión</Text>
          <View style={styles.plazosContainer}>
            {plazos.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.plazoItem, plazo === p && styles.plazoActivo]}
                onPress={() => setPlazo(p)}
              >
                <Text
                  style={[
                    styles.plazoTexto,
                    plazo === p && styles.plazoTextoActivo,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resumen */}
        {monto && (
          <View style={styles.resumenContainer}>
            <Text style={styles.resumenTitulo}>Resumen de la Negociación</Text>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Monto:</Text>
              <Text style={styles.resumenValor}>
                ${parseFloat(monto || 0).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Tipo:</Text>
              <Text style={styles.resumenValor}>{tipoInversion}</Text>
            </View>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenLabel}>Plazo:</Text>
              <Text style={styles.resumenValor}>{plazo}</Text>
            </View>
            <View style={[styles.resumenItem, styles.resumenItemTotal]}>
              <Text style={styles.resumenLabelTotal}>Total a invertir:</Text>
              <Text style={styles.resumenValorTotal}>
                ${parseFloat(monto || 0).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        )}

        {/* Botón de Acción */}
        <View style={styles.botonContainer}>
          <Boton
            title="Confirmar Negociación"
            onPress={iniciarNegociacion}
            iconName="check"
            backgroundColor={colores.botonPrincipal}
            textColor={colores.textoBotonPrincipal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 20,
  },
  traderInfo: {
    flexDirection: 'row',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  indicadorActivo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#191919',
  },
  traderDetalle: {
    flex: 1,
  },
  traderNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  traderEspecialidad: {
    fontSize: 14,
    color: colores.textoSecundario,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colores.textoClaro,
    marginLeft: 4,
    fontWeight: '600',
  },
  seccion: {
    marginBottom: 25,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 15,
  },
  montosRapidos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  montoRapido: {
    flex: 1,
    backgroundColor: '#191919',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  montoRapidoTexto: {
    color: colores.textoClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  tipoInversionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tipoInversionActivo: {
    borderColor: colores.botonPrincipal,
  },
  tipoInversionInfo: {
    flex: 1,
  },
  tipoInversionNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  tipoInversionDescripcion: {
    fontSize: 12,
    color: colores.textoSecundario,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colores.textoSecundario,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActivo: {
    borderColor: colores.botonPrincipal,
  },
  radioInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colores.botonPrincipal,
  },
  plazosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  plazoItem: {
    width: '48%',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  plazoActivo: {
    borderColor: colores.botonPrincipal,
  },
  plazoTexto: {
    fontSize: 14,
    color: colores.textoClaro,
    fontWeight: '600',
  },
  plazoTextoActivo: {
    color: colores.botonPrincipal,
  },
  resumenContainer: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  resumenTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 15,
  },
  resumenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resumenLabel: {
    fontSize: 14,
    color: colores.textoSecundario,
  },
  resumenValor: {
    fontSize: 14,
    color: colores.textoClaro,
    fontWeight: '600',
  },
  resumenItemTotal: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#242323',
  },
  resumenLabelTotal: {
    fontSize: 16,
    color: colores.textoClaro,
    fontWeight: 'bold',
  },
  resumenValorTotal: {
    fontSize: 18,
    color: colores.botonPrincipal,
    fontWeight: 'bold',
  },
  botonContainer: {
    marginBottom: 30,
  },
});

