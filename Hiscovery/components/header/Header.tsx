import React from 'react';
import { View, Text, TouchableOpacity, FlexAlignType, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, onLeftPress, leftIcon, }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        {leftIcon && <Ionicons name="arrow-back" size={24} color="black" />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
        {rightIcon && <Image source={rightIcon} style={styles.icon} />}
      </TouchableOpacity> */}
    </View>
  );
};

const styles = {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#3498db',
      paddingHorizontal: 15,
    } as ViewStyle,
    title: {
      fontSize: 20,
      color: '#fff',
    },
    iconContainer: {
      padding: 10,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: '#fff',
    },
  } as { [key: string]: ViewStyle };

export default Header;
