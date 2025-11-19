import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Boton from '../componentes/botones';
import { colores } from '../constante/colores';

export default function Traders({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  // Datos de ejemplo de traders
  const traders = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      especialidad: 'Forex',
      rating: 4.8,
      gananciaAnual: '+24.5%',
      seguidores: 1250,
      activo: true,
      avatar: 'user-circle',
    },
    {
      id: 2,
      nombre: 'María González',
      especialidad: 'Criptomonedas',
      rating: 4.9,
      gananciaAnual: '+31.2%',
      seguidores: 2100,
      activo: true,
      avatar: 'user-circle',
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      especialidad: 'Acciones',
      rating: 4.6,
      gananciaAnual: '+18.7%',
      seguidores: 890,
      activo: false,
      avatar: 'user-circle',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      especialidad: 'Commodities',
      rating: 4.7,
      gananciaAnual: '+22.1%',
      seguidores: 1560,
      activo: true,
      avatar: 'user-circle',
    },
    {
      id: 5,
      nombre: 'Luis Fernández',
      especialidad: 'Forex',
      rating: 4.5,
      gananciaAnual: '+15.3%',
      seguidores: 720,
      activo: true,
      avatar: 'user-circle',
    },
    {
      id: 6,
      nombre: 'Sofía López',
      especialidad: 'Criptomonedas',
      rating: 4.9,
      gananciaAnual: '+28.9%',
      seguidores: 1890,
      activo: true,
      avatar: 'user-circle',
    },
  ];

  const tradersFiltrados = traders.filter((trader) =>
    trader.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    trader.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  const verDetalleTrader = (trader) => {
    // Navegar a detalle del trader (pantalla futura)
    navigation.navigate('DetalleTrader', { trader });
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colores.textoClaro} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Traders Disponibles</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.busquedaContainer}>
        <FontAwesome name="search" size={18} color={colores.textoSecundario} style={styles.iconoBusqueda} />
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar traders..."
          placeholderTextColor={colores.textoSecundario}
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <FontAwesome name="times" size={18} color={colores.textoSecundario} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        {/* Filtros rápidos */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosContainer}>
          <TouchableOpacity style={[styles.filtro, styles.filtroActivo]}>
            <Text style={[styles.filtroTexto, styles.filtroTextoActivo]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Forex</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Cripto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Acciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTexto}>Commodities</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Lista de traders */}
        <View style={styles.tradersList}>
          {tradersFiltrados.map((trader) => (
            <TouchableOpacity
              key={trader.id}
              style={styles.tarjetaTrader}
              onPress={() => verDetalleTrader(trader)}
              activeOpacity={0.7}
            >
              <View style={styles.traderHeader}>
                <View style={styles.avatarContainer}>
                  <FontAwesome name={trader.avatar} size={40} color={colores.textoSecundario} />
                  {trader.activo && <View style={styles.indicadorActivo} />}
                </View>
                <View style={styles.traderInfo}>
                  <View style={styles.traderNombreContainer}>
                    <Text style={styles.traderNombre}>{trader.nombre}</Text>
                    {trader.activo && (
                      <View style={styles.badgeActivo}>
                        <Text style={styles.badgeTexto}>En línea</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.traderEspecialidad}>{trader.especialidad}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={14} color="#FFD700" />
                    <Text style={styles.rating}>{trader.rating}</Text>
                    <Text style={styles.seguidores}> • {trader.seguidores} seguidores</Text>
                  </View>
                </View>
                <View style={styles.gananciaContainer}>
                  <Text style={styles.ganancia}>{trader.gananciaAnual}</Text>
                  <Text style={styles.gananciaLabel}>anual</Text>
                </View>
              </View>
              <View style={styles.accionesContainer}>
                <TouchableOpacity 
                  style={styles.botonSecundario}
                  onPress={() => navigation.navigate('DetalleTrader', { trader })}
                >
                  <FontAwesome name="eye" size={16} color={colores.textoClaro} />
                  <Text style={styles.botonSecundarioTexto}>Ver perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.botonPrincipal}
                  onPress={() => navigation.navigate('Negociacion', { trader })}
                >
                  <FontAwesome name="handshake-o" size={16} color={colores.textoBotonPrincipal} />
                  <Text style={styles.botonPrincipalTexto}>Negociar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {tradersFiltrados.length === 0 && (
          <View style={styles.sinResultados}>
            <FontAwesome name="search" size={48} color={colores.textoSecundario} />
            <Text style={styles.sinResultadosTexto}>No se encontraron traders</Text>
            <Text style={styles.sinResultadosSubtexto}>Intenta con otros términos de búsqueda</Text>
          </View>
        )}
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
  busquedaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191919',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  iconoBusqueda: {
    marginRight: 10,
  },
  inputBusqueda: {
    flex: 1,
    color: colores.textoClaro,
    fontSize: 16,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtrosContainer: {
    marginVertical: 15,
  },
  filtro: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#191919',
    marginRight: 10,
  },
  filtroActivo: {
    backgroundColor: colores.botonPrincipal,
  },
  filtroTexto: {
    color: colores.textoSecundario,
    fontSize: 14,
  },
  filtroTextoActivo: {
    color: colores.textoBotonPrincipal,
    fontWeight: '600',
  },
  tradersList: {
    marginBottom: 20,
  },
  tarjetaTrader: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  traderHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  indicadorActivo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#191919',
  },
  traderInfo: {
    flex: 1,
  },
  traderNombreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  traderNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginRight: 8,
  },
  badgeActivo: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
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
  seguidores: {
    fontSize: 12,
    color: colores.textoSecundario,
    marginLeft: 4,
  },
  gananciaContainer: {
    alignItems: 'flex-end',
  },
  ganancia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  gananciaLabel: {
    fontSize: 11,
    color: colores.textoSecundario,
    marginTop: 2,
  },
  accionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonSecundario: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242323',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 10,
  },
  botonSecundarioTexto: {
    color: colores.textoClaro,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  botonPrincipal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.botonPrincipal,
    borderRadius: 8,
    paddingVertical: 12,
  },
  botonPrincipalTexto: {
    color: colores.textoBotonPrincipal,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  sinResultados: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  sinResultadosTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: colores.textoClaro,
    marginTop: 20,
  },
  sinResultadosSubtexto: {
    fontSize: 14,
    color: colores.textoSecundario,
    marginTop: 8,
  },
});

