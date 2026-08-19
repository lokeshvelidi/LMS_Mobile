import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "../../common/AppText";

const COLORS = {
  navy: "#102A43",
  secondary: "#61758A",
  white: "#FFFDF8",
  border: "#DED9CE",
};

const CourtOrderList = ({
  orders,
  onOrderPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText
            size="md"
            weight="bold"
            style={styles.title}
          >
            Uploaded Court Orders
          </AppText>

          <AppText
            size="xs"
            color="textSecondary"
            style={styles.subtitle}
          >
            Previously uploaded orders for
            the selected case.
          </AppText>
        </View>

        <View style={styles.countBadge}>
          <AppText
            size="xs"
            weight="bold"
            style={styles.countText}
          >
            {orders.length}
          </AppText>
        </View>
      </View>

      <View style={styles.list}>
        {orders.map((order) => (
          <Pressable
            key={order.id}
            onPress={() => onOrderPress?.(order)}
            style={({ pressed }) => [
              styles.order,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.fileIcon}>
              <AppText
                size="xs"
                weight="bold"
                style={styles.fileText}
              >
                PDF
              </AppText>
            </View>

            <View style={styles.orderInfo}>
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.name}
              >
                {order.name}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.meta}
              >
                {order.date} • {order.size}
              </AppText>
            </View>

            <AppText
              size="lg"
              style={styles.arrow}
            >
              →
            </AppText>
          </Pressable>
        ))}

        {orders.length === 0 && (
          <View style={styles.empty}>
            <AppText
              size="sm"
              color="textSecondary"
            >
              No court orders uploaded yet.
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    color: COLORS.navy,
  },

  list: {
    marginTop: 15,
  },

  order: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 12,
    marginBottom: 9,
  },

  pressed: {
    opacity: 0.7,
  },

  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  fileText: {
    color: COLORS.navy,
    fontSize: 9,
  },

  orderInfo: {
    flex: 1,
  },

  name: {
    color: COLORS.navy,
  },

  meta: {
    marginTop: 4,
  },

  arrow: {
    color: COLORS.navy,
    marginLeft: 8,
  },

  empty: {
    alignItems: "center",
    paddingVertical: 25,
  },
});

export default CourtOrderList;