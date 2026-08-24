import React from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import AppScreen from "../../../components/layout/AppScreen";
import AppHeader from "../../../components/layout/AppHeader";
import AppText from "../../../components/common/AppText";

import MasterDataCard from "../../../components/admin/masterData/MasterDataCard";

const COLORS = {
  background: "#F5F2EA",
  navy: "#102A43",
  secondary: "#61758A",
};

const MASTER_DATA = [
  {
    id: "courts",
    title: "Courts",
    description:
      "Manage courts and court information.",
    icon: "⚖",
    route: "Courts",
  },

  {
    id: "caseTypes-disabled",
    title: "Case Types",
    description:
      "Manage civil, criminal, family and other case types.",
    icon: "§",
    route: null,
  },

  {
    id: "practiceAreas-disabled",
    title: "Practice Areas",
    description:
      "Manage the firm's practice areas.",
    icon: "◈",
    route: null,
  },
];

const MasterDataScreen = ({
  navigation,
}) => {
  const handlePress = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
      return;
    }

    // These sections will be implemented
    // when their corresponding web screens
    // are provided.
  };

  return (
    <AppScreen>
      <FlatList
        data={MASTER_DATA.filter((item) => item.route)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AppHeader
              title="Master Data"
              subtitle="Manage the reference data used across the application."
              showNotification={false}
            />

            <AppText
              size="sm"
              color="textSecondary"
              style={styles.description}
            >
              Select a category to manage its
              records.
            </AppText>
          </View>
        }
        renderItem={({ item }) => (
          <MasterDataCard
            title={item.title}
            description={item.description}
            icon={item.icon}
            onPress={() =>
              handlePress(item)
            }
          />
        )}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: COLORS.background,
  },

  headerContent: {
    marginBottom: 4,
  },

  description: {
    paddingHorizontal: 18,
    marginTop: -4,
    marginBottom: 16,
  },
});

export default MasterDataScreen;
