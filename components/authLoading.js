import React from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import { AsyncStorage } from 'react-native';

class ActivityScreen extends React.Component{

    constructor(){
        super();
        this.checkToken();
    }

    checkToken = async () => {
        const token = await AsyncStorage.getItem("email");
        if(token){
            this.props.navigation.navigate('Dashboard')
        }else{
            this.props.navigation.navigate('Login')
        }
    }
    render(){
        return (
            
            <View style={styles.container} >
                <ActivityIndicator/>
            </View>
        )
    }
};


export default ActivityScreen;


const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems:"center",
        justifyContent: "center"
    },
})

