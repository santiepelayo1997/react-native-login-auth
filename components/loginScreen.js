import React from 'react';
import {View,StyleSheet,TextInput,Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import axios from 'axios'
import { AsyncStorage } from 'react-native';



class Login extends React.Component {
    
    state = {
        email: "",
        password: "",
        loading: false
    }

    onChangeHandle(state, value) {
        this.setState({
            [state]: value
        })
    }

    loginFunction(){
           const { navigate } = this.props.navigation; 
           const { email , password }  = this.state;
            if(email && password){
                this.setState({
                    loading: true
                })
                 axios.post('http://52.77.224.13:3000/api/login', {
                     "email": email,
                     "password": password
                 })
                 .then(
                     res=> {
                        this.setState({
                            loading: false
                        })
                         AsyncStorage.setItem("email", res.data.userDetails[0].email)
                         .then(
                             res=>{
                                navigate('Dashboard')
                                alert("Login Succesfully!")
                             }
                         )
                     },
                     err =>{
                        this.setState({
                            loading: false
                        })
                         alert("Username or Password incorrect!")
                     }
                 )
                 .catch(function (error) {
                    console.log(error)
                 });
            }else{
                this.setState({
                    loading: false
                })
                alert("Enter username and password!")
            }
         
    }

    render(){

        const { email, password , loading } = this.state;
        return (
           
            <View  style={styles.container}>
           
             
                <Image style={styles.imageLogo}
                source={require('../assets/logobicy.png')}/>
                <View style={styles.formWrapper}>

            

                <Text style={styles.welcomeText}>Welcome Back</Text>
    
                  <View style={styles.formRow}>
                      <TextInput
                          style={styles.textInput}
                          placeholder="Enter Email"
                          placeholderTextColor="#333"
                          value={email}
                          onChangeText={(value)=>this.onChangeHandle('email',value)}
                        />
                  </View>
                  <View style={styles.formRow}>
                      <TextInput
                          style={styles.textInput}
                          placeholder="Enter Password"
                          placeholderTextColor="#333"
                          value={password}
                          secureTextEntry={true}
                          onChangeText={(value)=>this.onChangeHandle('password',value)}
                        />
                  </View>
    
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        ...styles.signInBtn, backgroundColor: loading ? "#ddd" : "#d43"
                    }}
                    onPress={() => this.loginFunction()}
                    disabled={loading}
                  >
                      <Text style={styles.signInText}>
                          {loading ? "Loading.." : "Sign In"}</Text>
                  </TouchableOpacity>

                  <View style={styles.signUpText}>
                        <Text>Don't have an account? {' '}
                            <Text style={{color: '#d43'}} >
                                     Sign Up
                            </Text>
                       </Text>
                 </View>
    
                </View>
           
            </View>
          
        )
    }

};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems:"center",
        justifyContent: "center"
    },
    formWrapper: {
        width: "80%"
    },
    formRow:{
        marginBottom: 10
    },
    textInput: {
        backgroundColor: "#ddd",
        height:40,
        paddingHorizontal: 10,
        color: "#333"
    },
    welcomeText:{
      textAlign: "center",
      marginBottom: 40,
      fontSize: 20,
      fontWeight: "bold",
      color: "#333"
    },
    signInBtn: {
        backgroundColor: "#fb7",
        paddingVertical: 10,
    },
    signInText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    signUpText:{
        textAlign: "center",
        marginTop: 20
    },
    imageLogo:{
        justifyContent: "center",
        width: 150,
        height: 150,
        marginBottom: 50
    }
})

export default Login;