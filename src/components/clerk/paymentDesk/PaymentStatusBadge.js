import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const PaymentStatusBadge = ({
  status,
}) => {
  let backgroundColor = '#E5E1F8';
  let textColor = '#5B4AA2';

  switch (status) {
    case 'Paid':
      backgroundColor = '#DDEEE2';
      textColor = '#287A43';
      break;

    case 'Pending':
      backgroundColor = '#F8E5C8';
      textColor = '#A36B12';
      break;

    case 'Overdue':
      backgroundColor = '#F7DEDB';
      textColor = '#B7443B';
      break;

    case 'Partially Paid':
      backgroundColor = '#DDE7F7';
      textColor = '#2864B5';
      break;

    default:
      break;
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}>
        {status}
      </Text>
    </View>
  );
};

export default PaymentStatusBadge;

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