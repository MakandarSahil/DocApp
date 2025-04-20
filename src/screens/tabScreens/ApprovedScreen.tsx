import {StyleSheet , Text, View} from 'react-native';
import React from 'react';

const ApprovedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Correction Screen</Text>
    </View>
  )
}

export default ApprovedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
