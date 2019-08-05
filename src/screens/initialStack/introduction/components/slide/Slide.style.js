import { StyleSheet, Dimensions } from 'react-native';
import { whileStatement } from '@babel/types';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    mainContainer: {
        width: SCREEN_WIDTH,
        padding: 20,
    },
    screen: {
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white",
        height: '100%',
        justifyContent: "space-around",
    },
    title: {
        fontSize: 45,
        fontWeight: "bold"
    },
    description:{

    },
    buttonTitle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
    button:{
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
});
