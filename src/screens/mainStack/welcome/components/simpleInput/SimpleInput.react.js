import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './SimpleInput.style';

export default ({ onChangeText, placeholder, value }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      onChangeText={onChangeText}
      value={value}
      keyboardType={'number-pad'}
    />
  );
};
