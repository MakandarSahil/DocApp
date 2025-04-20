import {StyleSheet , Text, View} from 'react-native';
import React from 'react';

const PendingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pending Screen</Text>
    </View>
  )
}

export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
