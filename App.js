import React from 'react';
import { StyleSheet, SafeAreaView , View} from 'react-native';
import Route from './components/routes.js'


export default function App() {
  return (
    <View  style={styles.container}>
   
    
      
            <Route/>
       


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
});
