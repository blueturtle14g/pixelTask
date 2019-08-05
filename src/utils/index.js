import Sound from 'react-native-sound';
const DOUBLE_PRESS_DELAY = 500;

// @isDoubleClicked checks the lastTap and figures out
// if it has been clicked less than 500ms ago
export const isDoubleClicked = (lastTap)=>lastTap && (Date.now() - lastTap) < DOUBLE_PRESS_DELAY;

// plays a sound when app is going to background
export const playAlarm = ()=>{
    let alarm1 = new Sound('alarm', Sound.MAIN_BUNDLE, () =>{
        alarm1.play((done)=>{
            if(done){
                // if everything goes well, play the sound
                alarm1.release()
            }else{
                // if an error occured, notify the user
                alert('Sound Could Not Play!')
            }
        });
    });
};
