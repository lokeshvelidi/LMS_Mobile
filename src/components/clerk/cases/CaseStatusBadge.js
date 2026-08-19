import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CaseStatusBadge = ({
  status,
}) => {
  let backgroundColor = '#E5E1F8';
  let textColor = '#5B4AA2';

  if (status === 'Active') {
    backgroundColor = '#DDEEE2';
    textColor = '#287A43';
  } else if (status === 'Pending') {
    backgroundColor = '#F8E5C8';
    textColor = '#A36B12';
  } else if (status === 'Closed') {
    backgroundColor = '#E1E6EA';
    textColor = '#536477';
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

export default CaseStatusBadge;

const styles = StyleSheet.create({
  badge: {
    minHeight: 29,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 10,
    fontWeight: '700',
  },
});