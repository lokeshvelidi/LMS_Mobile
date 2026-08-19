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

const AvailableDocuments = ({
  documents,
  onDocumentPress,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        size="md"
        weight="bold"
        style={styles.title}
      >
        Available Documents
      </AppText>

      <AppText
        size="xs"
        color="textSecondary"
        style={styles.subtitle}
      >
        Documents already associated with
        this case.
      </AppText>

      <View style={styles.list}>
        {documents.map((document) => (
          <Pressable
            key={document.id}
            onPress={() =>
              onDocumentPress?.(
                document
              )
            }
            style={({ pressed }) => [
              styles.document,
              pressed &&
                styles.pressed,
            ]}
          >
            <View style={styles.icon}>
              <AppText
                size="sm"
                weight="bold"
                style={styles.iconText}
              >
                PDF
              </AppText>
            </View>

            <View
              style={styles.documentInfo}
            >
              <AppText
                size="sm"
                weight="semiBold"
                style={styles.name}
              >
                {document.name}
              </AppText>

              <AppText
                size="xs"
                color="textSecondary"
                style={styles.meta}
              >
                {document.type}
                {" • "}
                {document.size}
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

        {documents.length === 0 && (
          <View style={styles.empty}>
            <AppText
              size="sm"
              color="textSecondary"
            >
              No documents available.
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

  title: {
    color: COLORS.navy,
  },

  subtitle: {
    marginTop: 5,
    lineHeight: 18,
  },

  list: {
    marginTop: 15,
  },

  document: {
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

  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F7EAC5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  iconText: {
    color: COLORS.navy,
    fontSize: 9,
  },

  documentInfo: {
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
    paddingVertical: 25,
    alignItems: "center",
  },
});

export default AvailableDocuments;