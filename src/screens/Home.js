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
        this.state = { fontLoaded: false, randomWords: [], isStart: false, timer: 10, index: 0 , score : 0};
        this.timer = this.timer.bind(this);
        this.startTyping = this.startTyping.bind(this)
        this.nextQues = this.nextQues.bind(this)
        this.finish = this.finish.bind(this)
    }
    async componentWillMount() {
        const array = [];
        let data;
        await fetch('http://192.168.1.4:3000/randomwords/getAllwords')
            .then(res => res.json())
            .then((res) => {
                data = res;
            })

        for (let key in data) {

            for (let key2 in data[key]) {
                console.log('console--->', data[key][key2].randomWord.word)
                array.push(data[key][key2].randomWord.word)
            }
        }

        this.setState({ randomWords: array })

    }
    async componentDidMount() {
        const { navigation } = this.props;
        await Font.loadAsync({
            'Raleway-Regular': require('../assets/fonts/Montserrat-Regular.otf'),
        });
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ isStart: false, timer: 10, index: 0 , score : 0 });
          });

        this.setState({ fontLoaded: true });


    }
    
    timer() {
        // let count = 15;
        // let timer = setInterval(function () {
        //     console.log(count);
        //     count--;
        //     if (count === 0) {
        //         stopInterval()
        //     }
        // }, 1000);

        // let stopInterval = function () {
        //     console.log('time is up!');
        //     clearInterval(timer);
        // }
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            
        }
    }

    componentWillUnmount() {
        this.focusListener.remove();
        clearInterval(this.interval);

    }

    startTyping() {
        this.setState({ isStart: true })
        this.timer();
    }
    nextQues() {
        const { index, timer , text , randomWords , score } = this.state;
        clearInterval(this.interval);
       
       
       
            if (text !== '' && text != undefined && randomWords[index].toLowerCase() === text.toLowerCase()){
                this.setState({score : score + 1})
            
        }
       

        this.setState({ index: index + 1, timer: 10 , text : '' })
        this.timer()
    }
    finish(){
        const {score , randomWords} = this.state;
        const { navigation } = this.props;
        const Username = navigation.getParam('username', 'NO-username');
        console.log('username--->',Username)
        const totalLength = randomWords.length;

        fetch('http://192.168.1.4:3000/scores/AddUserScore', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: Username,
                score: score
            })
        }).then(res => res.json()).then((res) => {
            console.log('res-------->', res)
            this.props.navigation.navigate('Score' , {totalScore : score , totalQuestion : totalLength})
        })

       
            
    }
    render() {
        const { isStart, index, randomWords } = this.state;
    
        
        
        return this.state.randomWords.length > 0 ? (

            <View style={{ flex: 1 }}>
   
                {!this.state.isStart ?

                    <View style={{ flex: 1 }}>
                        {this.state.fontLoaded ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ flex: 3, width: '100%', backgroundColor: '#2B1F33', flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ width: 240, height: 240 }} source={require('../assets/images/icon2.png')} />
                                    </View>
                                </View>

                                <View style={{ flex: 2, width: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                    <TouchableOpacity
                                        style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.startTyping()}
                                    >
                                        {/* */}
                                        <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Start Typing !</Text>

                                    </TouchableOpacity>

                                </View>

                            </View> : null}
                    </View> :



                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAwareScrollView
                            scrollEnabled={true}
                            enableAutomaticScroll={true}
                            contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ flex: 1 }}>

                                {this.state.fontLoaded ?
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ flex: 3, width: '100%', backgroundColor: '#2B1F33', flexDirection: 'column' }}>
                                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ width: 240, height: 240 }} source={require('../assets/images/icon2.png')} />
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 50 }}>
                                                <Text style={{ fontFamily: 'Raleway-Regular', color: '#fff', fontSize: 18 }}> Time Remaining: {this.state.timer} </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Text style={{ paddingVertical: 10, textTransform: 'capitalize', fontFamily: 'Raleway-Regular', borderWidth: 1, borderColor: '#fff', color: '#FFF', fontSize: 28, fontWeight: 'bold', letterSpacing: 3, paddingLeft: 6, paddingRight: 6, textAlign: 'center', width: 280, marginTop: 10, marginBottom: 0 }}>
                                                    {this.state.randomWords[index]}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 2, width: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                            <TextInput
                                                label='Type word...'
                                                placeholder='...'
                                                mode='outlined'
                                                style={{ height: 60, width: 300 }}
                                                onChangeText={text => this.setState({ text })}
                                                value={this.state.text}

                                            />

                                            {index == randomWords.length - 1 ?
                                                <TouchableOpacity
                                                    style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                                    onPress={() => this.finish()}>
                                                    <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Finish... </Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                                    onPress={() => this.nextQues()}>
                                                    <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Move Next!</Text>
                                                </TouchableOpacity>

                                            }

                                        </View>

                                    </View>
                                    : null}


                            </View>
                        </KeyboardAwareScrollView >
                    </TouchableWithoutFeedback >}

            </View>


        ) : 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <Text>Please Check your internet Connection and Reload Again !</Text>
        </View>;
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