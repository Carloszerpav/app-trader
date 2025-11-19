import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colores } from '../constante/colores';
import Boton from '../componentes/botones';

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const [balanceTotal] = useState(125430.50);
  const [gananciaDia] = useState(2340.25);
  const [porcentajeDia] = useState(1.90);

  // Datos de portafolio
  const portafolio = [
    { id: 1, nombre: 'EUR/USD', tipo: 'Forex', cantidad: 50000, ganancia: '+2.5%', valor: 51250, positivo: true },
    { id: 2, nombre: 'BTC/USD', tipo: 'Crypto', cantidad: 30000, ganancia: '+5.2%', valor: 31560, positivo: true },
    { id: 3, nombre: 'AAPL', tipo: 'Acciones', cantidad: 25000, ganancia: '-1.1%', valor: 24725, positivo: false },
    { id: 4, nombre: 'Gold', tipo: 'Commodity', cantidad: 20000, ganancia: '+3.8%', valor: 20760, positivo: true },
  ];

  // Operaciones recientes
  const operacionesRecientes = [
    { id: 1, fecha: 'Hace 2 horas', tipo: 'Compra', activo: 'EUR/USD', cantidad: '$5,000', estado: 'Completada' },
    { id: 2, fecha: 'Hace 5 horas', tipo: 'Venta', activo: 'BTC/USD', cantidad: '$3,000', estado: 'Completada' },
    { id: 3, fecha: 'Ayer', tipo: 'Compra', activo: 'AAPL', cantidad: '$2,500', estado: 'Completada' },
  ];

  // Accesos rápidos
  const accesosRapidos = [
    { id: 1, titulo: 'Traders', icono: 'users', color: '#4CAF50', onPress: () => navigation.navigate('Traders') },
    { id: 2, titulo: 'Historial', icono: 'history', color: '#2196F3', onPress: () => {} },
    { id: 3, titulo: 'Análisis', icono: 'line-chart', color: '#FF9800', onPress: () => {} },
    { id: 4, titulo: 'Configuración', icono: 'cog', color: '#9E9E9E', onPress: () => {} },
  ];

  // Simular gráfico con barras
  const datosGrafico = [65, 70, 68, 75, 72, 78, 80, 82, 79, 85, 88, 90];
  const maxValor = Math.max(...datosGrafico);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.saludo}>Hola, Bienvenido</Text>
          <Text style={styles.fecha}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>
        <TouchableOpacity style={styles.iconoNotificacion}>
          <FontAwesome name="bell" size={24} color={colores.textoClaro} />
          <View style={styles.badgeNotificacion} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Balance Total */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance Total</Text>
          <Text style={styles.balanceValor}>${balanceTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          <View style={styles.gananciaContainer}>
            <FontAwesome 
              name={gananciaDia >= 0 ? "arrow-up" : "arrow-down"} 
              size={16} 
              color={gananciaDia >= 0 ? "#4CAF50" : "#F44336"} 
            />
            <Text style={[styles.gananciaTexto, { color: gananciaDia >= 0 ? "#4CAF50" : "#F44336" }]}>
              ${Math.abs(gananciaDia).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({porcentajeDia >= 0 ? '+' : ''}{porcentajeDia}%) hoy
            </Text>
          </View>
        </View>

        {/* Gráfico de Rendimiento */}
        <View style={styles.graficoContainer}>
          <Text style={styles.seccionTitulo}>Rendimiento (Últimos 12 meses)</Text>
          <View style={styles.grafico}>
            {datosGrafico.map((valor, index) => (
              <View key={index} style={styles.barraContainer}>
                <View 
                  style={[
                    styles.barra, 
                    { 
                      height: (valor / maxValor) * 100,
                      backgroundColor: valor >= 80 ? '#4CAF50' : valor >= 70 ? '#8BC34A' : '#FFC107'
                    }
                  ]} 
                />
                <Text style={styles.barraLabel}>{index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Accesos Rápidos */}
        <View style={styles.accesosContainer}>
          <Text style={styles.seccionTitulo}>Accesos Rápidos</Text>
          <View style={styles.accesosGrid}>
            {accesosRapidos.map((acceso) => (
              <TouchableOpacity
                key={acceso.id}
                style={styles.accesoItem}
                onPress={acceso.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.accesoIcono, { backgroundColor: acceso.color + '20' }]}>
                  <FontAwesome name={acceso.icono} size={24} color={acceso.color} />
                </View>
                <Text style={styles.accesoTitulo}>{acceso.titulo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Portafolio */}
        <View style={styles.portafolioContainer}>
          <View style={styles.portafolioHeader}>
            <Text style={styles.seccionTitulo}>Mi Portafolio</Text>
            <TouchableOpacity>
              <Text style={styles.verTodo}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          {portafolio.map((item) => (
            <View key={item.id} style={styles.portafolioItem}>
              <View style={styles.portafolioInfo}>
                <View style={styles.portafolioIcono}>
                  <FontAwesome 
                    name={item.tipo === 'Forex' ? 'exchange' : item.tipo === 'Crypto' ? 'bitcoin' : item.tipo === 'Acciones' ? 'bar-chart' : 'dollar'} 
                    size={20} 
                    color={colores.botonPrincipal} 
                  />
                </View>
                <View style={styles.portafolioDetalle}>
                  <Text style={styles.portafolioNombre}>{item.nombre}</Text>
                  <Text style={styles.portafolioTipo}>{item.tipo}</Text>
                </View>
              </View>
              <View style={styles.portafolioValores}>
                <Text style={styles.portafolioCantidad}>${item.valor.toLocaleString('es-ES')}</Text>
                <Text style={[styles.portafolioGanancia, { color: item.positivo ? '#4CAF50' : '#F44336' }]}>
                  {item.ganancia}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Operaciones Recientes */}
        <View style={styles.operacionesContainer}>
          <View style={styles.portafolioHeader}>
            <Text style={styles.seccionTitulo}>Operaciones Recientes</Text>
            <TouchableOpacity>
              <Text style={styles.verTodo}>Ver historial</Text>
            </TouchableOpacity>
          </View>
          {operacionesRecientes.map((operacion) => (
            <View key={operacion.id} style={styles.operacionItem}>
              <View style={styles.operacionInfo}>
                <View style={[styles.operacionIcono, { backgroundColor: operacion.tipo === 'Compra' ? '#4CAF5020' : '#F4433620' }]}>
                  <FontAwesome 
                    name={operacion.tipo === 'Compra' ? 'arrow-up' : 'arrow-down'} 
                    size={16} 
                    color={operacion.tipo === 'Compra' ? '#4CAF50' : '#F44336'} 
                  />
                </View>
                <View>
                  <Text style={styles.operacionTipo}>{operacion.tipo} • {operacion.activo}</Text>
                  <Text style={styles.operacionFecha}>{operacion.fecha}</Text>
                </View>
              </View>
              <View style={styles.operacionDetalle}>
                <Text style={styles.operacionCantidad}>{operacion.cantidad}</Text>
                <View style={[styles.operacionEstado, { backgroundColor: '#4CAF5020' }]}>
                  <Text style={[styles.operacionEstadoTexto, { color: '#4CAF50' }]}>{operacion.estado}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Botón para Explorar Traders */}
        <View style={styles.botonExplorarContainer}>
          <Boton
            title="Explorar Traders Disponibles"
            onPress={() => navigation.navigate('Traders')}
            iconName="users"
            backgroundColor={colores.botonPrincipal}
            textColor={colores.textoBotonPrincipal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  saludo: {
    fontSize: 18,
    fontWeight: '600',
    color: colores.textoClaro,
  },
  fecha: {
    fontSize: 12,
    color: colores.textoSecundario,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  iconoNotificacion: {
    position: 'relative',
    padding: 8,
  },
  badgeNotificacion: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  scrollView: {
    flex: 1,
  },
  balanceContainer: {
    backgroundColor: '#191919',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colores.textoSecundario,
    marginBottom: 8,
  },
  balanceValor: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 12,
  },
  gananciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gananciaTexto: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  graficoContainer: {
    backgroundColor: '#191919',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 15,
  },
  grafico: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginTop: 10,
  },
  barraContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barra: {
    width: '80%',
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  barraLabel: {
    fontSize: 10,
    color: colores.textoSecundario,
  },
  accesosContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  accesosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  accesoItem: {
    width: (width - 60) / 2,
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  accesoIcono: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  accesoTitulo: {
    fontSize: 14,
    color: colores.textoClaro,
    fontWeight: '600',
  },
  portafolioContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  portafolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  verTodo: {
    fontSize: 14,
    color: colores.botonPrincipal,
    fontWeight: '600',
  },
  portafolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  portafolioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  portafolioIcono: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#242323',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  portafolioDetalle: {
    flex: 1,
  },
  portafolioNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  portafolioTipo: {
    fontSize: 12,
    color: colores.textoSecundario,
  },
  portafolioValores: {
    alignItems: 'flex-end',
  },
  portafolioCantidad: {
    fontSize: 16,
    fontWeight: '600',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  portafolioGanancia: {
    fontSize: 14,
    fontWeight: '600',
  },
  operacionesContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  operacionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  operacionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  operacionIcono: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  operacionTipo: {
    fontSize: 14,
    fontWeight: '600',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  operacionFecha: {
    fontSize: 12,
    color: colores.textoSecundario,
  },
  operacionDetalle: {
    alignItems: 'flex-end',
  },
  operacionCantidad: {
    fontSize: 14,
    fontWeight: '600',
    color: colores.textoClaro,
    marginBottom: 6,
  },
  operacionEstado: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  operacionEstadoTexto: {
    fontSize: 10,
    fontWeight: '600',
  },
  botonExplorarContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
});
