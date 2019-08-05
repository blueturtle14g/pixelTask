import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './SimpleButton.style';

export default ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
