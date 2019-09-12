import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput } from 'react-native-paper';
import * as Font from 'expo-font';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { fontLoaded: false };
        this.goBack = this.goBack.bind(this)

    }

    async componentDidMount() {
        await Font.loadAsync({
            'Raleway-Regular': require('../assets/fonts/Montserrat-Regular.otf'),
        });

        this.setState({ fontLoaded: true });


    }

    goBack() {
    
        this.props.navigation.goBack()
    }
    render() {
        const { isStart, index, randomWords } = this.state;
        const { navigation } = this.props;
        const Score = navigation.getParam('totalScore', 'NO-totalScore');
        const QuesLength = navigation.getParam('totalQuestion', 'NO-totalQuestion');


        return this.state.fontLoaded ? (
            <View style={{ flex: 1 }} >
                {(Score * 100) / QuesLength > 70 ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <View style={{ flex: 3, width: '100%', backgroundColor: '#FFF', flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 240, height: 240 }} source={require('../assets/images/win.png')} />
                                </View>
                            </View>

                            <View style={{ flex: 2, width: '100%', backgroundColor: '#2B1F33', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>


                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                       Hurrrayyyyyy! 
                                    </Text>
                                </View>

                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                        {'Your type rate is : ' +
                                            (Score * 100) / QuesLength +
                                            '%'}
                                    </Text>
                                </View>

                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                        {'You have typed : ' +
                                            Score + ' correct matches' +
                                            ' out of ' +
                                            QuesLength}
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View> : <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <View style={{ flex: 3, width: '100%', backgroundColor: '#FFF', flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 240, height: 240 }} source={require('../assets/images/loose.png')} />
                                </View>
                            </View>

                            <View style={{ flex: 2, width: '100%', backgroundColor: '#2B1F33', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                        Opps :(
                            </Text>
                                </View>

                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                        {'Your type rate is : ' +
                                            (Score * 100) / QuesLength +
                                            '%'}
                                    </Text>
                                </View>

                                <View style={{ overflow: 'hidden', width: '100%' }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            letterSpacing: 2,
                                            fontFamily: 'Raleway-Regular',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            backgroundColor: '#2B1F33',
                                            color: 'white',
                                            padding: 10,
                                            width: '100%',
                                        }}>
                                        {'You have typed : ' +
                                            Score + ' correct matches' +
                                            ' out of ' +
                                            QuesLength}
                                    </Text>
                                </View>
                                <View style={{ overflow: 'hidden', width: '100%' , justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ height: 40, width: 250, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.goBack()}
                                    >
                                        {/* */}
                                        <Text style={{ fontFamily: 'Raleway-Regular', color: '#2B1F33', fontWeight : 'bold', fontSize: 16, letterSpacing: 2 }}> Play Again</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>}
            </View>

        ) : null
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        justifyContent: 'center',
    },
});

export default HomeScreen;