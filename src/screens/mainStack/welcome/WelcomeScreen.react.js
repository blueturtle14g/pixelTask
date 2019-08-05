import React, {Component} from 'react';
import {
    SafeAreaView,
    BackHandler,
    Dimensions,
    ImageBackground,
} from 'react-native';
import shuffleSeed from 'shuffle-seed';
import BackButton from '../../../components/navigation/backButton/BackButton.react';
import styles from './WelcomeScreen.style';
import { NavigationEvents } from 'react-navigation';
import { isDoubleClicked, playAlarm } from '../../../utils';
import SimpleInput from './components/simpleInput/SimpleInput.react';
import SimpleButton from './components/simpleButton/SimpleButton.react';

// initially the order is simple
const ORIGINAL_ANIMATIONS_ORDER = [1,2,3,4,5];

class WelcomeScreen extends Component {
    state={
        // currently which animation number is playing
        currentNumber: 1,
        // the input value which user gives us
        inputValue: '1',
        // the updated currentAnimationsOrder which will be user after
        // shuffling the original one.
        currentAnimationsOrder: ORIGINAL_ANIMATIONS_ORDER,
    };

    static navigationOptions = ({navigation})=>({
        title: 'Welcome',
        // we override the left button to make a circular
        // navigation between welcome screen and hall of fame
        headerLeft: ()=>(
            <BackButton
                onPress={()=>navigation.navigate('HallOfFameScreen')}
            />
        )
    });

    // as user types a number and hits the save button
    // we should shuffle the original array with the given input
    // and set to the @currentAnimationsOrder
    _onSave = ()=>{
        const { inputValue } = this.state;
        this.setState({
            currentAnimationsOrder: shuffleSeed.shuffle(ORIGINAL_ANIMATIONS_ORDER, inputValue)
        })
    };

    // in case user wants to use a random number to shuffle the
    // array, we use a random number between 1 and 9 to generate one
    // set it as @inputValue and shuffle the array with that number
    _onRandomise = ()=>{
        const shuffleNumber = Math.floor(Math.random() * 9) + 1;
        this.setState({
            currentAnimationsOrder: shuffleSeed.shuffle(ORIGINAL_ANIMATIONS_ORDER, shuffleNumber),
            inputValue: shuffleNumber.toString(),
        })
    };

    componentDidMount() {
        // in order to track the double click on the back button
        // we initiate a variable to use it later
        this._lastTap = null;
        // listener for back button press on android
        this._backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
        // start moving between animations
        this._triggerAnimationInterval()
    };

    // each 5s this function will be call to update the current
    // animation with the next one
    _triggerAnimationInterval = ()=>{
        setInterval(()=>{
            const { currentNumber } = this.state;
            this.setState({
                // loop untill we get to the last index, then reset it
                currentNumber: currentNumber<ORIGINAL_ANIMATIONS_ORDER.length ? currentNumber+1 : 1
            })
        }, 5000)
    }

    componentWillUnmount() {
        this._backHandler.remove();
    };

    _handleBackPress = () => {
        // check to see if it was a double click
        if (isDoubleClicked(this._lastTap)) {
            // play a sound
            playAlarm()
            // exit the app
            BackHandler.exitApp();
        } else {
            // otherwise simply just navigate to HallOfFameScreen
            this.props.navigation.navigate('HallOfFameScreen');
        }
        // always return true to notify react-native
        // that we're handling the back button
        return true;
    };

    // update the @inputValue with the new one
    _onChangeInput = inputValue=>this.setState({inputValue})

    render() {
        const {
            currentNumber,
            inputValue,
            currentAnimationsOrder,
        } = this.state;
        // set a default value for params, since it's undefined in some cases
        const { params={} } = this.props.navigation.state;
        // initial our current animation
        let currentAnimation;
        // deside which animation to show using @currentNumber
        switch(currentNumber){
            // although we are using hardcoded indexes but note that
            // currentAnimationsOrder are reorganized so they will give us
            // new shuffled value generated from @_onSave and _onRandomise methods
            case(currentAnimationsOrder[0]):
                currentAnimation = require('../../../../assets/one.gif');
                break;
            case(currentAnimationsOrder[1]):
                currentAnimation = require('../../../../assets/two.gif');
                break;
            case(currentAnimationsOrder[2]):
                currentAnimation = require('../../../../assets/three.gif');
                break;
            case(currentAnimationsOrder[3]):
                currentAnimation = require('../../../../assets/four.gif');
                break;
            case(currentAnimationsOrder[4]):
                currentAnimation = require('../../../../assets/five.gif');
                break;
        }
        return (
            <SafeAreaView style={styles.mainContainer}>
                <ImageBackground
                    source={currentAnimation}
                    style={styles.animation}
                >
                    <SimpleInput
                        onChangeText={this._onChangeInput}
                        placeholder={'Enter a number'}
                        value={inputValue}
                    />
                    <SimpleButton
                        title={'Save'}
                        onPress={this._onSave}
                    />
                    <SimpleButton
                        title={'Randomise'}
                        onPress={this._onRandomise}
                    />
                </ImageBackground>
                <NavigationEvents
                    // navigation to this screen is the same
                    // pressing back button, because user has tapped
                    // on back button in the welcome screen
                    // in order to get here, so we set the _lastTap
                    // equal the current time
                    onWillFocus={()=>{
                        // use this condition, since user has been navigated
                        // to this screen via introduction screen
                        // not with the back button.
                        if(!params.skipLastTap){
                            this._lastTap = Date.now()
                        }
                    }}
                />
            </SafeAreaView>
        )
    }
}

export default WelcomeScreen;
