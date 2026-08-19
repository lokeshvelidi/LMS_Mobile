import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const DocumentStatusBadge = ({
  status,
}) => {
  let backgroundColor = '#E1EAF8';
  let textColor = '#2864B5';

  if (status === 'Approved') {
    backgroundColor = '#DDEEE2';
    textColor = '#287A43';
  } else if (status === 'Pending') {
    backgroundColor = '#F8E5C8';
    textColor = '#A36B12';
  } else if (status === 'Rejected') {
    backgroundColor = '#F7DEDB';
    textColor = '#B7443B';
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

export default DocumentStatusBadge;

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