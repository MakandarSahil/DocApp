import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type TabIconName = 'hourglass-empty' | 'check-circle' | 'edit' | 'cancel';

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const tabIcons: Record<string, TabIconName> = {
    Pending: 'hourglass-empty',
    Approved: 'check-circle',
    Correction: 'edit', // Changed from 'build' to 'edit' (pen icon)
    Rejected: 'cancel',
  };

  // Create animated values for tab indicator
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  // Set the initial active tab
  React.useEffect(() => {
    Animated.timing(animatedValues[state.index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    return () => {
      animatedValues[state.index].setValue(0);
    };
  }, [state.index, animatedValues]);

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // Reset all animations
            animatedValues.forEach((value : any, i : any) => {
              if (i !== index) {
                value.setValue(0);
              }
            });
            
            // Animate the new tab
            Animated.timing(animatedValues[index], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
            
            // Navigate
            navigation.navigate(route.name);
          }
        };

        // Interpolate colors for text and icon
        const tabColor = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['#8e8e8e', '#0d6efd']
        });

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tab}
          >
            <Animated.View style={styles.tabContent}>
              <Animated.Text style={[styles.icon]}>
                <MaterialIcons
                  name={tabIcons[route.name]}
                  size={22}
                  color={isFocused ? '#0d6efd' : '#8e8e8e'}
                />
              </Animated.Text>
              <Animated.Text 
                style={[
                  styles.label, 
                  { 
                    color: isFocused ? '#0d6efd' : '#8e8e8e',
                    fontWeight: isFocused ? '600' : '400'
                  }
                ]}
              >
                {label}
              </Animated.Text>
            </Animated.View>
            
            {isFocused && (
              <Animated.View 
                style={[
                  styles.indicator,
                  {
                    opacity: animatedValues[index],
                    transform: [
                      {
                        scaleX: animatedValues[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1]
                        })
                      }
                    ]
                  }
                ]} 
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    height: 62,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '40%',
    backgroundColor: '#0d6efd',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  }
});

export default CustomTabBar;