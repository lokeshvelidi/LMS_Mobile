import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const PaymentSummaryCard = ({
  title,
  value,
  subtitle,
  type = 'blue',
}) => {
  const getAccent = () => {
    switch (type) {
      case 'green':
        return '#2B8A4B';

      case 'yellow':
        return '#C89B25';

      case 'red':
        return '#C94A42';

      default:
        return '#2864E6';
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: getAccent(),
        },
      ]}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default PaymentSummaryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 180,
    minHeight: 108,
    backgroundColor: '#FAF7EF',
    borderRadius: 16,
    borderLeftWidth: 4,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 12,
  },

  title: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64758A',
    letterSpacing: 0.7,
  },

  value: {
    marginTop: 9,
    fontSize: 24,
    fontWeight: '700',
    color: '#19324D',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#74849A',
  },
});