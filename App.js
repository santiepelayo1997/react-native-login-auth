import React from 'react';
import { StyleSheet, SafeAreaView , View} from 'react-native';
import Route from './components/routes.js'


export default function App() {
  return (
    <SafeAreaView  style={styles.container}>
        <Route/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
  },
});
