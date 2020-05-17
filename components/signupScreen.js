import React from "react";
import {View,StyleSheet,Text,TextInput,TouchableOpacity,ImageBackground,ScrollView, KeyboardAvoidingView, Platform, KeyboardAvoidingViewBase} from 'react-native';
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import DatePicker  from './datepicker.js'
import moment from 'moment'
// import {Picker} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

class SignupScreen extends React.Component {

  
      state = {
        email: '',
        password: '', 
        firstname: '',
        middlename: '',
        lastname: '',
        address: '',
        contactNo: '',
        birthDate: '',
        loading: false,
        gender: '',
        date: '',
      }


        onChangeText(state, value) {
            this.setState({
                [state]: value
            })
        }

        constructor(){
            super();
            this.getLatestId();
            this.state = {
              date: moment().format()
            };
        }

        async getLatestId(){
           
            await axios.get('http://52.77.224.13:3000/api/generateCustomerId')
            .then(function (response) {
                AsyncStorage.setItem("customerId", response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
   
        }

        leftPad(value, length) { 
            return ('0'.repeat(length) + value).slice(-length); 
        }

        signUp = async () => {
      
            try {
                const { navigate } = this.props.navigation; 
                const { email, password, firstname, middlename, lastname , address, contactNo , date, gender} = this.state
                const data = await AsyncStorage.getItem("customerId");
                // let last = data.slice(-1).pop()
                var res = data.split("-");
                let added = parseInt(res[1]) + 1
                let final = this.leftPad(added, 5);
                let customerId  =  "PW-" + final
                let birthDate = moment(date).format('YYYY-MM-DD')
                 if(email  && password  && firstname  && middlename  && lastname  && address  && contactNo){
                     this.setState({
                         loading: true
                     })
                     let params = {
                        "customerId": customerId,
                        "image": "",
                        "meterNo": "0",
                        "startMeter": "0",
                        "firstName": firstname,
                        "middleName": middlename,
                        "lastName": lastname,
                        "gender": gender,
                        "birthDate": birthDate,
                        "address": address,
                        "locationCode": "SANPEDRO",
                        "contactNo": contactNo,
                        "email": email,
                        "password": password,
                        "status": "1"
                      }
                
                      let res = await axios.post('http://52.77.224.13:3000/api/customers', params)
                      .then(function (response) {
                        console.log(response.data)
                        alert("Successfully Registed!")
                        navigate('Login')
                      })
                      .catch(function (error) {
                        console.log(error);
                        alert("Email already Exist!")
                        this.setState({
                            loading: false
                        })
                      });

                 }else{
                     this.setState({
                         loading: false
                     })
                     alert("Please complete all the fields!")
                 }
            } catch (err) {
                this.setState({
                    loading: false
                })
                console.log('error signing up: ', err)
            }
        }

      
      

    
    render(){
        // console.disableYellowBox = true;
        const { loading} = this.state;
        let data = [{
            value: 'Male',
          }, {
            value: 'Female',
          }];
       
  

        return (
            // <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center'}} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
            <KeyboardAvoidingView>
            <ScrollView>
            <ImageBackground source={require('../assets/bg.png')} style={styles.container}>
                 <View style={styles.formWrapper}>
                    <Text style={styles.headerText}>Create Account</Text>
               
                    <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    onChangeText={val => this.onChangeText('password', val)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    onChangeText={val => this.onChangeText('firstname', val)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Middle Name'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    onChangeText={val => this.onChangeText('middlename', val)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    onChangeText={val => this.onChangeText('lastname', val)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Contact Number'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    keyboardType='numeric'
                    onChangeText={val => this.onChangeText('contactNo', val)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder='Address'
                    autoCapitalize="none"
                    placeholderTextColor="#333"
                    editable
                    maxLength={40}
                    onChangeText={val => this.onChangeText('address', val)}
                    />

                    <DatePicker
                      date={this.state.date}
                      onDateChange={(date) => this.setState({date})} 
                    />

                    {/* <Picker
                        selectedValue={this.state.language}
                        style={{height: 50, width: 320}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker> */}

                        <Dropdown
                        label='Select Gender'
                        data={data}
                        onChangeText={val => this.onChangeText('gender', val)}
                     />
                                

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        ...styles.signupBtn, backgroundColor: loading ? "#ddd" : "#42A5F5"
                    }}
                    onPress={() => this.signUp()}
                    disabled={loading}
                  >
                      <Text style={styles.signupText}>
                          {loading ? "Loading.." : "Sign Up"}</Text>
                  </TouchableOpacity>

                  <View style={styles.singInText}>
                        <Text>Already have an account? {' '}
                            <Text style={{color: '#42A5F5'}}
                                     onPress={() => this.props.navigation.navigate('Login')}>
                                     Sign In
                            </Text>
                       </Text>
                  </View>
    

             </View>
          </ImageBackground>
           </ScrollView>
           </KeyboardAvoidingView>
   
        )
    }

};

const styles = StyleSheet.create({
        singInText:{
            textAlign: "center",
            marginTop: 20,
            marginBottom:  Platform.OS === 'ios' ? 170 : 80
        },
        headerText:{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            paddingBottom: 10,
            marginBottom: 20,
            borderBottomColor: '#42A5F5',
            marginTop: Platform.OS === 'ios' ? 50 : 10,
        },
        input: {
            backgroundColor: "#eeeeee",
            height:40,
            paddingHorizontal: 10,
            color: "#333",
            marginBottom: 10,
            borderRadius: 2
        },
        formWrapper: {
            width: "80%",
            paddingTop: 60,
        },
        signupBtn: {
            backgroundColor: "#fb7",
            paddingVertical: 10,
            marginTop: 10
        },
        signupText: {
            textAlign: "center",
            color: "white",
            fontSize: 18,
            fontWeight: "bold"
        },
        container: {
            height: "100%",
            alignItems:"center",
            justifyContent: "center"
        },
})


export default SignupScreen;

