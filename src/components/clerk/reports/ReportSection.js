import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ReportSection = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

export default ReportSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 300,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#E1DDD4',
    borderRadius: 18,
    padding: 18,
  },

  header: {
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#19324D',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#718197',
  },

  content: {
    marginTop: 4,
  },
});