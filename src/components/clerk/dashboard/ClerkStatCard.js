import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ClerkStatCard = ({
  title,
  value,
  subtitle,
  icon,
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

      case 'purple':
        return '#6856B8';

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
      <View style={styles.topRow}>
        <Text style={styles.title}>
          {title}
        </Text>

        {icon ? (
          <Text style={styles.icon}>
            {icon}
          </Text>
        ) : null}
      </View>

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

export default ClerkStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 180,
    minHeight: 115,
    backgroundColor: '#FAF7EF',
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 16,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64758A',
    letterSpacing: 0.7,
  },

  icon: {
    fontSize: 17,
    color: '#19324D',
  },

  value: {
    marginTop: 12,
    fontSize: 27,
    fontWeight: '700',
    color: '#19324D',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#74849A',
  },
});