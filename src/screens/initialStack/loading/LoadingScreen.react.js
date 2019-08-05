import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import styles from './LoadingScreen.style';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
    componentDidMount() {
        this._verifyUserAsync();
    };

    static navigationOptions = {
        header: null
    };

    _verifyUserAsync = async ()=>{
        try{
            const introductionIsSeen = await AsyncStorage.getItem('introductionIsSeen');
            if(introductionIsSeen){
                this.props.navigation.navigate('MainStack');
                return;
            }
            this.props.navigation.navigate('IntroductionScreen');
        }catch(e){
            this.props.navigation.navigate('IntroductionScreen');
        }
    }

    render() {
        return(
            <ActivityIndicator
                style={styles.loadingIndicator}
                size="large"
                color="#2b2b2b"
            />
        )
    }
};