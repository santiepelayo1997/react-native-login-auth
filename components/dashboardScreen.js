import React from 'react';
import {View,StyleSheet,TextInput,Text, TouchableOpacity} from 'react-native';
import { AsyncStorage } from 'react-native';

class DashboardScreen extends React.Component {

    doLogout(){
        AsyncStorage.removeItem("email")
        .then(
            res=>{
                this.props.navigation.navigate('Login')
            }
        )
    }

    render(){
        return (
            <View style={styles.container} >
                    <View
                        style={styles.dashboardWrapper}
                    >
                        <Text style={styles.userText}>Welcome User</Text>
                        <TouchableOpacity style={styles.logoutBtn}   onPress={() => this.doLogout()}>
                            <Text style={styles.logoutBtnText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

};


export default DashboardScreen;


const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems:"center",
        justifyContent: "center"
    },
    logoutBtn:{
        backgroundColor: "#d43",
        paddingVertical: 10,
        width: 100,
        alignSelf: "center"
    },
    logoutBtnText:{
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    dashboardWrapper:{
        textAlign: "center"
    },
    userText:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    }
})

