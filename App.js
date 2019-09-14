import React from 'react';
import { StyleSheet, Text, View , Platform } from 'react-native';
import Navigation from './src/config/navigation'
export default function App() {
  return (
    <View style={styles.container}>
     <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
    justifyContent: 'center',
  },
});
