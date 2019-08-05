import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './BackButton.style';

export default ({onPress})=>{
    return (
        <AntDesign
            name="arrowleft"
            style={styles.backButton}
            onPress={onPress}
            size={25}
        />
    )
}
