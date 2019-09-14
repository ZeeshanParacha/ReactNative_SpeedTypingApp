import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput } from 'react-native-paper';
import * as Font from 'expo-font';

class MediumModeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { scores: [], fontLoaded: false,initials : [] ,selectedColor: '',
            bgColor : ['#8a2be2' , '#daa520' ,'#daa520' , '#ff7f50' , '#ffa500' , '#5ac18e'] 
        };
        this._getRandomColor = this._getRandomColor.bind(this)
        this._getScores = this._getScores.bind(this)
        
    }
componentWillMount() {
        this._getScores();
    }

 async _getScores(){
    const array = [];
    const initialLetter = []
    let data;
    let newArr;
    
    await fetch('http://192.168.1.6:3000/scores/AllScores')
        .then(res => res.json())
        .then((res) => {
            data = res;
        })
    for (let key in data) {
        for (let key2 in data[key]) {
            console.log('console--->', data[key][key2])
             newArr = data[key][key2]
             newArr.initial = data[key][key2].name[0]
            
            array.push(newArr)
            
            // console.log('InitialLette--->', data[key][key2].name[0])
            // initialLetter.push(data[key][key2].name[0])
        }
    }
    this.setState({ scores: array  })
}
    async componentDidMount() {
      
        this._getRandomColor()
        await Font.loadAsync({
            'Raleway-Regular': require('../assets/fonts/Montserrat-Regular.otf'),
        });
        this.setState({ fontLoaded: true });
        
    }
    _getRandomColor(){
        var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];
        this.setState({
          selectedColor: item,
        })
      }

    render() {
        console.log(this.state.scores)
       const Letter = this.state.initials.map((list,index) => {
            return 
           })
        return this.state.fontLoaded ? (

            <View style={{ flex: 1  , width : '100%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 , flexDirection : 'column' , width : '100%' }}>
                        {this.state.scores.map((items) => {
                            return (
                                <TouchableOpacity key={items._id} style={{ margin: 10, flexDirection: 'row' , width : '100%' }}>
                                        <Text style={{width : 50 , height : 50 , borderRadius : 50, fontSize : 28, backgroundColor : this.state.selectedColor,
                                color : '#fff' , fontFamily :'Raleway-Regular', textAlign :'center', paddingTop : 10 ,  textTransform: 'uppercase'}}> {items.initial} </Text>
                                    <Text style={{ marginTop: 15, paddingLeft: 10, fontSize: 16 , color : '#222222', fontFamily : 'Raleway-Regular' }}>{items.name}</Text>
                                   
                                    <Text style={{ marginTop: 15, marginLeft : 'auto', color : '#222222', fontSize: 16 , marginRight : 24, fontFamily : 'Raleway-Regular' , justifyContent : 'flex-end' , alignItems : 'flex-end' }}>{((items.score * 100) / 15).toFixed(2) + '%'}</Text>
                                
                                </TouchableOpacity>
                            )
                        })}


                    </View>
                </ScrollView>
            </View>


        ) : null
    }
}


export default MediumModeScreen;