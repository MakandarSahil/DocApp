import {StyleSheet , Text, View} from 'react-native';
import React from 'react';

const RejectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Rejected Screen</Text>
    </View>
  )
}

export default RejectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
