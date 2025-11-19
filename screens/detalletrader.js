import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Boton from '../componentes/botones';
import { colores } from '../constante/colores';

export default function DetalleTrader({ route, navigation }) {
  const { trader } = route.params || {};

  const estadisticas = [
    { label: 'Rendimiento Total', valor: '+156.8%', icono: 'line-chart' },
    { label: 'Operaciones Exitosas', valor: '87%', icono: 'check-circle' },
    { label: 'Tiempo Activo', valor: '3 años', icono: 'clock-o' },
    { label: 'Mínimo de Inversión', valor: '$500', icono: 'dollar' },
  ];

  const historialOperaciones = [
    { fecha: 'Hoy', tipo: 'Compra', activo: 'EUR/USD', resultado: '+2.5%', positivo: true },
    { fecha: 'Ayer', tipo: 'Venta', activo: 'BTC/USD', resultado: '+5.2%', positivo: true },
    { fecha: '15 Nov', tipo: 'Compra', activo: 'AAPL', resultado: '-1.1%', positivo: false },
    { fecha: '14 Nov', tipo: 'Venta', activo: 'Gold', resultado: '+3.8%', positivo: true },
  ];

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colores.textoClaro} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Perfil del Trader</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        {/* Perfil del Trader */}
        <View style={styles.perfilContainer}>
          <View style={styles.avatarGrande}>
            <FontAwesome name={trader?.avatar || 'user-circle'} size={80} color={colores.textoSecundario} />
            {trader?.activo && <View style={styles.indicadorActivoGrande} />}
          </View>
          <Text style={styles.nombreGrande}>{trader?.nombre || 'Trader'}</Text>
          <Text style={styles.especialidadGrande}>{trader?.especialidad || 'Especialidad'}</Text>
          <View style={styles.ratingGrande}>
            <FontAwesome name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingTexto}>{trader?.rating || '0.0'}</Text>
            <Text style={styles.seguidoresGrande}> • {trader?.seguidores || '0'} seguidores</Text>
          </View>
        </View>

        {/* Estadísticas */}
        <Text style={styles.seccionTitulo}>Estadísticas</Text>
        <View style={styles.estadisticasGrid}>
          {estadisticas.map((stat, index) => (
            <View key={index} style={styles.tarjetaEstadistica}>
              <FontAwesome name={stat.icono} size={24} color={colores.botonPrincipal} />
              <Text style={styles.estadisticaLabel}>{stat.label}</Text>
              <Text style={styles.estadisticaValor}>{stat.valor}</Text>
            </View>
          ))}
        </View>

        {/* Rendimiento */}
        <Text style={styles.seccionTitulo}>Rendimiento Anual</Text>
        <View style={styles.rendimientoContainer}>
          <Text style={styles.rendimientoValor}>{trader?.gananciaAnual || '+0.0%'}</Text>
          <View style={styles.rendimientoBarra}>
            <View style={[styles.rendimientoBarraLlena, { width: '75%' }]} />
          </View>
          <Text style={styles.rendimientoDescripcion}>
            Rendimiento promedio de los últimos 12 meses
          </Text>
        </View>

        {/* Historial de Operaciones */}
        <Text style={styles.seccionTitulo}>Operaciones Recientes</Text>
        <View style={styles.historialContainer}>
          {historialOperaciones.map((operacion, index) => (
            <View key={index} style={styles.operacionItem}>
              <View style={styles.operacionInfo}>
                <Text style={styles.operacionFecha}>{operacion.fecha}</Text>
                <Text style={styles.operacionTipo}>{operacion.tipo} • {operacion.activo}</Text>
              </View>
              <Text
                style={[
                  styles.operacionResultado,
                  operacion.positivo ? styles.operacionPositiva : styles.operacionNegativa,
                ]}
              >
                {operacion.resultado}
              </Text>
            </View>
          ))}
        </View>

        {/* Botones de Acción */}
        <View style={styles.accionesContainer}>
          <Boton
            title="Iniciar Negociación"
            onPress={() => navigation.navigate('Negociacion', { trader })}
            iconName="handshake-o"
            backgroundColor={colores.botonPrincipal}
            textColor={colores.textoBotonPrincipal}
          />
          <TouchableOpacity style={styles.botonSecundario}>
            <FontAwesome name="envelope" size={18} color={colores.textoClaro} />
            <Text style={styles.botonSecundarioTexto}>Enviar Mensaje</Text>
          </TouchableOpacity>
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
  perfilContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarGrande: {
    position: 'relative',
    marginBottom: 15,
  },
  indicadorActivoGrande: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: colores.fondo,
  },
  nombreGrande: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 5,
  },
  especialidadGrande: {
    fontSize: 16,
    color: colores.textoSecundario,
    marginBottom: 10,
  },
  ratingGrande: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTexto: {
    fontSize: 18,
    color: colores.textoClaro,
    marginLeft: 6,
    fontWeight: '600',
  },
  seguidoresGrande: {
    fontSize: 14,
    color: colores.textoSecundario,
    marginLeft: 4,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginTop: 20,
    marginBottom: 15,
  },
  estadisticasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tarjetaEstadistica: {
    width: '48%',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  estadisticaLabel: {
    fontSize: 12,
    color: colores.textoSecundario,
    marginTop: 8,
    textAlign: 'center',
  },
  estadisticaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginTop: 4,
  },
  rendimientoContainer: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  rendimientoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  rendimientoBarra: {
    width: '100%',
    height: 8,
    backgroundColor: '#242323',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  rendimientoBarraLlena: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  rendimientoDescripcion: {
    fontSize: 12,
    color: colores.textoSecundario,
    textAlign: 'center',
  },
  historialContainer: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  operacionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#242323',
  },
  operacionInfo: {
    flex: 1,
  },
  operacionFecha: {
    fontSize: 12,
    color: colores.textoSecundario,
    marginBottom: 4,
  },
  operacionTipo: {
    fontSize: 14,
    color: colores.textoClaro,
  },
  operacionResultado: {
    fontSize: 16,
    fontWeight: '600',
  },
  operacionPositiva: {
    color: '#4CAF50',
  },
  operacionNegativa: {
    color: '#F44336',
  },
  accionesContainer: {
    marginBottom: 30,
  },
  botonSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 10,
  },
  botonSecundarioTexto: {
    color: colores.textoClaro,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

