import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CasePriorityBadge = ({
  priority,
}) => {
  let backgroundColor = '#E1EAF8';
  let textColor = '#2864B5';

  if (priority === 'High') {
    backgroundColor = '#F7DEDB';
    textColor = '#B7443B';
  } else if (priority === 'Medium') {
    backgroundColor = '#F8E5C8';
    textColor = '#A36B12';
  } else if (priority === 'Low') {
    backgroundColor = '#DDEEE2';
    textColor = '#287A43';
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
        {priority}
      </Text>
    </View>
  );
};

export default CasePriorityBadge;

const styles = StyleSheet.create({
  badge: {
    minHeight: 28,
    paddingHorizontal: 11,
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