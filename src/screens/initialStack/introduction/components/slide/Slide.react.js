import React from 'react';
import {
    Animated,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import styles from './Slide.style';

export default ({
    onFinish,
    slide:{
        description,
        index,
        isLastOne,
        title,
    },
    transitionAnimation,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.screen, transitionAnimation(index)]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {isLastOne &&(
            <TouchableOpacity
                style={styles.button}
                onPress={onFinish}
            >
                <Text style={styles.buttonTitle}>Go To Welcome Screen</Text>
            </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};