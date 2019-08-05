import React, { Component } from "react";
import {
    Animated,
    Dimensions,
} from "react-native";
import Slide from './components/slide/Slide.react';
import styles from './IntroductionScreen.style';
import AsyncStorage from '@react-native-community/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;
const xOffset = new Animated.Value(0);

const slides = [
    {
        index: 0,
        title: 'First Slide',
        description: 'First Slide For Introduction Screen'
    },
    {
        index: 1,
        title: 'Second Slide',
        description: 'Second Slide For Introduction Screen'
    },
    {
        index: 2,
        title: 'Third Slide',
        description: 'Third Slide For Introduction Screen',
        isLastOne: true,
    },
];

export default class IntroductionScreen extends Component {
    static navigationOptions = ()=>({
        title: 'Introduction',
    });

    // called when user presses the button in the last slide
    // in order to go to welcome screen
    _onFinishAsync = async ()=>{
        try{
            // set @introductionIsSeen to true, to skip this screen
            // in future launches
            await AsyncStorage.setItem('introductionIsSeen', 'true');
            // @skipLastTap prevents the welcomeScreen from assuming that
            // back button is pressed
            this.props.navigation.navigate('WelcomeScreen', {skipLastTap: true});
        }catch(e){
            alert('Please Try Again, Something Went Wrong!')
        }
    }

    render() {
        return (
            <Animated.ScrollView
              // increasing scrollEventThrottle boosts performance
                scrollEventThrottle={16}
                // binding user gesture to the scrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                    { useNativeDriver: true }
                )}
                horizontal
                pagingEnabled
                style={styles.scrollView}
            >
                {slides.map(slide=>(
                    <Slide
                        key={slide.title}
                        slide={slide}
                        transitionAnimation={transitionAnimation}
                        onFinish={this._onFinishAsync}
                    />
                ))}
            </Animated.ScrollView>
        );
    }
}

// applying the movement animation on user gestures
const transitionAnimation = index => {
    return {
      transform: [
        { perspective: 800 },
        {
          scale: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: [0.25, 1, 0.25]
          })
        },
        {
          rotateX: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ["45deg", "0deg", "45deg"]
          })
        },
        {
          rotateY: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ["-45deg", "0deg", "45deg"]
          })
        }
      ]
    };
};