import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput } from 'react-native-paper';
import * as Font from 'expo-font';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




class EasyModeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { fontLoaded: false, randomWords: [], isStart: false, timer: '', index: 0, score: 0, mode: '', isMode: false, visible: false, isLoaded: true };
        this.timer = this.timer.bind(this);
        this.startTyping = this.startTyping.bind(this)
        this.nextQues = this.nextQues.bind(this)
        this.finish = this.finish.bind(this)
    }
    async componentWillMount() {
        const array = []
        let data;
        await fetch('http://192.168.1.6:3000/randomwords/getAllwords')
            .then(res => res.json())
            .then((res) => {
                data = res
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

        setTimeout(() => {
            this.setState({
                isLoaded: false
            });
        }, 1000);


        const { navigation } = this.props;
        await Font.loadAsync({
            'Raleway-Regular': require('../assets/fonts/Montserrat-Regular.otf'),
        });
        this.setState({ fontLoaded: true });

        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ isStart: false, timer: '', index: 0, score: 0, isMode: false , isLoaded : true });
            setTimeout(() => {
                this.setState({
                    isLoaded: false
                });
            }, 1000);
        });

        const Username = navigation.getParam('username', 'NO-username');
        console.log('username--->', Username)



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
            this.nextQues()



        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.focusListener.remove();


    }

    startTyping() {
        if (this.state.mode === '') {
            this.setState({ isMode: true })
        }
        else if (this.state.mode === 'easy') {
            this.setState({ isStart: true, timer: 10, index: 0, score: 0 })
        }
        else if (this.state.mode === 'medium') {
            this.setState({ isStart: true, timer: 8, index: 0, score: 0 })
        }
        else if (this.state.mode === 'hard') {
            this.setState({ isStart: true, timer: 5, index: 0, score: 0 })
        }


        clearInterval(this.interval);
        this.timer();
    }
    nextQues() {
        const { index, timer, text, randomWords, score } = this.state;
        clearInterval(this.interval);



        if (text !== '' && text != undefined && randomWords[index].toLowerCase() === text.toLowerCase()) {
            this.setState({ score: score + 1 })

        } else {
            this.setState({ score })
        }

        if (this.state.mode === 'easy') {
            this.setState({ index: index + 1, timer: 10, text: '' })
        }
        else if (this.state.mode === 'medium') {
            this.setState({ index: index + 1, timer: 8, text: '' })
        }
        else if (this.state.mode === 'hard') {
            this.setState({ index: index + 1, timer: 5, text: '' })
        }


        this.timer()
    }
    finish() {
        const { score, randomWords } = this.state;
        const { navigation } = this.props;
        const Username = navigation.getParam('username', 'NO-username');
        console.log('username--->', Username)
        const totalLength = randomWords.length;

        fetch('http://192.168.1.6:3000/scores/AddUserScore', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: Username,
                score: score
            })
        }).then(res => res.json()).then((res) => {
            console.log('res-------->', res)
            this.props.navigation.navigate('Score', { totalScore: score, totalQuestion: totalLength })
        })



    }
    render() {
        const { isStart, index, randomWords, visible } = this.state;

        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
          >
            <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>{this.state.isLoaded ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#2B1F33" /></View> : 
             <View style={{ flex: 1 }}>
                {this.state.randomWords.length > 0 ?

                    <View style={{ flex: 1 }}>

                        {!this.state.isStart ?

                            <View style={{ flex: 1 }}>
                                {this.state.fontLoaded ?
                                    <View style={{ flex: 1, }}>

                                        <View style={{ flex: 3, width: '100%', backgroundColor: '#FFF' }}>
                                            <TouchableOpacity style={{ alignItems: 'center', margin: 10, marginBottom: 0 }}>
                                                <Image source={require('../assets/images/icon2.png')} style={{ width: 220, height: 220, borderRadius: 30 }} />

                                                <Text style={{ color: 'darkgray', fontSize: 16 }}>Mode Select Karein</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: '100%', backgroundColor: '#FFF', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10, marginBottom: 0, flexDirection: 'row' }}
                                                    onPress={() => this.setState({ mode: 'easy' })}>
                                                    <Image source={require('../assets/images/easy.png')} style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} />

                                                    <Text style={{ color: 'darkgray', fontSize: 16 }}>Asaan</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10, marginBottom: 0, flexDirection: 'row' }}
                                                    onPress={() => this.setState({ mode: 'medium' })}>
                                                    <Image source={require('../assets/images/medium.png')} style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} />

                                                    <Text style={{ color: 'darkgray', fontSize: 16 }}>Darmiyanaa'n</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10, marginBottom: 0, flexDirection: 'row' }}
                                                    onPress={() => this.setState({ mode: 'hard' })}>
                                                    <Image source={require('../assets/images/hard.png')} style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }} />
                                                    <Text style={{ color: 'darkgray', fontSize: 16 }}>Mushkil</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'
                                        }}>



                                            <TouchableOpacity
                                                style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                                onPress={() => this.startTyping()}
                                            >
                                                {/* */}
                                                <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}>Shuru Karen Likhna...</Text>
                                            </TouchableOpacity>
                                            {this.state.isMode && <Text style={{ fontFamily: 'Raleway-Regular', color: 'red', fontWeight: 'bold', fontSize: 14, letterSpacing: 2, marginTop: 2 }}> Please! Mode Select Karein</Text>}
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
                                                            <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Bus Khatam... </Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            style={{ height: 60, width: 300, backgroundColor: '#2B1F33', justifyContent: 'center', alignItems: 'center' }}
                                                            onPress={() => this.nextQues()}>
                                                            <Text style={{ fontFamily: 'Raleway-Regular', color: '#FFF', fontSize: 16, letterSpacing: 2 }}> Agey Barho...</Text>
                                                        </TouchableOpacity>

                                                    }

                                                </View>

                                            </View>
                                            : null}


                                    </View>
                                </KeyboardAwareScrollView >
                            </TouchableWithoutFeedback >}

                    </View>


                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Please Check your internet Connection and Reload Again !</Text>
                    </View>
                }
            </View>}
            </View>
            </SafeAreaView>
    </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
});

export default EasyModeScreen;