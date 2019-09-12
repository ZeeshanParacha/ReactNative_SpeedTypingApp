import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput } from 'react-native-paper';
import * as Font from 'expo-font';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-navigation';


class Auth extends React.Component {

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { text: '', fontLoaded: false, isChosen : false };
        this.getRegister = this.getRegister.bind(this);
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }
    getRegister() {
        const userName = this.state.text;
        const isUsername = this.state.isChosen;
        console.log("username---->" , userName)
        fetch('http://192.168.1.4:3000/usersAuth/addUser', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: userName
            })
        }).then(res => res.json()).then((res) => {
            console.log('res-------->', res)
            console.log('res.isUser-------->', res.isUser)
            console.log('res.isUser-------->', res.message)

            if(res.isUser === false) {
                this.setState({isChosen : true})
            }
            
            else {
                this.props.navigation.navigate('Home', {username : userName })
            }


        })
        
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <KeyboardAwareScrollView
                    scrollEnabled={true}
                    enableAutomaticScroll={true}
                    contentContainerStyle={{flexGrow:1}}>
                    <View style={{ flex: 1 }}>

                        {this.state.fontLoaded ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ flex: 3, width: '100%', backgroundColor: '#2B1F33', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ width: 240, height: 240 }} source={require('../assets/images/icon.png')} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2, paddingLeft: 6, paddingRight: 6, textAlign: 'center', width: 280, marginTop: 10, marginBottom: 0 }}>
                                           Choose your name to start testing your typing speed & have fun :)</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 2, width: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                    <TextInput
                                        label='Choose Name'
                                        placeholder='...'
                                        mode='outlined'
                                        style={{ height: 60, width: 300 }}
                                        onChangeText={text => this.setState({ text })}
                                        value={this.state.text}
                                        
                                    />
                                    {this.state.isChosen ? <Text style={{fontSize : 12 , color : 'red' , textAlign : 'left' , marginTop : -10}}>Username is already taken.</Text> : null}

                                    <TouchableOpacity
                                        style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.getRegister()}>
                                        {/* */}
                                        <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Start Playing!</Text>

                                    </TouchableOpacity>

                                </View>
                            
                        </View>
                        : null}


                </View>
                </KeyboardAwareScrollView >
            </TouchableWithoutFeedback >

                );
    }
}
const styles = StyleSheet.create({
                    container: {
                    flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollStyle: {
                    flexGrow: 1,
        // justifyContent: 'center',
        backgroundColor: '#6f6f6f',
    },
});

export default Auth;