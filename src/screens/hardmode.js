import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as Font from 'expo-font';


class HardModeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
     
    }
    
    render() {
        
    
        
        
        return (

            <View style={{ flex: 1 , justifyContent : 'center' , alignItems : 'center' }}>
   
               <Text>Hard Mode </Text>
               <Text>Hard Mode </Text>
               <Text>Hard Mode </Text>
               <Text>Hard Mode </Text>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});

export default HardModeScreen;