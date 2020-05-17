import React from 'react';
import { StyleSheet, Text, View, TextInput , Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state=({ 
      isDateTimePickerVisible: false,
      selecteddate:''
    })
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (pickeddate) => {
    // let day   = pickeddate.getDate();
    // let month = pickeddate.getMonth();
    // letyear  = pickeddate.getFullYear();
    // console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    this.setState({selecteddate : moment(pickeddate).format('DD/MM/YYYY')}) 
    this._hideDateTimePicker();
    Keyboard.dismiss();
  };

  onFocus = () => {
    this._handleDatePicked();
  }

  render() {
    return (
      <View >
        <TextInput 
         style={styles.input}
         placeholder="Select Birth Date"
         autoCapitalize="none"
         placeholderTextColor="#333"
         onFocus={ () => this._showDateTimePicker() }
         value={this.state.selecteddate}
        />
        {/* //--------------------------------------DateTimePicker */}
        <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode={'date'}
                      datePickerModeAndroid={'spinner'}
                    />
            {/* //-------------------------------------- */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#eeeeee",
        height:40,
        paddingHorizontal: 10,
        color: "#333",
        marginBottom: 10,
        borderRadius: 2
    },
});
