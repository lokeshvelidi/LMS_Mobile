import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const HearingStatusBadge = ({status}) => {
  const getColors = () => {
    switch (status) {
      case 'Scheduled':
        return {
          background: '#DDEEE2',
          text: '#287A43',
        };

      case 'Adjourned':
        return {
          background: '#F8E5C8',
          text: '#A36B12',
        };

      case 'Completed':
        return {
          background: '#E0E6EC',
          text: '#536477',
        };

      case 'Cancelled':
        return {
          background: '#F7DEDB',
          text: '#B7443B',
        };

      default:
        return {
          background: '#E5E1F8',
          text: '#5B4AA2',
        };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            colors.background,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}>
        {status}
      </Text>
    </View>
  );
};

export default HearingStatusBadge;

const styles = StyleSheet.create({
  badge: {
    minHeight: 30,
    paddingHorizontal: 13,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});