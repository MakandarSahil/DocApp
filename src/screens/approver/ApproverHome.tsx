// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import DashboardLayout from '../../layout/DashboardLayout';
// import { useNavigation } from '@react-navigation/native';

// export default function ApproverHome() {
//   const navigation = useNavigation();

//   const handleProfilePress = () => {
//     navigation.navigate('Profile'); // if Profile exists in AppNavigator
//   };

//   return (
//     <DashboardLayout onNavigateToProfile={handleProfilePress}>
//       {() => (
//         <View style={styles.container}>
//           <Text style={styles.welcomeText}>Welcome, Approver</Text>
//         </View>
//       )}
//     </DashboardLayout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1F2937',
//   },
// });
