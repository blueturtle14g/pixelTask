import React, {Component} from 'react';
import { Image, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import BackButton from '../../../components/navigation/backButton/BackButton.react';
import styles from './HallOfFameScreen.style';
import { NavigationEvents } from 'react-navigation';
import { isDoubleClicked, playAlarm } from '../../../utils';
import axios from 'axios';
// making sure we have access to buffer by requiring it
global.Buffer = global.Buffer || require('buffer').Buffer;

// hardcoded image url of actors
const ACTOR_IMAGES = [
    'https://cdn.pixabay.com/photo/2013/07/18/20/24/brad-pitt-164880__480.jpg',
    'https://cdn.pixabay.com/photo/2015/02/01/06/23/humphrey-bogart-619157__480.jpg',
    'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg',
    'https://cdn.pixabay.com/photo/2016/05/06/18/02/chaplin-1376364__480.png',
    'https://cdn.pixabay.com/photo/2014/07/16/08/18/clint-eastwood-394536__480.jpg',
];

class HallOfFameScreen extends Component {
    state = {
        // base64 data for images will be saved in this variable        
        base64Images: []
    };

    static navigationOptions = ({navigation})=>({
        title: 'Hall Of Fame',
        // we override the left button to make a circular
        // navigation between welcome screen and hall of fame
        headerLeft: ()=>(
            <BackButton
                onPress={()=>navigation.navigate('WelcomeScreen')}
            />
        )
    });

    componentDidMount() {
        // in order to track the double click on the back button
        // we initiate a variable to use it later
        this._lastTap = null;
        // listener for back button press on android
        this._backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
        // fetching base64 data from urls
        this._getBase64(0)
    };

    // gets an index of @ACTOR_IMAGES and fetches its data
    _getBase64 = async (actorIndex)=>{
        try{
            const response = await axios.get(ACTOR_IMAGES[actorIndex], {
                // change the response type to arraybuffer
                responseType: 'arraybuffer'
            });
            // generate our data64 string
            const base64Data = new Buffer(response.data, 'binary').toString('base64')
            // make a copy of the current base64 images
            const newBase64Images = [...this.state.base64Images];
            // update it with the newly created base64 image
            newBase64Images[actorIndex] = base64Data;
            this.setState({
                base64Images: newBase64Images
            }, ()=>{
                // make a recursion to fetch the next image
                // untill we get to the last index
                if(actorIndex<ACTOR_IMAGES.length-1){
                    this._getBase64(actorIndex+1)
                }
            });
        }catch(e){
            console.log('e', e)
            alert("please make sure you're connected to internet")
        }
    }

    componentWillUnmount() {
        this._backHandler.remove();
    };

    // the handler of back button on android
    _handleBackPress = () => {
        // check to see if it was a double click
        if (isDoubleClicked(this._lastTap)) {
            // play a sound
            playAlarm()
            // exit the app
            BackHandler.exitApp();
        } else {
            // otherwise simply just navigate to WelcomeScreen
            this.props.navigation.navigate('WelcomeScreen');
        }
        // always return true to notify react-native
        // that we're handling the back button
        return true;
    }
    
    render() {
        const { base64Images } = this.state;
        return (
            <SafeAreaView style={styles.mainContainer}>
                <NavigationEvents
                    // navigation to this screen is the same
                    // pressing back button, because user has tapped
                    // on back button in the welcome screen
                    // in order to get here, so we set the _lastTap
                    // equal the current time
                    onWillFocus={()=>this._lastTap = Date.now()}
                />
                <ScrollView>
                    {base64Images.map(imgData=>{
                        return(
                            <Image
                                key={imgData}
                                source={{ uri: `data:image/png;base64,${imgData}`}}
                                style={styles.actorImage}
                            />
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default HallOfFameScreen;
